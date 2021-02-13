var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var AnotherSimpleStorage = artifacts.require("./AnotherSimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(AnotherSimpleStorage);
};



