import React from "react";
import ContractPreview from "./contractPreview";

const ContractCreator = ({ web3, contract }) => {
	const [arbiter, setArbiter] = React.useState("");
	const [challenger, setChallenger] = React.useState("");
	const [pred, setPred] = React.useState(
		"I predict that there will be another pandemic which kills >1M people by 2030."
	);
	const [predArgument, setPredArgument] = React.useState(
		"People never learn from their mistakes. This will prove itself time and time again."
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

	const isReadyToSubmit = () => {
		if (
			arbiterValid === "Valid" &&
			challengerValid === "Valid" &&
			pred !== "" &&
			predArgument !== "" &&
			stake > 0
		) {
			return true;
		} else {
			return false;
		}
	};

	const stakeToUSD = (stake) => {
		return (stake * 1808.09).toFixed(2);
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

	const contractPreview = () => (
		<div class="w-80 h-auto p-5 flex flex-wrap justify-center space-y-3 content-center border-2 border-pink-300">
			<h2
				class="text-white text-center text-md font-medium transition duration-200 ease-in-out"
				maxLength="1"
				// onClick={() => editAddressModal("Predictor")}
			>
				{pred.length === 0
					? "Your prediction here..."
					: pred.length > 60
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
						onClick={() => editAddressModal("Predictor")}
					>
						0xf9E5B730...
					</button>
				</div>
				<div class="text-md font-bold">
					<a
						href={"https://etherscan.io/address/" + challenger}
						class="text-pink-300"
					>
						CHALLENGER:{" "}
					</a>
					<button
						class="hover:border-pink-300 text-sm text-white font-semibold py-1 px-2 border border-gray-700 rounded shadow justify-between outline-none focus:outline-none"
						onClick={() => editAddressModal("Challenger")}
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
						href={"https://etherscan.io/address/" + arbiter}
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
					<a class="text-white">{stake === "" ? "0.00" : stake}</a>
					<a class="text-pink-300"> ETH</a>
				</p>
				<p>
					<a class="text-pink-300">( </a>
					<a class="text-white">
						${Number(stakeToUSD(stake)).toLocaleString()}
					</a>
					<a class="text-pink-300"> USD</a>
					<a class="text-pink-300"> )</a>
				</p>
			</div>
		</div>
	);

	// todo: add a save and cancel button here
	const modal = () => (
		<div>
			<div class="justify-center items-center flex overflow-y-auto fixed inset-0 z-50 bg-black bg-opacity-50 outline-none focus:outline-none">
				<div class="relative my-6 w-3/12 bg-black shadow-lg">
					<div class="border-2 border-gray-700 rounded-lg relative flex flex-col outline-none focus:outline-none p-7">
						<div class="w-full space-y-2">
							<div class="text-2xl font-bold text-white">
								<label>Set {editingWho}</label>
							</div>
							<div class="w-full space-y-4">
								<div>
									<div class="flex justify-between text-md font-medium">
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
													challengerValid == "Valid"
														? "text-green-400"
														: "text-red-400"
												}
											>
												{challengerValid}
											</label>
										)}
									</div>
									<input
										autoFocus
										defaultValue={
											editingWho === "Arbiter"
												? arbiter
												: challenger
										}
										type="text"
										id="addressInput"
										class="transition duration-100 ease-in-out focus:ring-1 focus:ring-pink-300 focus:border-transparent w-full sm:text-md text-white border-gray-700 border-1 bg-black rounded-md"
										placeholder="0xc0000..."
										maxLength={42}
										onFocus={(event) =>
											event.target.select()
										}
										onChange={
											editingWho === "Arbiter"
												? arbiterValidUpdate
												: challengerValidUpdate
										}
									/>
								</div>
								<button
									class="hover:border-pink-300 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow"
									onClick={() => {
										setShowModal(false);
										if (editingWho == "Arbiter") {
											let value = document.getElementById(
												"addressInput"
											).value;
											if (arbiterValid == "Valid") {
												setArbiter(value);
											}
										} else if (editingWho == "Challenger") {
											let value = document.getElementById(
												"addressInput"
											).value;
											if (challengerValid == "Valid") {
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
	);

	return (
		<div class="w-3/5 my-10 h-auto justify-center border-1 border-gray-700 rounded-lg">
			{showModal ? modal() : null}

			<div class="flex-auto flex-wrap w-full">
				<div class="flex flex-wrap justify-center lg:mt-10 lg:mb-20">
					{contractPreview()}
				</div>

				<div class="space-y-3">
					<div>
						<div class="flex justify-between text-xl text-white font-medium">
							<label>What's your prediction?</label>
							<label>{pred.length}/300</label>
						</div>
						<div class="rounded-md mt-1">
							<textarea
								value={pred}
								type="text"
								name="prediction"
								id="prediction"
								class="transition duration-100 ease-in-out focus:ring-1 focus:ring-pink-300 focus:border-transparent w-full h-20 text-white resize-none text-md border-gray-700 border-1 bg-black rounded-md"
								placeholder="Provide a one sentence summary of your prediction."
								maxLength={300}
								onChange={(e) => setPred(e.target.value)}
							/>
						</div>
					</div>
					<div>
						<div class="flex justify-between text-xl text-white font-medium">
							<label>Why might your prediction happen?</label>
							<label>{predArgument.length}/1000</label>
						</div>
						<div class="rounded-md mt-1">
							<textarea
								value={predArgument}
								type="text"
								name="predictionArgument"
								id="predictionArgument"
								class="transition duration-100 ease-in-out focus:ring-1 focus:ring-pink-300 focus:border-transparent w-full h-20 text-white resize-none text-md border-gray-700 border-1 bg-black rounded-md"
								placeholder="Provide a short argument for your prediction."
								maxLength={1000}
								onChange={(e) =>
									setPredArgument(e.target.value)
								}
							/>
						</div>
					</div>
					<div>
						<label class="text-xl font-medium text-white">
							Stake
						</label>
						<div class="mt-1 relative rounded-md shadow-sm">
							<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<span class="text-gray-500 sm:text-sm">Ξ</span>
							</div>
							<input
								type="number"
								name="price"
								id="price"
								class="transition duration-100 ease-in-out focus:ring-1 focus:ring-pink-300 focus:border-transparent w-full text-white pl-7 pr-12 text-md border-gray-700 border-1 bg-black rounded-md"
								placeholder="0.00"
								onChange={(e) => setStake(e.target.value)}
							/>
							<div class="absolute inset-y-0 right-0 flex items-center">
								<label class="sr-only">ETH</label>
							</div>
						</div>
					</div>
					<div class="flex justify-center space-x-3">
						<div class="w-1/2">
							<label class="block text-xl font-medium text-white">
								Arbiter
							</label>
							<div class="mt-1 relative rounded-md shadow-sm">
								<div
									onClick={() => editAddressModal("Arbiter")}
								>
									<input
										disabled
										type="text"
										value={arbiter}
										class="transition overflow-ellipsis	duration-100 ease-in-out focus:ring-1 focus:ring-pink-300 focus:border-transparent w-full text-white px-3 text-md border-gray-700 border-1 bg-black rounded-md"
										placeholder="0x0000000000000000000000000000000000000000"
									/>
								</div>
							</div>
						</div>
						<div class="w-1/2">
							<label class="block text-xl font-medium text-white">
								Challenger
							</label>
							<div class="mt-1 relative rounded-md shadow-sm">
								<div
									onClick={() =>
										editAddressModal("Challenger")
									}
								>
									<input
										disabled
										type="text"
										value={challenger}
										class="transition overflow-ellipsis	duration-100 ease-in-out focus:ring-1 focus:ring-pink-300 focus:border-transparent w-full text-white px-3 text-md border-gray-700 border-1 bg-black rounded-md"
										placeholder="0x0000000000000000000000000000000000000000"
									/>
								</div>
							</div>
						</div>
					</div>
					{arbiter !== "" &&
					challenger !== "" &&
					arbiter === challenger ? (
						<h1 class="text-red-300 px-3 text-md border-gray-700 border-1 bg-black rounded-md">
							Error: your arbiter and challenger cannot be the
							same person.
						</h1>
					) : null}
				</div>

				<div class="mt-10">
					{isReadyToSubmit() ? (
						<button
							class="hover:border-pink-300 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow justify-center"
							onClick={createNewBet}
						>
							Submit Prediction
						</button>
					) : (
						<button
							disabled
							class="relative text-gray-700 font-semibold py-2 px-4 border border-gray-700 rounded shadow justify-center mb-20"
							onClick={createNewBet}
						>
							Submit Prediction
							<div class="absolute bg-red-100 border border-grey-100 px-4 py-2 hidden hover:block">
								Boo!
							</div>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ContractCreator;
