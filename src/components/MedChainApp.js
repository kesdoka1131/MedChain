// src/components/MedChainApp.js
import React, { Component } from "react";
import logo from "../MedChain.png";
import "./App.css";
import axios from "axios";
import Web3 from "web3";
import Business from "../abis/Business.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      file: null,
      presriptionHash: "",
      patientId: "",
      doctorName: "",
      uploading: false,
      business: null,
      logs: [], // Store logs
      searchPatientId: "", // Input for viewing logs
      loadingLogs: false, //  Loading state for logs
    };
  }

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Please use MetaMask!");
    }
  }
  //get the account
  //get the network

  //get the smart contract
  // when we do this we need to get the account address and the network id
  //then we need to get the smart contract *address -- networkData.adress* and the *abi -- Business.abi*

  //get prescription hash

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    //address
    const networkId = await web3.eth.net.getId();
    const networkData = Business.networks[networkId];

    if (networkData) {
      //fetch contract
      const business = new web3.eth.Contract(Business.abi, networkData.address);
      this.setState({ business });
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  }

  // Capture file and store it in state
  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    this.setState({ file });
    console.log("File captured:", file.name);
  };

  //  Handle form input changes
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  //  Upload prescription
  // Upload file to Pinata IPFS
  onSubmit = async (event) => {
    event.preventDefault();
    if (!this.state.file || !this.state.patientId || !this.state.doctorName) {
      alert("Please fill in all fields and select a file!");
      return;
    }

    this.setState({ uploading: true });

    const formData = new FormData();
    formData.append("file", this.state.file);

    const pinataApiKey = "PINIATA_API_KEY";
    const pinataSecretApiKey = "PINIATA_SECRET_API_KEY";

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        }
      );

      console.log("File uploaded:", response.data);
      const presriptionHash = response.data.IpfsHash;

      await this.state.business.methods
        .set(presriptionHash, this.state.patientId, this.state.doctorName)
        .send({ from: this.state.account });

      this.setState({ uploading: false });

      window.alert(
        `File and data successfully uploaded to IPFS PINATA SERVER (File Hash: ${presriptionHash}) and Blockchain!`
      );
      console.log("File uploaded:", response.data);
    } catch (error) {
      console.error("Failed to upload", error);
      alert("Failed to upload file");
      this.setState({ uploading: false });
    }
  };

  // ✅ Fetch patient logs
  fetchLogs = async () => {
    const { searchPatientId, business } = this.state;
    if (!searchPatientId) {
      alert("Enter a patient ID");
      return;
    }

    this.setState({ loadingLogs: true });

    try {
      const logs = await business.methods.getLogs(searchPatientId).call();
      const logData = logs[0].map((hash, index) => ({
        hash,
        doctorName: logs[1][index],
        timestamp: new Date(logs[2][index] * 1000).toLocaleString(),
      }));

      this.setState({ logs: logData, loadingLogs: false });
    } catch (error) {
      console.error("Failed to fetch logs", error);
      alert("Failed to fetch logs");
      this.setState({ loadingLogs: false });
    }
  };

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-dark fixed-top bg-dark">
          <a href="/" className="navbar-brand">
            MedChain
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-block">
              <small className="text-white">
                <small>{this.state.account}</small>
              </small>
            </li>
          </ul>
        </nav>
        <p>&nbsp;</p>

        <div className="container mt-5">
          <img src={logo} className="App-logo" alt="logo" />
          <p>&nbsp;</p>
          <h2>Prescription Upload</h2>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="patientId"
              placeholder="Patient ID"
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="doctorName"
              placeholder="Doctor Name"
              onChange={this.handleInputChange}
            />
            <input type="file" onChange={this.captureFile} />
            <button type="submit" disabled={this.state.uploading}>
              {this.state.uploading ? "Uploading..." : "Upload"}
            </button>
          </form>

          <h2>View Patient Logs</h2>
          <input
            type="text"
            placeholder="Enter Patient ID"
            onChange={(e) => this.setState({ searchPatientId: e.target.value })}
          />
          <button onClick={this.fetchLogs}>
            {this.state.loadingLogs ? "Loading..." : "View Logs"}
          </button>

          {this.state.logs.map((log, index) => (
            <div key={index}>
              <p>Doctor: {log.doctorName}</p>
              <p>Uploaded: {log.timestamp}</p>
              <a
                href={`https://gateway.pinata.cloud/ipfs/${log.hash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {log.hash}
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
