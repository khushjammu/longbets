import React from "react";
import ContractPreview from "./contractPreview";

const ContractCreator = ({ web3, contract }) => {
	const [arbiter, setArbiter] = React.useState(null);
	const [challenger, setChallenger] = React.useState(null);
	const [pred, setPred] = React.useState(
		"E.g CSS pseudo-element applies styles to the first line of a block-level element. Note that the length of the first line depends on many factors, including the width of the element, the width of the document, and the font size of the text."
	);
	const [arbiterValid, setArbiterValid] = React.useState("Short");
	const [challengerValid, setChallengerValid] = React.useState("Short");
	const [stake, setStake] = React.useState(0);
	const [accounts, setAccounts] = React.useState(null);
	const [showModal, setShowModal] = React.useState(false);
	const [editingWho, setEditingWho] = React.useState("Arbiter");

	React.useEffect(() => {
		if (showModal) {
			document.body.style.position = "fixed";
			document.body.style.overflowY = "scroll";
			document.body.style.width = "100%";
		} else {
			document.body.style.position = "unset";
			document.body.style.overflowY = "unset";
			document.body.style.width = "unset";
		}
	}, [showModal]);

	web3.eth.getAccounts((error, result) => {
		if (error) {
			console.log(error);
		} else {
			setAccounts(result);
		}
	});

	const editAddressModal = (field) => {
		setEditingWho(field);
		setShowModal(true);
	};

	const arbiterValidUpdate = React.useCallback(
		(e) => {
			if (e.target.value.length < 42) {
				setArbiterValid("Short");
			} else {
				if (web3.utils.isAddress(e.target.value) === false) {
					setArbiterValid("Invalid");
				} else {
					setArbiterValid("Valid");
				}
			}
		},
		[setArbiter]
	);

	const challengerValidUpdate = React.useCallback(
		(e) => {
			if (e.target.value.length < 42) {
				setChallengerValid("Short");
			} else {
				if (web3.utils.isAddress(e.target.value) === false) {
					setChallengerValid("Invalid");
				} else {
					setChallengerValid("Valid");
				}
			}
		},
		[setChallenger]
	);

	React.useEffect(() => {
		const close = (e) => {
			if (e.keyCode === 27) {
				setShowModal(false);
			}
		};
		window.addEventListener("keydown", close);
		return () => window.removeEventListener("keydown", close);
	}, []);

	const createNewBet = async () => {
		const stonks = await contract.methods
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

	const stakeToUSD = (stake) => {
		return stake * 1, 808.09;
	};

	const threeDots = () => {
		return (
			<div class="flex w-full items-center justify-center space-x-5">
				<div class="rounded-full border-2 w-2 h-2 border-pink-300"></div>
				<div class="rounded-full border-2 w-3 h-3 border-pink-300"></div>
				<div class="rounded-full border-2 w-2 h-2 border-pink-300"></div>
			</div>
		);
	};

	return (
		<div class="w-3/5 h-auto p-10 justify-center border-1 border-gray-700 rounded-lg">
			{showModal ? (
				<div>
					<div class="justify-center items-center flex overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div class="relative my-6 w-1/5 bg-black shadow-lg">
							<div class="border-2 border-gray-700 rounded-lg relative flex flex-col outline-none focus:outline-none p-4">
								<div class="w-full space-y-2">
									<div class="text-2xl font-bold text-white">
										<label>Set {editingWho}</label>
									</div>
									<div class="w-full space-y-2">
										<div class="flex justify-between text-sm font-medium mb-1">
											<label class="text-white">
												Address
											</label>
											{editingWho == "Arbiter" ? (
												<label
													class={
														arbiterValid == "Valid"
															? "text-green-400"
															: "text-red-400"
													}
												>
													{arbiterValid}
												</label>
											) : (
												<label
													class={
														challengerValid ==
														"Valid"
															? "text-green-400"
															: "text-red-400"
													}
												>
													{challengerValid}
												</label>
											)}
										</div>
										<input
											type="text"
											id="addressInput"
											class="transition duration-100 ease-in-out hover:focus:border-pink-300 hover:border-white focus:border-pink-300 w-full sm:text-sm text-white border-gray-700 border-1 bg-black rounded-md"
											placeholder="0xc0000..."
											maxLength={42}
											onChange={
												editingWho == "Arbiter"
													? arbiterValidUpdate
													: challengerValidUpdate
											}
										/>
										<button
											class="hover:border-pink-300 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow"
											onClick={() => {
												setShowModal(false);
												if (editingWho == "Arbiter") {
													let value = document.getElementById(
														"addressInput"
													).value;
													if (
														arbiterValid == "Valid"
													) {
														setArbiter(value);
													}
												} else if (
													editingWho == "Challenger"
												) {
													let value = document.getElementById(
														"addressInput"
													).value;
													if (
														challengerValid ==
														"Valid"
													) {
														setChallenger(value);
													}
												}
											}}
										>
											Close
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</div>
			) : null}

			<div class="flex-auto flex-wrap space-y-4 w-full">
				<div class="flex flex-wrap justify-center">
					<div class="w-72 h-auto p-5 flex flex-wrap justify-center space-y-3 content-center border-2 border-pink-300">
						<h2
							class="text-white text-justify text-md font-medium transition duration-200 ease-in-out hover:underline"
							onClick={() => editAddressModal("Predictor")}
						>
							{pred.length > 60
								? pred.substr(0, 60) + "..."
								: pred}
						</h2>
						{threeDots()}
						<div class="flex flex-wrap w-full justify-center space-y-2 text-right">
							<div class="text-md font-bold">
								<a
									href={
										"https://etherscan.io/address/" +
										"0xf9E5B730123B51041093a3dea65bcFB5102E0D2d"
									}
									class="text-pink-300"
								>
									PREDICTOR:{" "}
								</a>
								<button
									class="hover:border-pink-300 text-sm text-white font-semibold py-1 px-2 border border-gray-700 rounded shadow justify-between outline-none focus:outline-none"
									onClick={() =>
										editAddressModal("Predictor")
									}
								>
									0xf9E5B730...
								</button>
							</div>
							<div class="text-md font-bold">
								<a
									href={
										"https://etherscan.io/address/" +
										challenger
									}
									class="text-pink-300"
								>
									CHALLENGER:{" "}
								</a>
								<button
									class="hover:border-pink-300 text-sm text-white font-semibold py-1 px-2 border border-gray-700 rounded shadow justify-between outline-none focus:outline-none"
									onClick={() =>
										editAddressModal("Challenger")
									}
								>
									{challenger != null
										? challenger.substring(0, 8) + "..."
										: "Set Address"}
								</button>
							</div>
							<div
								class="text-md font-bold"
								href={"https://etherscan.io/address/" + arbiter}
							>
								<a
									href={
										"https://etherscan.io/address/" +
										arbiter
									}
									class="text-pink-300"
								>
									ARBITER:{" "}
								</a>
								<button
									class="hover:border-pink-300 text-sm text-white font-semibold py-1 px-2 border border-gray-700 rounded shadow justify-between outline-none focus:outline-none"
									onClick={() => editAddressModal("Arbiter")}
								>
									{arbiter != null
										? arbiter.substring(0, 8) + "..."
										: "Set Address"}
								</button>
							</div>
						</div>
						{threeDots()}
						<div class="text-md font-bold text-center">
							<p>
								<a class="text-white">{stake}</a>
								<a class="text-pink-300"> ETH</a>
							</p>
							<p>
								<a class="text-pink-300">( </a>
								<a class="text-white">${stakeToUSD(stake)}</a>
								<a class="text-pink-300"> USD</a>
								<a class="text-pink-300"> )</a>
							</p>
						</div>
					</div>
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
							class="transition duration-100 ease-in-out hover:focus:border-pink-300 hover:border-white focus:border-pink-300 w-full h-20 text-white resize-none sm:text-sm border-gray-700 border-1 bg-black rounded-md"
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
							<span class="text-gray-500 sm:text-sm">Ξ</span>
						</div>
						<input
							type="text"
							name="price"
							id="price"
							class="transition duration-100 ease-in-out hover:focus:border-pink-300 hover:border-white focus:border-pink-300 block w-full text-white pl-7 pr-12 sm:text-sm border-gray-700 border-1 bg-black rounded-md"
							placeholder="0.00"
							onChange={(e) => setStake(e.target.value)}
						/>
						<div class="absolute inset-y-0 right-0 flex items-center">
							<label class="sr-only">ETH</label>
						</div>
					</div>
				</div>
				<div class="flex justify-center">
					<div class="w-1/2">
						<button
							class="hover:border-pink-300 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow justify-between outline-none focus:outline-none"
							onClick={() => editAddressModal("Arbiter")}
						>
							{arbiter != null
								? arbiter.substring(0, 8) + "..."
								: "Set Arbiter"}
						</button>
					</div>
					<div class="w-1/2">
						<button
							class="hover:border-pink-300 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow justify-between outline-none focus:outline-none"
							onClick={() => editAddressModal("Challenger")}
						>
							{challenger != null
								? challenger.substring(0, 8) + "..."
								: "Set Challenger"}
						</button>
					</div>
				</div>
				<div>
					<button
						class="hover:border-pink-300 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow justify-center"
						onClick={createNewBet}
					>
						Submit Prediction
					</button>
				</div>
			</div>
		</div>
	);
};

export default ContractCreator;
