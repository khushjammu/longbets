const truffleAssert = require('truffle-assertions');

const QuestoBets = artifacts.require("./QuestoBets.sol");
const LongBet = artifacts.require("./LongBet.sol")

contract("QuestoBets", accounts => {
  var qb;

  // necessary to reset contract between each test
  beforeEach(() => {
     return QuestoBets.new()
     .then((instance) => {
        qb = instance;
     });
  });

  it("...should work fine from start to finish.", async () => {
  	// const qb = await QuestoBets.deployed();

    const balance1 = await web3.eth.getBalance(accounts[0])
  	await qb.newBet("i predict the world will end", accounts[1], accounts[2], accounts[0], accounts[1], "stonks", "stonks", {from: accounts[0], value: web3.utils.toWei("1", "ether")})
    const balance2 = await web3.eth.getBalance(accounts[1])

  	let betAddress = await qb.bets(0);
  	let bet = await LongBet.at(betAddress);

  	await bet.acceptBet({from: accounts[0]})
  	await bet.acceptBet({from: accounts[1], value: web3.utils.toWei("1", "ether")}) // challenger has to deposit stake
  	await bet.acceptBet({from: accounts[2]})

  	// both predictor and challenger
  	await bet.vote(1, {from: accounts[0]})
  	await bet.vote(1, {from: accounts[1]})
  });

  it("...should work if challenger offers an equal stake", async () => {
    // const qb = await QuestoBets.deployed();
    await qb.newBet("i predict the world will end", accounts[1], accounts[2], accounts[0], accounts[1], "stonks", "stonks", {from: accounts[0], value: web3.utils.toWei("1", "ether")})

    let betAddress = await qb.bets(0);
    let bet = await LongBet.at(betAddress);

    // this should work fine
    await bet.acceptBet({from: accounts[0]})
    await bet.acceptBet({from: accounts[1], value: web3.utils.toWei("1", "ether")}) // challenger has to deposit stake

  });

  it("...should throw if challenger doesn't offer an equal stake", async () => {
    // const qb = await QuestoBets.deployed();
    await qb.newBet("i predict the world will end", accounts[1], accounts[2], accounts[0], accounts[1], "stonks", "stonks", {from: accounts[0], value: web3.utils.toWei("1", "ether")})

    let betAddress = await qb.bets(0);
    let bet = await LongBet.at(betAddress);

    await bet.acceptBet({from: accounts[0]})

    await truffleAssert.reverts(bet.acceptBet({from: accounts[1]}));
  });

  it("...should be able to edit arguments", async () => {
    const originalArguments = {
      predictor: "previous",
      challenger: "previous",
      arbiter: "previous",
      terms: "previous"
    }
    // const qb = await QuestoBets.deployed();
    await qb.newBet(
      "i predict the world will end", 
      accounts[1], 
      accounts[2], 
      accounts[0], 
      accounts[1], 
      originalArguments["predictor"], 
      originalArguments["terms"], 
      {from: accounts[0], value: web3.utils.toWei("1", "ether")}
    )

    let betAddress = await qb.bets(0);
    let bet = await LongBet.at(betAddress);

    await bet.editArgument("after", {from: accounts[0]})
    await bet.editArgument("after", {from: accounts[1]})
    await bet.editArgument("after", {from: accounts[2]})

    assert(await bet.predictorArg() === "after")
    assert(await bet.challengerArg() === "after")
    assert(await bet.arbiterArg() === "after")

    await bet.editTerms("after", {from: accounts[2]})
    assert(await bet.detailedTerms() === "after")
  });
});
