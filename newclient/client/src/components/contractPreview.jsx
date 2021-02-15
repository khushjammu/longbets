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
			<h2 class="text-white text-center text-md font-medium">
				{prediction.length > 60
					? prediction.substr(0, 60) + "..."
					: prediction}
			</h2>
			{threeDots()}
			<div>
				<div class="text-md font-bold">
					<a class="text-pink-300">ETH </a>
					<a class="text-white">{stake}</a>
				</div>
				<div class="text-md font-bold">
					<a class="text-pink-300">ETH </a>
					<a class="text-white">{stake}</a>
				</div>
				<div class="text-md font-bold">
					<a class="text-pink-300">ETH </a>
					<a class="text-white">{stake}</a>
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
