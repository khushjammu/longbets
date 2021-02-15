import React from "react";
import Ticker from "react-ticker";
import { usePageVisibility } from 'react-page-visibility';

const MainPage = ({ web3, contract }) => {
	// todo: (https://www.npmjs.com/package/react-ticker#render-only-if-browser-tab-is-visible)
	const pageIsVisible = usePageVisibility();

	const stonk = (top, bottom, number) => {
		return (
			<div class="flex flex-col items-center max-w-prose w-3/12 space-y-3">
				<h1 class="font-mono-custom font-regular text-2xl text-pink-300">{top}</h1>
				<h1 class="font-mono-custom font-light text-2xl text-white">({number})</h1>
				<h1 class="font-mono-custom font-light text-lg text-white">{bottom}</h1>
			</div>
			)
	}

	const TICKER_TEXT = "GME to $1000...The Second Coming before 2025...China and the US declare war on each other in 2021...Trump comes back in 2024...COVID-19 kills >1m people worldwide..."
	return (
		<div class="h-auto my-32 pb-32 bg-black justify-center border-1 border-gray-700 rounded-lg space-y-36">
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
				pageIsVisible && (
					<div class="w-screen my-80">
						<Ticker direction="toRight" speed={4}>
					        {({ index }) => (
					            <div>
					                <h1 class="font-mono-custom font-light text-xl text-white whitespace-nowrap uppercase">{TICKER_TEXT}</h1>
					            </div>
					        )}
					    </Ticker>
					    <Ticker direction="toRight" speed={6}>
					        {({ index }) => (
					            <div>
					                <h1 class="font-mono-custom font-light text-xl text-black bg-pink-300 whitespace-nowrap uppercase">{TICKER_TEXT}</h1>
					            </div>
					        )}
					    </Ticker>
					    <Ticker direction="toRight" speed={3}>
					        {({ index }) => (
					            <div>
					                <h1 class="font-mono-custom font-light text-xl text-white whitespace-nowrap uppercase">{TICKER_TEXT}</h1>
					            </div>
					        )}
					    </Ticker>
					</div>
					)
			}

			<div class="flex flex-col max-w-6xl mx-auto">
				<h1 class="font-bold text-4xl text-white font-mono-custom">How the <span class="text-pink-300">Seldon Protocol</span> works</h1>
				<div class=""/>

				<div class="flex flex-row justify-between self-center text-center my-10">
					{stonk("Predict", "Stake ETH on a prediction about anything from CO2 emissions, to the presidential elections.", 1)}
					{stonk("Accept", "The challenger accepts by staking an equal amount of ETH. When the arbiter accepts too, it’s game on.", 2)}
					{stonk("Vote", "When the time comes, all three vote on the outcome. The pledged stake goes to the winner!", 3)}
				</div>
			</div>

			{
				// this is a visual separator, not sure if we should use it or not
				// <div class="border-t-4 border-white w-auto max-w-6xl mx-auto rounded-lg"/>
			}

			<div class="flex flex-col max-w-6xl mx-auto">
				

				<h1 class="font-bold text-4xl text-white font-mono-custom">Frequently Asked Questions</h1>

				<div class="my-10 space-y-10">
					<div class="space-y-3">
					<h1 class="font-regular text-2xl text-pink-300 font-mono-custom">Is it possible to compromise the protocol and find out information about depositors?</h1>
					<h1 class="font-light text-lg text-white font-mono-custom">No, Tornado Cash is a decentralized protocol based on zero knowledge proofs. Its smart contracts are immutable, have no admins, and the proofs are based on strong cryptography. Only the user possessing the Note is able to link deposit and withdrawal.</h1>
					</div>

					<div class="space-y-3">
					<h1 class="font-regular text-2xl text-pink-300 font-mono-custom">Do you collect data?</h1>
					<h1 class="font-light text-lg text-white font-mono-custom">The Tornado Cash project does not collect any user data. The UI is hosted in a decentralized way on IPFS and can be accessed using following links: app.tornado.cash, tornadocash.eth.link. Users can also run it locally or use the CLI tool.</h1>
					</div>

					<div class="space-y-3">
					<h1 class="font-regular text-2xl text-pink-300 font-mono-custom">Is it possible to compromise the protocol and find out information about depositors?</h1>
					<h1 class="font-light text-lg text-white font-mono-custom">No, Tornado Cash is a decentralized protocol based on zero knowledge proofs. Its smart contracts are immutable, have no admins, and the proofs are based on strong cryptography. Only the user possessing the Note is able to link deposit and withdrawal.</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
