const Business = artifacts.require("Business");

module.exports = function(deployer) {
  deployer.deploy(Business);
};
