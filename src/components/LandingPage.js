// src/components/LandingPage.js
import React from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import Navbar from "./Navbar"; // Import Navbar component
import blockchainImage from "../images/blockchain.png"; // Example images
import uploadImage from "../images/upload.jpg";
import trustImage from "../images/trust.jpg";
import verification from "../images/verification.jpg";
import decentralized from "../images/decentralized.jpg";

const LandingPage = () => {
  const history = useHistory();

  const navigateToApp = () => {
    history.push("/app");
  };

  return (
    <div className="landing-container">
      <Navbar />

      <header className="hero-section">
        <h1>Welcome to MedChain</h1>
        <h2 className="sub-heading">
          Revolutionizing Prescription Management with Blockchain
        </h2>
        <button className="get-started-btn" onClick={navigateToApp}>
          Get Started
        </button>
      </header>

      {/* <section className="features-section">
        <h2>Why MedChain?</h2>
        <p>
          MedChain leverages blockchain technology to ensure trust,
          transparency, and security in managing patient prescriptions.
        </p>
        <div className="features">
          <div className="feature">
            <img src={blockchainImage} alt="Blockchain" />
            <h3>Immutable Records</h3>
            <p>
              Your data is securely stored on the blockchain, ensuring it cannot
              be tampered with.
            </p>
          </div>

          <div className="feature">
            <img src={trustImage} alt="Trust" />
            <h3>Decentralized Access</h3>
            <p>
              Patients and doctors can access prescription logs using patient
              IDs.
            </p>
          </div>

          <div className="feature">
            <img src={uploadImage} alt="Upload" />
            <h3>Efficient Verification</h3>
            <p>Transactions are verified by MetaMask to ensure authenticity.</p>
          </div>
        </div>
      </section> */}

      <section className="features-section">
        <h2>Why MedChain?</h2>
        <p>
          MedChain leverages blockchain technology to ensure trust,
          transparency, and security in managing patient prescriptions.
        </p>

        <div className="card-scroll-container">
          <div className="card-container">
            {/* Card 1 */}
            <div className="card">
              <img
                src={blockchainImage}
                alt="Blockchain"
                className="card-image"
              />
              <div className="card-content">
                <h3>Immutable Records</h3>
                <p>
                  Your data is securely stored on the
                  <br /> blockchain, ensuring it cannot be <br />
                  tampered with.
                </p>
              </div>
            </div>

            {/* Additional cards */}
            <div className="card">
              <img src={decentralized} alt="Trust" className="card-image" />
              <div className="card-content">
                <h3>Decentralized Access</h3>
                <p>
                  Patients and doctors can access prescription <br />
                  logs using patient IDs.
                </p>
              </div>
            </div>

            <div className="card">
              <img src={verification} alt="Upload" className="card-image" />
              <div className="card-content">
                <h3>Efficient Verification</h3>
                <p>
                  Transactions are verified by MetaMask to <br />
                  ensure authenticity.
                </p>
              </div>
            </div>

            <div className="card">
              <img src={trustImage} alt="Trust" className="card-image" />
              <div className="card-content">
                <h3>Trust & Transparency</h3>
                <p>
                  Every transaction is traceable and verifiable,
                  <br /> ensuring full transparency and building user
                  <br /> trust.
                </p>
              </div>
            </div>

            <div className="card">
              <img
                src={uploadImage}
                alt="Secure Upload"
                className="card-image"
              />
              <div className="card-content">
                <h3>Secure Upload</h3>
                <p>
                  Files are encrypted and stored on IPFS, <br />
                  ensuring safe and reliable prescription <br />
                  management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>
            <span role="img" aria-label="Doctor">
              👨‍⚕️
            </span>{" "}
            Doctors upload prescriptions by entering <strong>Patient ID</strong>
            , <strong>Doctor Name</strong>, and uploading the file.
          </li>
          <li>
            <span role="img" aria-label="Lock">
              🔒
            </span>{" "}
            The prescription is stored on <strong>IPFS</strong>, and its hash is
            saved on the blockchain.
          </li>
          <li>
            <span role="img" aria-label="Magnifying Glass">
              🔍
            </span>{" "}
            Patients and doctors can access prescription logs using{" "}
            <strong>Patient ID</strong>.
          </li>
        </ol>
      </section>

      <footer className="footer">
        <p>
          © 2025 MedChain - Secure, Transparent, and Reliable Prescription
          Management
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
