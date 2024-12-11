const express = require("express");
const Web3 = require("web3");

const router = express.Router();
const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

// const MedicalRecordsABI = require("../../frontend/src/contracts/MedicalRecords.json").abi;
const MedicalRecordsABI = require("../build/contracts/MedicalRecords.json").abi;


const MedicalRecordsAddress = "0x030f24d3e44d22495463C1fb1c07DA28380cD337"; // Deployed contract address
const contract = new web3.eth.Contract(MedicalRecordsABI, MedicalRecordsAddress);

// View records of a patient (requires access)
router.get("/viewRecords/:patient", async (req, res) => {
    const { doctor } = req.query;
    const { patient } = req.params;

    try {
        const patientRecords = await contract.methods.getRecords(patient).call({ from: doctor });
        res.json(patientRecords);
    } catch (err) {
        res.status(403).send("Access denied or no records found.");
    }
});

module.exports = router;
