import React from "react";

const PredictionViewer = ({ web3, questoBets, longBet, location }) => {
	const [predictor, setPredictor] = React.useState("");
	const [arbiter, setArbiter] = React.useState("");
	const [challenger, setChallenger] = React.useState("");
	const [pred, setPred] = React.useState("");
	const [stake, setStake] = React.useState(0);
	
	const [accounts, setAccounts] = React.useState(null);

	web3.eth.getAccounts((error, result) => {
		if (error) {
			console.log(error);
		} else {
			setAccounts(result);
		}
	});

	const getBet = async () => {
		let bet = await longBet.at(address)
		const stonks = await 
			.newBet(
				"0xbf612630b11f2d771a531a164294c342f57a1ca8",
				"0xc09b14708e18213db3a4ad3401b0f1299dcccd88",
				accounts[0],
				"0xbf612630b11f2d771a531a164294c342f57a1ca8",
				"stonks",
				"stonks"
			)
			.send({
				from: accounts[0],
				value: web3.utils.toWei(stake.toString(), "ether"),
			});

		console.log(stonks);
	};

	return (
		<div class="w-3/5 h-auto p-10 justify-center border-1 border-gray-700 rounded-lg">
			<div class="flex-auto flex-wrap space-y-4 w-full">
				<div class="flex justify-between text-sm font-medium text-white">
					<h1 class="text-blue-700">{"0x526c..."} bet {} that...</h1>
					<h2>{pred}</h2>
				</div>
				<div>
					<div class="flex justify-between text-sm font-medium text-white">
						<label>What is your prediction?</label>
						<label>{pred.length}/300</label>
					</div>
					<div class="rounded-md mt-1">
						<textarea
							type="text"
							name="prediction"
							id="prediction"
							class="transition duration-100 ease-in-out hover:focus:border-blue-700 hover:border-white focus:border-blue-700 w-full h-20 text-white resize-none sm:text-sm border-gray-700 border-1 bg-black rounded-md"
							placeholder="Provide a one sentence summary of your prediction."
							disabled={pred.length < 300 ? false : true}
							maxLength={300}
							onChange={(e) => setPred(e.target.value)}
						/>
					</div>
				</div>
				<div>
					<label class="block text-sm font-medium text-white">
						Stake
					</label>
					<div class="mt-1 relative rounded-md shadow-sm">
						<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<span class="text-gray-500 sm:text-sm">$</span>
						</div>
						<input
							type="text"
							name="price"
							id="price"
							class="transition duration-100 ease-in-out hover:focus:border-blue-700 hover:border-white focus:border-blue-700 block w-full text-white pl-7 pr-12 sm:text-sm border-gray-700 border-1 bg-black rounded-md"
							placeholder="0.00"
							onChange={(e) => setStake(e.target.value)}
						/>
						<div class="absolute inset-y-0 right-0 flex items-center">
							<label class="sr-only">ETH</label>
							{/*
							<select
								id="token"
								name="token"
								class="focus:border-blue-700 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
							>
								<option>ETH</option>

								<option>DAI</option>
								<option>cDAI</option>
								<option>USDC</option>
							</select>
							*/}
						</div>
					</div>
				</div>
				<div class="flex justify-center">
					<div class="w-1/2">
						<div class="text-sm font-medium text-white">
							<label>Arbiter address</label>
						</div>
						<div class="rounded-md w-full mt-1">
							<input
								type="text"
								name="arbiterAddress"
								id="arbiterAddress"
								class="transition duration-100 ease-in-out hover:focus:border-blue-700 hover:border-white focus:border-blue-700 w-4/5 sm:text-sm text-white border-gray-700 border-1 bg-black rounded-md"
								placeholder="0xc0000..."
								maxLength={42}
								onChange={arbiterValidUpdate}
							/>
							{/*<label
								class={
									"w-1/5 sm:text-sm border-gray-700 border-1 bg-black ml-1 py-2.5 px-4 rounded-md " +
									(arbiterValid === "Valid"
										? "bg-green-500 text-white"
										: "bg-red-500 text-white")
								}
							>
								{arbiterValid}
							</label>*/}
						</div>
					</div>
					<div class="w-1/2">
						<div class="text-sm font-medium text-white">
							<label>Challenger address</label>
						</div>
						<div class="rounded-md mt-1">
							<input
								type="text"
								name="challengerAddress"
								id="challengerAddress"
								class="transition duration-100 ease-in-out hover:focus:border-blue-700 hover:border-white focus:border-blue-700 w-4/5 sm:text-sm text-white border-gray-700 border-1 bg-black rounded-md"
								placeholder="0xc0000..."
								maxLength={42}
								onChange={challengerValidUpdate}
							/>
							{/*<label
								class={
									"w-1/5 sm:text-sm border-gray-700 border-1 bg-black ml-1 py-2.5 px-4 rounded-md " +
									(challengerValid == "Valid"
										? "bg-green-500 text-white"
										: "bg-red-500 text-white")
								}
							>
								{challengerValid}
							</label>*/}
						</div>
					</div>
				</div>
				<div>
					<button
						class="bg-blue-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow justify-center"
						onClick={createNewBet}
					>
						Submit prediction
					</button>
				</div>
			</div>
		</div>
	);
};

export default PredictionViewer;
