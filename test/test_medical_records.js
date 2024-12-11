const MedicalRecords = artifacts.require("MedicalRecords");

contract("MedicalRecords", (accounts) => {
    it("should add a medical record", async () => {
        const instance = await MedicalRecords.deployed();
        await instance.addRecord(accounts[1], "Test Description", "TestHash", { from: accounts[0] });

         // Grant access to accounts[0] for accounts[1]'s records
         await instance.grantAccess(accounts[0], { from: accounts[1] });

        // const records = await instance.getRecords(accounts[1]);
        // Get the records as accounts[0]
        const records = await instance.getRecords(accounts[1], { from: accounts[0] });
        assert.equal(records.length, 1, "Record count should be 1");
        assert.equal(records[0].description, "Test Description", "Description mismatch");
    });
});
