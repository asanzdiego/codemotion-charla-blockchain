pragma solidity ^0.4.21;
contract NonGovernmentalOrganizations {

    struct Organization {
        uint id;
        address owner;
        string name;
    }

    Organization[] public organizations;

    mapping(address => uint) public ownerToOrganizationId;

    constructor() public {

        organizations.push(Organization(0, 0, "0")); // to fix problem with nulls
    }

    event OrganizationCreated(uint indexed id, address indexed owner, string name);
    event DonationSubmitted(uint indexed id, address indexed owner, address indexed sender, uint value);

    modifier ownerNotExists() {

        require(ownerToOrganizationId[msg.sender] == 0, "suplied owner already have an organization");
        _;
    }

    modifier ownerExists(uint _organizationId) {

        require(organizations[_organizationId].owner != address(0), "suplied organization ID doesn't have a correct owner address");
        _;
    }

    function addOrganization(string _name) external 
        ownerNotExists() {

        uint organizationId = organizations.push(Organization(organizations.length, msg.sender, _name)) - 1;
        ownerToOrganizationId[msg.sender] = organizationId;
        emit OrganizationCreated(organizationId, msg.sender, _name);
    }

    function donation(uint _organizationId) external payable
        ownerExists(_organizationId) {

        organizations[_organizationId].owner.transfer(msg.value);
        emit DonationSubmitted(_organizationId, organizations[_organizationId].owner, msg.sender, msg.value);
    }


    function getOrganizationsLength() external view returns(uint) {

        return organizations.length;
    }

}