import React, { useState, useEffect } from 'react';
import SimpleStorageContract from './contracts/SimpleStorage.json';
import getWeb3 from './getWeb3';

import './App.css';

const App = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [storageValue, setstorageValue] = useState(0);

  useEffect(() => {
    initial();
  }, []);

  const initial = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(SimpleStorageContract.abi, deployedNetwork && deployedNetwork.address);
      setContract(instance);
      await instance.methods.set(5).send({ from: accounts[0] });
      const response = await instance.methods.get().call();
      setstorageValue(response);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Good to Go!</h1>
      <p>Your Truffle Box is installed and ready.</p>
      <h2>Smart Contract Example</h2>
      <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
      <p>
        Try changing the value stored on <strong>line 44</strong> of App.js.
      </p>
      <div>The stored value is: {storageValue}</div>
    </div>
  );
};

export default App;
