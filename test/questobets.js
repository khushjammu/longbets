const QuestoBets = artifacts.require("./QuestoBets.sol");
const LongBet = artifacts.require("./LongBet.sol")


contract("QuestoBets", accounts => {
  it("...should store the value 89.", async () => {
  	const qb = await QuestoBets.deployed();

  	qb.newBet("i predict the world will end", accounts[1], accounts[2], accounts[0], accounts[1], "stonks", "stonks", {from: accounts[0], value: web3.utils.toWei("1", "ether")})

  	let betAddress = await qb.bets(0);
  	let bet = await LongBet.at(betAddress);

  	await bet.acceptBet({from: accounts[0]})
  	await bet.acceptBet({from: accounts[1]})
  	await bet.acceptBet({from: accounts[2]})

  	// both predictor and challenger
  	await bet.vote(1, {from: accounts[0]})
  	await bet.vote(1, {from: accounts[1]})

  	// try to vote from arbiter acc, should fail b/c contract is resolved
  	// await bet.vote(1, {from: accounts[2]})

    // const simpleStorageInstance = await SimpleStorage.deployed();

    // // Set value of 89
    // await simpleStorageInstance.set(89, { from: accounts[0] });

    // // Get stored value
    // const storedData = await simpleStorageInstance.get.call();

    // assert.equal(storedData, 89, "The value 89 was not stored.");
  });
});
