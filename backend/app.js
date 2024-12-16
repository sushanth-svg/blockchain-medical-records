const express = require("express");
const bodyParser = require("body-parser");
const Web3 = require("web3");
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
// Enable CORS
app.use(cors());
const patientRoutes = require("./routes/patient");
const doctorRoutes = require("./routes/doctor");
app.use("/patient", patientRoutes);
app.use("/doctor", doctorRoutes);

const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

// const MedicalRecordsABI = require("../frontend/src/contracts/MedicalRecords.json").abi;


const MedicalRecordsABI = require("../backend/contracts/MedicalRecords.json").abi;
const MedicalRecordsAddress = "0xC75d421f8165Cae96196B5E35161f726Ec7a93c8"; // Your deployed contract address
const contract = new web3.eth.Contract(MedicalRecordsABI, MedicalRecordsAddress);

app.post("/addRecord", async (req, res) => {
    const { patient, description, ipfsHash } = req.body;
    const accounts = await web3.eth.getAccounts();
    const records = await contract.methods.addRecord(patient, description, ipfsHash).send({ from: accounts[0] });
    console.log(records.events.LogMessage.returnValues);
    console.log(records.events.LogValue.returnValues);
    res.send("Record added!");
});

app.listen(3001, () => console.log("API running on port 3001"));
