const express = require("express");
const Web3 = require("web3");

const router = express.Router();
const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

// const MedicalRecordsABI = require("../../frontend/src/contracts/MedicalRecords.json").abi;

const MedicalRecordsABI = require("../build/contracts/MedicalRecords.json").abi;
const MedicalRecordsAddress = "0x030f24d3e44d22495463C1fb1c07DA28380cD337"; // Deployed contract address
const contract = new web3.eth.Contract(MedicalRecordsABI, MedicalRecordsAddress);

// Grant access to a doctor
router.post("/grantAccess", async (req, res) => {
    const { patient, doctor } = req.body;
    try {
        await contract.methods.grantAccess(doctor).send({ from: patient });
        res.send("Access granted to doctor!");
    } catch (err) {
        res.status(500).send("Failed to grant access.");
    }
});

// Revoke access from a doctor
router.post("/revokeAccess", async (req, res) => {
    const { patient, doctor } = req.body;
    try {
        await contract.methods.revokeAccess(doctor).send({ from: patient });
        res.send("Access revoked from doctor!");
    } catch (err) {
        res.status(500).send("Failed to revoke access.");
    }
});

module.exports = router;
