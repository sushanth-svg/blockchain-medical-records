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

    useEffect(() => {
        const init = async () => {
            const web3Instance = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
            const accounts = await web3Instance.eth.getAccounts();
            const networkId = await web3Instance.eth.net.getId();
            const deployedNetwork = MedicalRecordsContract.networks[networkId];
            const MedicalRecordsAddress = "0xC75d421f8165Cae96196B5E35161f726Ec7a93c8"; // Your deployed contract address

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
        const description = "Blood Test Results";
        const ipfsHash = "QmdFyM4C5SxQU4ti5pwU4NN2NiyLLgLc6o97MMZi3t72yG"; // Replace with actual IPFS hash for a file
        await contract.methods.addRecord(accounts[0], description, ipfsHash).send({
            from: accounts[0],
            gas: 3000000, });// Increase gas limit for the transaction 
        alert("Record added!");
    };

    return (
        <div>
            <h1>Blockchain Medical Records</h1>
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
