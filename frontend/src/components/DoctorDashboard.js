import React, { useState } from "react";

const DoctorDashboard = ({ web3, accounts, contract }) => {
    const [patientAddress, setPatientAddress] = useState("");
    const [records, setRecords] = useState([]);

    // Fetch patient records
    const fetchRecords = async () => {
        try {
            const patientRecords = await contract.methods.getRecords(patientAddress).call({ from: accounts[0] });
            setRecords(patientRecords);
        } catch (err) {
            alert("Access denied or no records found.");
        }
    };

    return (
        <div>
            <h1>Doctor Dashboard</h1>
            <input
                type="text"
                placeholder="Patient's Address"
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
            />
            <button onClick={fetchRecords}>View Records</button>

            <h2>Patient Records:</h2>
            <ul>
                {records.map((record, index) => (
                    <li key={index}>
                        <p>Description: {record.description}</p>
                        <p>IPFS Hash: {record.ipfsHash}</p>
                        <p>Date: {new Date(record.timestamp * 1000).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorDashboard;
