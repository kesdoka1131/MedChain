pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

contract Business {
    struct Prescription {
        string prescriptionHash;
        string patientId;
        string doctorName;
        uint256 timestamp;
    }

    // Mapping of patient ID to their prescription logs
    mapping(string => Prescription[]) public patientPrescriptions;

    // Store new prescription log
    function set(
        string memory _prescriptionHash,
        string memory _patientId,
        string memory _doctorName
    ) public {
        Prescription memory newPrescription = Prescription({
            prescriptionHash: _prescriptionHash,
            patientId: _patientId,
            doctorName: _doctorName,
            timestamp: block.timestamp
        });

        patientPrescriptions[_patientId].push(newPrescription);
    }

    // Retrieve all logs for a specific patient ID
    function getLogs(string memory _patientId)
        public
        view
        returns (
            string[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        uint256 length = patientPrescriptions[_patientId].length;

        string[] memory hashes = new string[](length);
        string[] memory doctorNames = new string[](length);
        uint256[] memory timestamps = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            hashes[i] = patientPrescriptions[_patientId][i].prescriptionHash;
            doctorNames[i] = patientPrescriptions[_patientId][i].doctorName;
            timestamps[i] = patientPrescriptions[_patientId][i].timestamp;
        }

        return (hashes, doctorNames, timestamps);
    }
}
