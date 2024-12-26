import React, { useState } from "react";

const PatientDashboard = ({ web3, contract, accounts }) => {
    const [doctorAddress, setDoctorAddress] = useState("");
    const [patientAddress, setPatientAddress] = useState("");

    const grantAccess = async () => {
        // const doctorAddress = prompt("Enter Doctor Address to Grant Access:");
        if (!doctorAddress) return;
        try {
            // await contract.methods.grantAccess(doctorAddress).send({ from: accounts[0] });
            await contract.methods.grantAccess(doctorAddress).send({ from: patientAddress });
            setDoctorAddress("")
            setPatientAddress("")
            alert("Access granted to doctor by patient!!");
        } catch (err) {
            console.log(err)
            alert("Error granting access.");
        }
    };

    const revokeAccess = async () => {
        // const doctorAddress = prompt("Enter Doctor Address to Revoke Access:");
        if (!doctorAddress) return;
        try {
            // await contract.methods.revokeAccess(doctorAddress).send({ from: accounts[0] });
            await contract.methods.revokeAccess(doctorAddress).send({ from: patientAddress });
            setDoctorAddress("")
            setPatientAddress("")
            alert("Access revoked from doctor by patient!");
        } catch (err) {
            alert("Error revoking access.");
        }
    };

    return (
        <div>
            <h2>Patient Dashboard</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h3>Grant doctor access:</h3>
            <input
                type="text"
                placeholder="Enter Doctor Address"
                value={doctorAddress}
                onChange={(e) => setDoctorAddress(e.target.value)}
                style={{
                    width: "400px", // Width of the text box
                    height: "40px", // Height of the text box
                    padding: "10px", // Padding for better spacing
                    fontSize: "16px", // Font size for readability
                  }}
            />
              <h3>By patient:</h3>
            <input
                type="text"
                placeholder="Enter Patient Address"
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
                style={{
                    width: "400px", // Width of the text box
                    height: "40px", // Height of the text box
                    padding: "10px", // Padding for better spacing
                    fontSize: "16px", // Font size for readability
                  }}
            />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick={grantAccess}>Grant Access to Doctor</button>
            <button onClick={revokeAccess}>Revoke Access from Doctor</button>
            </div>
        </div>
    );
};

export default PatientDashboard;








































// import React, { useEffect, useState } from "react";

// const PatientDashboard = ({ web3, accounts, contract }) => {
//     const [records, setRecords] = useState([]);
//     const [doctorAddress, setDoctorAddress] = useState("");

//     // Fetch patient records
//     const fetchRecords = async () => {
//         const patientRecords = await contract.methods.getRecords(accounts[0]).call({ from: accounts[0] });
//         setRecords(patientRecords);
//     };

//     // Grant access to a doctor
//     const grantAccess = async () => {
//         await contract.methods.grantAccess(doctorAddress).send({ from: accounts[0] });
//         alert("Access granted to doctor!");
//     };

//     // Revoke access from a doctor
//     const revokeAccess = async () => {
//         await contract.methods.revokeAccess(doctorAddress).send({ from: accounts[0] });
//         alert("Access revoked from doctor!");
//     };

//     useEffect(() => {
//         fetchRecords();
//     }, [contract]);

//     return (
//         <div>
//             <h1>Patient Dashboard</h1>
//             <h2>Your Records:</h2>
//             <ul>
//                 {records.map((record, index) => (
//                     <li key={index}>
//                         <p>Description: {record.description}</p>
//                         <p>Doctor: {record.doctor}</p>
//                         <p>IPFS Hash: {record.ipfsHash}</p>
//                         <p>Date: {new Date(record.timestamp * 1000).toLocaleString()}</p>
//                     </li>
//                 ))}
//             </ul>

//             <h2>Manage Access</h2>
//             <input
//                 type="text"
//                 placeholder="Doctor's Address"
//                 value={doctorAddress}
//                 onChange={(e) => setDoctorAddress(e.target.value)}
//             />
//             <button onClick={grantAccess}>Grant Access</button>
//             <button onClick={revokeAccess}>Revoke Access</button>
//         </div>
//     );
// };

// export default PatientDashboard;
