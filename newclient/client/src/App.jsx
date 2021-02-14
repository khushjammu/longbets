import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams,
  useLocation,
  NavLink,
} from "react-router-dom";
import LongBet from "./contracts/LongBet.json";
import QuestoBets from "./contracts/QuestoBets.json";
import getWeb3 from "./getWeb3";
import ContractCreator from "./components/contractCreator";
import "./css/main.css";

const App = () => {
  const [storageValue, setStorageValue] = React.useState(0);
  const [web3, setWeb3] = React.useState(null);
  const [accounts, setAccounts] = React.useState(null);
  const [questoBets, setQuestoBets] = React.useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Get network provider and web3 instance.
        const web3get = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3get.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3get.eth.net.getId();
        const deployedNetwork = QuestoBets.networks[networkId];
        const instance = new web3get.eth.Contract(
          QuestoBets.abi,
          deployedNetwork && deployedNetwork.address
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(web3get);
        setAccounts(accounts);
        setQuestoBets(instance);
        // this.setState({ web3, accounts, contract: instance }, this.runExample);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    })();
  }, []);

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <Router>
      <div class="bg-black font-mono">
        <nav>
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <img
                    class="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
                <div class="hidden md:block">
                  <div class="ml-10 flex items-baseline space-x-4">
                    <div class="text-gray-300 hover:text-blue-700 px-3 py-2 text-sm font-medium">
                      <NavLink to="/predict" activeClassName="text-blue-700">
                        Predict
                      </NavLink>
                    </div>
                    <div class="text-gray-300 hover:text-blue-700 px-3 py-2 text-sm font-medium">
                      <NavLink
                        to="/viewPrediction"
                        activeClassName="text-blue-700"
                      >
                        View Prediction
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div class="flex flex-wrap justify-center bg-black h-screen">
                <ContractCreator web3={web3} contract={questoBets} />
              </div>
            </div>
          </Route>
          <Route path="/predict">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div class="flex flex-wrap justify-center bg-black h-screen">
                <ContractCreator web3={web3} contract={questoBets} />
              </div>
            </div>
          </Route>
          <Route path="/viewPrediction">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div class="flex flex-wrap justify-center bg-black h-screen">
                <ContractCreator web3={web3} contract={questoBets} />
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
