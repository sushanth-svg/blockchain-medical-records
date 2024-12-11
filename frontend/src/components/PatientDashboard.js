import React, { useEffect, useState } from "react";

const PatientDashboard = ({ web3, accounts, contract }) => {
    const [records, setRecords] = useState([]);
    const [doctorAddress, setDoctorAddress] = useState("");

    // Fetch patient records
    const fetchRecords = async () => {
        const patientRecords = await contract.methods.getRecords(accounts[0]).call({ from: accounts[0] });
        setRecords(patientRecords);
    };

    // Grant access to a doctor
    const grantAccess = async () => {
        await contract.methods.grantAccess(doctorAddress).send({ from: accounts[0] });
        alert("Access granted to doctor!");
    };

    // Revoke access from a doctor
    const revokeAccess = async () => {
        await contract.methods.revokeAccess(doctorAddress).send({ from: accounts[0] });
        alert("Access revoked from doctor!");
    };

    useEffect(() => {
        fetchRecords();
    }, [contract]);

    return (
        <div>
            <h1>Patient Dashboard</h1>
            <h2>Your Records:</h2>
            <ul>
                {records.map((record, index) => (
                    <li key={index}>
                        <p>Description: {record.description}</p>
                        <p>Doctor: {record.doctor}</p>
                        <p>IPFS Hash: {record.ipfsHash}</p>
                        <p>Date: {new Date(record.timestamp * 1000).toLocaleString()}</p>
                    </li>
                ))}
            </ul>

            <h2>Manage Access</h2>
            <input
                type="text"
                placeholder="Doctor's Address"
                value={doctorAddress}
                onChange={(e) => setDoctorAddress(e.target.value)}
            />
            <button onClick={grantAccess}>Grant Access</button>
            <button onClick={revokeAccess}>Revoke Access</button>
        </div>
    );
};

export default PatientDashboard;