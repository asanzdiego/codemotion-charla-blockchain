var NonGovernmentalOrganizations = artifacts.require("./NonGovernmentalOrganizations.sol");

module.exports = function(deployer) {
  deployer.deploy(NonGovernmentalOrganizations);
};
