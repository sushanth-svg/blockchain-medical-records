const MedicalRecords = artifacts.require("MedicalRecords");

contract("MedicalRecords", (accounts) => {
    const [patient, doctor1, doctor2] = accounts;

    it("should allow a patient to grant access to a doctor", async () => {
        const instance = await MedicalRecords.deployed();

        // Grant access to doctor1
        await instance.grantAccess(doctor1, { from: patient });

        // Check if doctor1 has access
        const hasAccess = await instance.hasAccess(patient, doctor1);
        assert.equal(hasAccess, true, "Doctor1 should have access to the patient's records");
    });

    it("should allow a patient to revoke access from a doctor", async () => {
        const instance = await MedicalRecords.deployed();

        // Revoke access from doctor1
        await instance.revokeAccess(doctor1, { from: patient });

        // Check if doctor1 still has access
        const hasAccess = await instance.hasAccess(patient, doctor1);
        assert.equal(hasAccess, false, "Doctor1 should not have access after access is revoked");
    });

    it("should restrict unauthorized access to patient records", async () => {
        const instance = await MedicalRecords.deployed();

        // Try to access patient records as doctor2 (without access)
        try {
            await instance.getRecords(patient, { from: doctor2 });
            assert.fail("Unauthorized access did not throw");
        } catch (err) {
            assert(
                err.message.includes("Access denied"),
                "Expected access denied error but got a different error"
            );
        }
    });

    it("should allow authorized doctors to view patient records", async () => {
        const instance = await MedicalRecords.deployed();

        // Grant access to doctor1
        await instance.grantAccess(doctor1, { from: patient });

        // Add a record for the patient
        const description = "Blood Test Report";
        const ipfsHash = "QmdFyM4C5SxQU4ti5pwU4NN2NiyLLgLc6o97MMZi3t72yG";
        await instance.addRecord(patient, description, ipfsHash, { from: doctor1 });

        // Get records as doctor1
        const records = await instance.getRecords(patient, { from: doctor1 });

        assert.equal(records.length, 1, "Patient should have one record");
        assert.equal(records[0].description, description, "Record description mismatch");
        assert.equal(records[0].ipfsHash, ipfsHash, "IPFS hash mismatch");
        assert.equal(records[0].doctor, doctor1, "Doctor address mismatch");
    });

    it("should allow multiple records to be added for a patient", async () => {
        const instance = await MedicalRecords.deployed();

        // Add a second record for the patient
        const description2 = "X-Ray Report";
        const ipfsHash2 = "QmTz6KrhJLRe1pEk8XumEqxSc9zVpGP5L23LCVyw8Q6jMY";
        await instance.addRecord(patient, description2, ipfsHash2, { from: doctor1 });

        // Get records as doctor1
        const records = await instance.getRecords(patient, { from: doctor1 });

        assert.equal(records.length, 2, "Patient should have two records");
        assert.equal(records[1].description, description2, "Second record description mismatch");
        assert.equal(records[1].ipfsHash, ipfsHash2, "Second IPFS hash mismatch");
    });

    it("should prevent revoked doctors from accessing patient records", async () => {
        const instance = await MedicalRecords.deployed();

        // Revoke access from doctor1
        await instance.revokeAccess(doctor1, { from: patient });

        // Try to access patient records as doctor1
        try {
            await instance.getRecords(patient, { from: doctor1 });
            assert.fail("Unauthorized access did not throw");
        } catch (err) {
            assert(
                err.message.includes("Access denied"),
                "Expected access denied error but got a different error"
            );
        }
    });
});





// const MedicalRecords = artifacts.require("MedicalRecords");

// contract("MedicalRecords", (accounts) => {
//     const [patient, doctor1, doctor2] = accounts;
//     it("should add a medical record", async () => {
//         const instance = await MedicalRecords.deployed();
//         // await instance.addRecord(accounts[1], "Test Description", "TestHash", { from: accounts[0] });

//          // Grant access to accounts[0] for accounts[1]'s records
//          await instance.grantAccess(accounts[2], { from: accounts[1] });

//         // const records = await instance.getRecords(accounts[1]);
//         // Get the records as accounts[0]
//         const records = await instance.getRecords(accounts[1], { from: accounts[2] });
//         assert.equal(records.length, 1, "Doctor should have access to 1 record");
//         // assert.equal(records[0].description, "Test Description", "Description mismatch");

//          // Unauthenticated user tries to fetch records
//         try {
//             await instance.getRecords(accounts[1], { from: accounts[3] });
//             assert.fail("Access control is not enforced");
//         } catch (error) {
//             assert.include(error.message, "Access denied", "Access control failed");
//         }
//     });
// });



// const MedicalRecords = artifacts.require("MedicalRecords");

// contract("MedicalRecords", (accounts) => {
//     it("should add a medical record", async () => {
//         const instance = await MedicalRecords.deployed();
//         await instance.addRecord(accounts[1], "Test Description", "TestHash", { from: accounts[0] });

//          // Grant access to accounts[0] for accounts[1]'s records
//          await instance.grantAccess(accounts[0], { from: accounts[1] });

//         // const records = await instance.getRecords(accounts[1]);
//         // Get the records as accounts[0]
//         const records = await instance.getRecords(accounts[1], { from: accounts[0] });
//         assert.equal(records.length, 1, "Record count should be 1");
//         assert.equal(records[0].description, "Test Description", "Description mismatch");
//     });
// });
