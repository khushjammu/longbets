import React from "react";
import Modal from "react-modal";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		backgroundColor: "black",
		borderRadius: "",
	},
	overlay: {
		backgroundColor: "#11111",
		backdropFilter: "blur(6px)",
	},
};

const ContractCreator = ({ web3, contract }) => {
	const [arbiter, setArbiter] = React.useState("");
	const [challenger, setChallenger] = React.useState("");
	const [pred, setPred] = React.useState("");
	const [arbiterValid, setArbiterValid] = React.useState("Short");
	const [challengerValid, setChallengerValid] = React.useState("Short");
	const [stake, setStake] = React.useState(0);
	const [accounts, setAccounts] = React.useState(null);
	const [showModal, setShowModal] = React.useState(true);
	const [editingWho, setEditingWho] = React.useState(null);

	React.useEffect(() => {
		if (showModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
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
		setShowModal(true);
	};

	const arbiterValidUpdate = React.useCallback(
		(e) => {
			if (e.target.value.length < 42) {
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

	return (
		<div class="w-3/5 h-auto p-10 justify-center border-1 border-gray-700 rounded-lg">
			<Modal
				isOpen={showModal}
				onRequestClose={() => setShowModal(false)}
				// style={customStyles}
				class="top-1/2 left-1/2"
			>
				<button onClick={() => setShowModal(false)}>close</button>
				<div class="rounded-md w-full mt-1">
					<div class="text-sm font-medium text-white">
						<label>Arbiter address</label>
					</div>
					<input
						type="text"
						class="transition duration-100 ease-in-out hover:focus:border-blue-700 hover:border-white focus:border-blue-700 w-4/5 sm:text-sm text-white border-gray-700 border-1 bg-black rounded-md"
						placeholder="0xc0000..."
						maxLength={42}
						onChange={
							editingWho == "arbiter" ? setArbiter : setChallenger
						}
					/>
				</div>
			</Modal>
			<div class="flex-auto flex-wrap space-y-4 w-full">
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
						<button
							class="bg-blue-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow justify-center"
							onClick={() => editAddressModal(arbiter)}
						>
							Set Arbiter
						</button>
					</div>
					<div class="w-1/2">
						<button
							class="bg-blue-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow justify-center"
							onClick={() => editAddressModal(arbiter)}
						>
							Set Arbiter
						</button>
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

export default ContractCreator;
