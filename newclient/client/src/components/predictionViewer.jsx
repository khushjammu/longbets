import React from "react";

const PredictionViewer = ({ web3, questoBets }) => {
	const [predictor, setPredictor] = React.useState(
		"0x00192Fb10dF37c9FB26829eb2CC623cd1BF599E8"
	);
	const [arbiter, setArbiter] = React.useState(
		"0x22bdb2ac416bb2fa0cef4db0ce716f0d0c7e5e6e"
	);
	const [challenger, setChallenger] = React.useState("");
	const [pred, setPred] = React.useState("");
	const [stake, setStake] = React.useState(0);

	// const [accounts, setAccounts] = React.useState(null);

	// web3.eth.getAccounts((error, result) => {
	// 	if (error) {
	// 		console.log(error);
	// 	} else {
	// 		setAccounts(result);
	// 	}
	// });

	// const getBet = async () => {
	// 	let bet = await longBet.at(address)
	// 	const stonks = await
	// 		.newBet(
	// 			"0xbf612630b11f2d771a531a164294c342f57a1ca8",
	// 			"0xc09b14708e18213db3a4ad3401b0f1299dcccd88",
	// 			accounts[0],
	// 			"0xbf612630b11f2d771a531a164294c342f57a1ca8",
	// 			"stonks",
	// 			"stonks"
	// 		)
	// 		.send({
	// 			from: accounts[0],
	// 			value: web3.utils.toWei(stake.toString(), "ether"),
	// 		});

	// 	console.log(stonks);
	// };

	const stakeBox = (participant) => {
		switch (participant) {
			case "PREDICTOR":
				return (
					<div class="flex flex-wrap border-2 border-green-400 text-green-400 rounded-lg p-2">
						<p>0.0312 ETH</p>
					</div>
				);
				break;
			case "CHALLENGER":
				return (
					<div class="transition duration-100 ease-in-out hover:border-white flex flex-wrap border-2 border-red-600 hover:text-white text-red-600 rounded-lg p-2">
						<p>0.0312 ETH</p>
					</div>
				);
				break;
			default:
		}
	};

	const generateParticipant = (participant, address) => {
		return (
			<div class="space-y-2 justify-center">
				<div class="transition duration-100 ease-in-out p-2 text-white border-2 border-white hover:border-blue-700 rounded-lg hover:text-blue-700">
					<h2 class="font-bold text-xl">{participant}</h2>
					<a
						href={"https://etherscan.io/address/" + address}
						class=""
					>
						{address.substr(0, 9) + "..."}
					</a>
				</div>
				<div>{stakeBox(participant)}</div>
			</div>
		);
	};

	return (
		<div class="w-3/5 h-auto p-10 justify-center border-1 border-gray-700 rounded-lg">
			<div class="flex-auto flex-wrap">
				<div class="flex flex-wrap space-y-8">
					<h2 class="text-white text-center text-italic text-xl font-medium">
						"A bioterror or bioerror will lead to one million
						casualties in a single event within a six month period
						starting no later than Dec 31 02020."
					</h2>
					<div class="flex justify-between w-full">
						{generateParticipant("PREDICTOR", predictor)}
						{generateParticipant("ARBITER", arbiter)}
						{generateParticipant("CHALLENGER", arbiter)}
					</div>
					<h1 class="text-white text-center text-4xl font-bold">
						STAKE: 0.0624 ETH
					</h1>
				</div>
			</div>
		</div>
	);
};

export default PredictionViewer;
