// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalRecords {
    struct Record {
        string description;
        string ipfsHash; // IPFS hash for storing large files like images
        address doctor;
        uint256 timestamp;
    }

    mapping(address => Record[]) private records; // Patient's medical records
    mapping(address => mapping(address => bool)) private accessControl; // Patient's consent for doctors


    event RecordAdded(address patient, string description, address doctor);
    event AccessGranted(address indexed patient, address indexed doctor);
    event AccessRevoked(address indexed patient, address indexed doctor);

    // Function to add a new medical record
    function addRecord(address patient, string memory description, string memory ipfsHash) public {
        records[patient].push(Record(description, ipfsHash, msg.sender, block.timestamp));
        emit RecordAdded(patient, description, msg.sender);
    }

    //Function to get all records of a patient
    function getRecords(address patient) public view returns (Record[] memory) {
        return records[patient];
    }

      // Function to get all records of a patient
    // function getRecords(address patient) public view returns (Record[] memory) {
    //     require(patient == msg.sender || accessControl[patient][msg.sender], "Access denied");
    //     return records[patient];
    // }

    // Function to grant access to a doctor
    function grantAccess(address doctor) public {
        accessControl[msg.sender][doctor] = true;
        emit AccessGranted(msg.sender, doctor);
    }

    // Function to revoke access from a doctor
    function revokeAccess(address doctor) public {
        accessControl[msg.sender][doctor] = false;
        emit AccessRevoked(msg.sender, doctor);
    }
}
