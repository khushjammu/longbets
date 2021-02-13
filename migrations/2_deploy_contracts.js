var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var AnotherSimpleStorage = artifacts.require("./AnotherSimpleStorage.sol");
var QuestoBets = artifacts.require("./QuestoBets.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(AnotherSimpleStorage);
  deployer.deploy(QuestoBets);
};



