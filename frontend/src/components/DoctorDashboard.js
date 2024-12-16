import React, { useState } from "react";
import axios from "axios";

const DoctorDashboard = ({ web3, accounts, contract }) => {
    const [patientAddress, setPatientAddress] = useState("");
    const [records, setRecords] = useState([]);

    const viewRecords = async () => {
        try {
            // const patientRecords = await contract.methods.getRecords(patientAddress).call({ from: accounts[0] });
            // setRecords(patientRecords);
            const response = await axios.get(`http://localhost:3001/doctor/viewRecords/${patientAddress}`, {
                params: { doctor: accounts[1] }, // Pass the current doctor’s account
            });
            setRecords(response.data); // Update the state with fetched records
        } catch (err) {
            console.log(err)
            alert("Access denied or no records found.");
        }
    };

    return (
        <div>
            <h2>Doctor Dashboard</h2>
            <input
                type="text"
                placeholder="Enter Patient Address"
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
            />
            <button onClick={viewRecords}>View Records</button>

            <h3>Medical Records:</h3>
            {records.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>IPFS Hash</th>
                            <th>Patient</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => (
                            <tr key={index}>
                                <td>{record[0]}</td>
                                <td><a
    href={`http://127.0.0.1:8080/ipfs/${record[1]}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {record[1]} (Download)
  </a></td>
                                <td>{record[2]}</td>
                                <td>{new Date(record[3] * 1000).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No records to display</p>
            )}
        </div>
    );
};

export default DoctorDashboard;

























// import React, { useState } from "react";

// const DoctorDashboard = ({ web3, accounts, contract }) => {
//     const [patientAddress, setPatientAddress] = useState("");
//     const [records, setRecords] = useState([]);

//     // Fetch patient records
//     const fetchRecords = async () => {
//         try {
//             const patientRecords = await contract.methods.getRecords(patientAddress).call({ from: accounts[0] });
//             setRecords(patientRecords);
//         } catch (err) {
//             alert("Access denied or no records found.");
//         }
//     };

//     return (
//         <div>
//             <h1>Doctor Dashboard</h1>
//             <input
//                 type="text"
//                 placeholder="Patient's Address"
//                 value={patientAddress}
//                 onChange={(e) => setPatientAddress(e.target.value)}
//             />
//             <button onClick={fetchRecords}>View Records</button>

//             <h2>Patient Records:</h2>
//             <ul>
//                 {records.map((record, index) => (
//                     <li key={index}>
//                         <p>Description: {record.description}</p>
//                         <p>IPFS Hash: {record.ipfsHash}</p>
//                         <p>Date: {new Date(record.timestamp * 1000).toLocaleString()}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default DoctorDashboard;
