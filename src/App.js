import React, { Component } from 'react'
import OracleTokenContract from '../build/contracts/OracleToken.json';
import getWeb3 from './utils/getWeb3'
import Chart from 'chart.js';
var LineChart = require('react-chartjs').Line;

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

import {Button,Grid,Row} from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      chart:null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3,
        etherValue: null,
        challengeValue: null,
        difficultyValue: null
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
    const oracleToken = contract(OracleTokenContract)
    oracleToken.setProvider(this.state.web3.currentProvider)

    //use this to get current epoch
    var ts = Math.round((new Date()).getTime() / 1000);


    var oracleTokenInstance
    this.state.web3.eth.getAccounts( async(error, accounts) => {
      const instance = await oracleToken.at(
        '0xe5e40e18c2da2af0287fa31d54c7bb20943f9344'
      ).retrieveData(1531008000, {from: accounts[0]})
      .then((result) => {
        let tempNum2 = result - 0;
        return this.setState({etherValue: tempNum2})
      })
    })

    // Get accounts.
    this.state.web3.eth.getAccounts(async(error, accounts) => {
      const instance = await oracleToken.at(
        '0xe5e40e18c2da2af0287fa31d54c7bb20943f9344'
      ).getVariables({from: accounts[0]})
      .then((result) => {
        let challenge = result[0] - 0
        let difficulty = result[1] - 0
        
          return this.setState({challengeValue: challenge, difficultyValue: difficulty})
      });
    })
  }
  componentDidMount () {
    let chartCanvas = this.refs.chart;
  
    let myChart = new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Ether > USD",
            fillColor: "rgba(5,113,259,0.2)",
            strokeColor: "rgba(5,113,259,1)",
            pointColor: "rgba(5,113,259,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(5,113,259,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      },
      options: {
        ///Boolean - Whether grid lines are sho across the chart
        scaleShowGridLines : true,
        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",
        //Number - Width of the grid lines
        scaleGridLineWidth : 1,
        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,
        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,
        //Boolean - Whether the line is curved between points
        bezierCurve : true,
        //Number - Tension of the bezier curve between points
        bezierCurveTension : 0.4,
        //Boolean - Whether to show a dot for each point
        pointDot : true,
        //Number - Radius of each point dot in pixels
        pointDotRadius : 4,
        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth : 1,
        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius : 20,
        //Boolean - Whether to show a stroke for datasets
        datasetStroke : true,
        //Number - Pixel width of dataset stroke
        datasetStrokeWidth : 2,
        //Boolean - Whether to fill the dataset with a colour
        datasetFill : true,
        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>",
        //Boolean - Whether to horizontally center the label and point dot inside the grid
        offsetGridLines : false
      }
    });
  
    this.setState({chart: myChart});
  }
  componentDidUpdate () {
      let chart = this.state.chart;
      let data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Ether > USD",
            fillColor: "rgba(5,113,259,0.2)",
            strokeColor: "rgba(5,113,259,1)",
            pointColor: "rgba(5,113,259,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(5,113,259,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      }
  
      data.datasets.forEach((dataset, i) => chart.data.datasets[i].data = dataset.data);
  
      chart.data.labels = data.labels;
      chart.update();
  }
  getNewValue(){
    const contract = require('truffle-contract')
    const oracleToken = contract(OracleTokenContract)
    oracleToken.setProvider(this.state.web3.currentProvider)
    var ts = Math.round((new Date()).getTime() / 1000);
    this.state.web3.eth.getAccounts( async(error, accounts) => {
      const instance = await oracleToken.at(
        '0xe5e40e18c2da2af0287fa31d54c7bb20943f9344'
      ).retrieveData(1531008000, {from: accounts[0]})
      .then((result) => {
        let tempNum2 = result - 0;
        return this.setState({etherValue: tempNum2})
      })
    })

    // Get accounts.
    this.state.web3.eth.getAccounts(async(error, accounts) => {
      const instance = await oracleToken.at(
        '0xe5e40e18c2da2af0287fa31d54c7bb20943f9344'
      ).getVariables({from: accounts[0]})
      .then((result) => {
        let challenge = result[0] - 0
        let difficulty = result[1] - 0
        
          return this.setState({challengeValue: challenge, difficultyValue: difficulty})
      });
    })

  }
  render() {
    let imgUrl = 'https://new.consensys.net/wp-content/themes/consensys/client/images/masthead-organic-poster.jpg';
    let minerImageUrl = 'https://media.istockphoto.com/vectors/cartoon-dwarf-miner-vector-id839970312';
    console.log(this.state)
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Token Bones</a>
        </nav>
        <div className="container-fluid">
          <div style={{backgroundImage: 'url(' + imgUrl + ')',
                height:800,
                width:'100%',
                display:'flex',
                justifyContent:'center'}}>
            <h1 style={{
              color:'white',
              alignSelf:'center'
              }}>Minable Oracle Contract</h1>
            <h1 style={{
              color:'white',
              alignSelf:'center'
              }}>MOC Token</h1>
          </div>

          <h3>Ether to USD value</h3>
          <h3>Current Value: ${this.state.etherValue}</h3>
          <h3>Challenge: {this.state.challengeValue}</h3>
          <h3>Difficulty: {this.state.difficultyValue}</h3>
          <Button bsStyle="info" onClick={this.getNewValue.bind(this)}>Get current value</Button>
          <canvas ref={'chart'} height={'400'} width={'600'}></canvas>
          <h3>What is it?</h3>
          <h3>How does it work?</h3>
          <h3>Download a miner!</h3>
        </div>
      </div>

    );
  }
}

export default App
