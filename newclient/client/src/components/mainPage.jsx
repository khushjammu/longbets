import React from "react";
import Ticker from "react-ticker";

const MainPage = ({ web3, contract }) => {
	const TICKER_TEXT = "GME to $1000...The Second Coming before 2025...China and the US declare war on each other in 2021...Trump comes back in 2024...GME to $1000...The Second Coming before 2025...China and the US declare war on each other in 2021...Trump comes back in 2024...A bitcoin will be worth less than USD$1k by the end of 2025...GME to $1000...The Second Coming before 2025...China and the US declare war on each other in 2021...Trump comes back in 2024...GME to $1000...The Second Coming before 2025...China and the US declare war on each other in 2021...Trump comes back in 2024..."
	return (
		<div class="h-auto my-32 bg-black justify-center border-1 border-gray-700 rounded-lg space-y-20">
			<div class="max-w-6xl mx-auto flex flex-row justify-between font-mono-custom">
				<div class="inline-flex flex-col max-w-prose justify-center">
					<h1 class="font-bold text-4xl text-pink-300">Seldon Protocol</h1>
					<h2 class="font-medium text-xl mt-5 text-white">A fully decentralized protocol for making long-term predictions and bets.</h2>
				</div>
				<div class="flex-none w-3/12 justify-center self-center">
					<img class="h-auto" src={require("../assets/img.png")}/>
				</div>
			</div>

			{
				// todo: make this a ticker
			}

			<div class="w-screen">
				<Ticker direction="toRight" speed={3}>
			        {({ index }) => (
			            <div>
			                <h1 class="font-mono-custom font-light text-xl text-white whitespace-nowrap">{TICKER_TEXT}</h1>
			            </div>
			        )}
			    </Ticker>
			    <Ticker direction="toRight">
			        {({ index }) => (
			            <div>
			                <h1 class="font-mono-custom font-light text-xl text-white whitespace-nowrap">{TICKER_TEXT}</h1>
			            </div>
			        )}
			    </Ticker>
			    <Ticker direction="toRight" speed={3}>
			        {({ index }) => (
			            <div>
			                <h1 class="font-mono-custom font-light text-xl text-white whitespace-nowrap">{TICKER_TEXT}</h1>
			            </div>
			        )}
			    </Ticker>
			</div>

			<div class="max-w-6xl mx-auto flex flex-row justify-between w-full font-mono-custom align-center">
				<div class="inline-flex flex-col justify-center">

					<h1 class="font-bold text-4xl text-white">How the <span class="text-pink-300">Seldon Protocol</span> works</h1>
					<ol class="list-decimal font-medium text-xl mt-5 text-white space-y-3">
					  <li><span class="text-pink-300">Make a prediction</span>. Think that Bernie will become President? Maybe GME might go back up one day? Put your money where your mouth is!</li>
					</ol>
				</div>
				<div class="flex-none w-3/12 justify-center self-center">

				</div>
			</div>
		</div>
	);
};

export default MainPage;
