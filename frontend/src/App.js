import React, { useEffect, useState } from "react";
import Web3 from "web3";
// import MedicalRecordsContract from "./contracts/MedicalRecords.json";
import MedicalRecordsContract from "../../frontend/src/contracts/MedicalRecords.json";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";

function App() {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const [patientdescription, setPatientDescription] = useState("");
    const [ipfsrecord, setIpfsRecord] = useState("");
    const [patientaddress, setPatientAddress] = useState("");
    const [doctoraddress, setDoctorAddress] = useState("");


    useEffect(() => {
        const init = async () => {
            const web3Instance = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
            const accounts = await web3Instance.eth.getAccounts();
            const networkId = await web3Instance.eth.net.getId();
            const deployedNetwork = MedicalRecordsContract.networks[networkId];
            const MedicalRecordsAddress = "0x9532Bcbca4b199d1Cb5c2d5905021D0c56bD4Ff7"; // Your deployed contract address

            const contractInstance = new web3Instance.eth.Contract(
                MedicalRecordsContract.abi,MedicalRecordsAddress,
                deployedNetwork && deployedNetwork.address
            );

            setWeb3(web3Instance);
            setAccounts(accounts);
            setContract(contractInstance);
        };

        init();
    }, []);

    const addRecord = async () => {
        // const description = "Blood Test Results";
        // const ipfsHash = "QmdFyM4C5SxQU4ti5pwU4NN2NiyLLgLc6o97MMZi3t72yG"; // Replace with actual IPFS hash for a file
        // await contract.methods.addRecord(accounts[0], description, ipfsHash).send({
        //     from: accounts[1],
        //     gas: 3000000, });// Increase gas limit for the transaction 
        // alert("Record added!");

        const description = patientdescription;
        const ipfsHash = ipfsrecord; // Replace with actual IPFS hash for a file
        await contract.methods.addRecord(patientaddress, description, ipfsHash).send({
            from: doctoraddress,
            gas: 3000000, });// Increase gas limit for the transaction
            setPatientDescription("");
            setIpfsRecord("");
            setPatientAddress("");
            setDoctorAddress("");
            
        alert("Record added!");

    };

    return (
        <div>
            <h1>Blockchain Medical Records</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h3>Patient : </h3>
            <input
                type="text"
                placeholder="Enter Patient Address"
                value={patientaddress}
                onChange={(e) => setPatientAddress(e.target.value)}
                style={{
                    width: "500px", // Width of the text box
                    height: "40px", // Height of the text box
                    padding: "10px", // Padding for better spacing
                    fontSize: "16px", // Font size for readability
                  }}
            />
            <h3>Description : </h3>
            <input
                type="text"
                placeholder="Enter Patient Description"
                value={patientdescription}
                onChange={(e) => setPatientDescription(e.target.value)}
                style={{
                    width: "500px", // Width of the text box
                    height: "40px", // Height of the text box
                    padding: "10px", // Padding for better spacing
                    fontSize: "16px", // Font size for readability
                  }}
            />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h3>IPFS : </h3>
             <input
                type="text"
                placeholder="Enter IPFS File Details"
                value={ipfsrecord}
                onChange={(e) => setIpfsRecord(e.target.value)}
                style={{
                    width: "500px", // Width of the text box
                    height: "40px", // Height of the text box
                    padding: "10px", // Padding for better spacing
                    fontSize: "16px", // Font size for readability
                    alignItems: "center", gap: "10px" 
                  }}
            />
             <h3>Dcotor : </h3>
            <input
                type="text"
                placeholder="Enter Doctor Address"
                value={doctoraddress}
                onChange={(e) => setDoctorAddress(e.target.value)}
                style={{
                    width: "500px", // Width of the text box
                    height: "40px", // Height of the text box
                    padding: "10px", // Padding for better spacing
                    fontSize: "16px", // Font size for readability
                  }}
            />
            </div>
            <button onClick={addRecord}>Add Medical Record</button>
            {web3 && accounts.length > 0 && contract ? (
                <>
            <PatientDashboard web3={web3} accounts={accounts} contract={contract} />
            <DoctorDashboard web3={web3} accounts={accounts} contract={contract} />
            </>
            ) : (
                <p>Loading Web3, accounts, and contract...</p>
            )}
        </div>
    );
}

export default App;
