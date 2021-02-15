import React from "react";

const ContractPreview = ({
	prediction,
	predictor,
	arbiter,
	challenger,
	stake,
}) => {
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
		<div class="w-72 h-auto p-5 flex flex-wrap justify-center space-y-3 content-center border-2 border-pink-300">
			<h2 class="text-white text-justify text-md font-medium">
				{prediction.length > 60
					? prediction.substr(0, 60) + "..."
					: prediction}
			</h2>
			{threeDots()}
			<div class="flex w-full justify-center">
				<div class="text-right">
					<div class="text-md font-bold">
						<a
							href={"https://etherscan.io/address/" + predictor}
							class="text-pink-300"
						>
							PREDICTOR:{" "}
						</a>
						<a
							href={"https://etherscan.io/address/" + predictor}
							class="text-white transition duration-100 ease-in-out hover:border-b-2 hover:text-pink-300"
						>
							{predictor.substr(0, 8) + "..."}
						</a>
					</div>
					<div class="text-md font-bold">
						<a
							href={"https://etherscan.io/address/" + challenger}
							class="text-pink-300"
						>
							CHALLENGER:{" "}
						</a>
						<a
							href={"https://etherscan.io/address/" + challenger}
							class="text-white transition duration-100 ease-in-out hover:border-b-2 hover:text-pink-300"
						>
							{challenger.substr(0, 8) + "..."}
						</a>
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
						<a
							href={"https://etherscan.io/address/" + arbiter}
							class="text-white transition duration-100 ease-in-out hover:border-b-2 hover:text-pink-300"
						>
							{arbiter.substr(0, 8) + "..."}
						</a>
					</div>
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
	);
};

export default ContractPreview;
