import React from "react";

const MainPage = ({ web3, contract }) => {
	return (
		<div class="w-3/5 h-auto p-10 justify-center border-1 border-gray-700 rounded-lg">
			<div class="flex-auto flex-wrap space-y-4 w-full">
				<div class="flex justify-between text-sm font-medium text-white">
					<h1 class="text-blue-700 font-bold">
						{"0x526c..."} bet {"0.0312 ETH"} that...
					</h1>
					<h2 class="text-white font-medium">
						Donald Trump will kill himself by the end of 2021.
					</h2>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
