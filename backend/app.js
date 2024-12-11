const express = require("express");
const bodyParser = require("body-parser");
const Web3 = require("web3");


const app = express();
app.use(bodyParser.json());

const patientRoutes = require("./routes/patient");
const doctorRoutes = require("./routes/doctor");
app.use("/patient", patientRoutes);
app.use("/doctor", doctorRoutes);

const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

// const MedicalRecordsABI = require("../frontend/src/contracts/MedicalRecords.json").abi;


const MedicalRecordsABI = require("../build/contracts/MedicalRecords.json").abi;
const MedicalRecordsAddress = "0x030f24d3e44d22495463C1fb1c07DA28380cD337"; // Your deployed contract address
const contract = new web3.eth.Contract(MedicalRecordsABI, MedicalRecordsAddress);

app.post("/addRecord", async (req, res) => {
    const { patient, description, ipfsHash } = req.body;
    const accounts = await web3.eth.getAccounts();
    await contract.methods.addRecord(patient, description, ipfsHash).send({ from: accounts[0] });
    res.send("Record added!");
});

app.listen(3001, () => console.log("API running on port 3001"));
