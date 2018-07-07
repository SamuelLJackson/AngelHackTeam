import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import miner from './images/miner.jpg';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(100, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  render() {
    let imgUrl = 'https://new.consensys.net/wp-content/themes/consensys/client/images/masthead-organic-poster.jpg';
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Token Bones</a>
        </nav>
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
            <img src={'https://media.istockphoto.com/vectors/cartoon-dwarf-miner-vector-id839970312'} 
            style={{width:50,height:50}}/>
            <div style={{backgroundImage: 'url(' + imgUrl + ')',
                  height:800,
                  display:'flex',
                  justifyContent:'center'}}>
              <h1 style={{
                color:'white',
                alignSelf:'center'
                }}>A minable proof of work proof of work token for oracles</h1>
            </div>
              <h3>What is it?</h3>
              <h3>Ether to USD value</h3>
              <h3>How does it work?</h3>
              <h3>Download a miner!</h3>
              <p>The stored value is: {this.state.storageValue}</p>
            </div>
          </div>
        </main>
      </div>

    );
  }
}

export default App
