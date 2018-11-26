var NonGovernmentalOrganizations = artifacts.require("NonGovernmentalOrganizations");

contract("NonGovernmentalOrganizations", async (accounts) => {

    it("addOrganization - ok", async () => {

        let instance = await NonGovernmentalOrganizations.deployed();

        let expectedId = 1;
        let expectedOwner = accounts[0];
        let expectedName = "Commit Conf";
        let expectedLength = 2;

        let tx = await instance.addOrganization(expectedName, { from: expectedOwner });
        assert.equal(tx.logs[0].event, "OrganizationCreated");
        assert.equal(tx.logs[0].args.id, expectedId);
        assert.equal(tx.logs[0].args.owner, expectedOwner);
        assert.equal(tx.logs[0].args.name, expectedName);

        let result = await instance.organizations.call(expectedId);
        assert.equal(result[0], expectedId);
        assert.equal(result[1], expectedOwner);
        assert.equal(result[2], expectedName);

        let ownerId = await instance.ownerToOrganizationId(expectedOwner);
        assert.equal(ownerId, expectedId);

        let length = await instance.getOrganizationsLength();
        assert.equal(length, expectedLength);
    });

    it("addOrganization - throw suplied owner already have an organization", async () => {

        let instance = await NonGovernmentalOrganizations.deployed();

        let expectedOwner = accounts[0];
        let expectedName = "Commit Conf";
        let expectedLength = 2;

        try {

            await instance.addOrganization(expectedName, { from: expectedOwner })
            assert.fail("Expected throw suplied owner already have an organization");

        } catch (error) {

            assert.equal(error.message, "VM Exception while processing transaction: revert suplied owner already have an organization");
            
            let length = await instance.getOrganizationsLength();
            assert.equal(length, expectedLength);
        }
    });

    it("donation - ok", async () => {

        let instance = await NonGovernmentalOrganizations.deployed();

        let value = 10;
        let organizationId = 1;
        let receiverAddress = accounts[0];
        let senderAddress = accounts[1];

        let receiverInitalBalance = web3.fromWei(web3.eth.getBalance(receiverAddress));
        let senderInitalBalance = web3.fromWei(web3.eth.getBalance(senderAddress));

        let tx = await instance.donation(organizationId,
            { value: web3.toWei(value, "ether"), gasPrice: 0, from: senderAddress });
        assert.equal(tx.logs[0].event, "DonationSubmitted");
        assert.equal(tx.logs[0].args.id, organizationId);
        assert.equal(tx.logs[0].args.owner, receiverAddress);
        assert.equal(tx.logs[0].args.sender, senderAddress);
        assert.equal(web3.fromWei(tx.logs[0].args.value).toNumber(), value);

        let receiverEndingBalance = web3.fromWei(web3.eth.getBalance(receiverAddress));
        let senderEndingBalance = web3.fromWei(web3.eth.getBalance(senderAddress));

        assert.equal(receiverInitalBalance.add(value).toNumber(), receiverEndingBalance.toNumber());
        assert.equal(senderInitalBalance.minus(value).toNumber(), senderEndingBalance.toNumber());
    });

    it("donation - throw suplied organization doesn't have a correct owner address", async () => {

        let instance = await NonGovernmentalOrganizations.deployed();

        let value = 10;
        let senderAddress = accounts[1];

        try {
            let incorrectOrganizationId = 0;
            await instance.donation(incorrectOrganizationId,
                { value: web3.toWei(value, "ether"), gasPrice: 0, from: senderAddress });
            assert.fail("Expected throw suplied organization doesn't have a correct owner address");
        } catch (error) {
            assert.equal(error.message, "VM Exception while processing transaction: revert suplied organization ID doesn't have a correct owner address");
        }
    });

    it("donation - throw suplied organization doesn't exits", async () => {

        let instance = await NonGovernmentalOrganizations.deployed();

        let value = 10;
        let senderAddress = accounts[1];

        try {
            let unknownOrganizationId = 2;
            await instance.donation(unknownOrganizationId,
                { value: web3.toWei(value, "ether"), gasPrice: 0, from: senderAddress });
            assert.fail("Expected throw suplied organization doesn't exits");
        } catch (error) {
            assert.equal(error.message, "VM Exception while processing transaction: invalid opcode");
        }
    });
});