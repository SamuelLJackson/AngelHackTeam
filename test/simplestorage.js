/*this contract tests the typical workflow from the dApp (user contract, cash out)*/
var oracleToken = artifacts.require("OracleToken");

contract('Base Tests', function(accounts) {
  let oracletoken;
console.log("base");
  beforeEach('Setup contract for each test', async function () {
     oracletoken = await oracleToken.new();
      console.log("0");
  });

  it("proofOfWork", async function(){
    
    balance2 = await (oracletoken.balanceOf(accounts[2]));
/*    balance3 = await (oracletoken.balanceOf(accounts[3]));
    balance4 = await (oracletoken.balanceOf(accounts[4]));
    balance5 = await (oracletoken.balanceOf(accounts[5]));
    balance6 = await (oracletoken.balanceOf(accounts[6]));*/
    console.log("1");
    await oracletoken.proofOfWork(1531005060, 100, {from: accounts[2]});
     console.log("2");
/*    await oracletoken.setDifficulty(1,{from: accounts[1]});
     console.log("3");
    await oracletoken.proofOfWork(1531005120, 101, {from: accounts[3]});
     console.log("4");
    await oracletoken.setDifficulty(1,{from: accounts[1]});
     console.log("5");
    await oracletoken.proofOfWork(1531005180, 102, {from: accounts[4]});
     console.log("6");
    await oracletoken.setDifficulty(1,{from: accounts[1]});
     console.log("7");
    await oracletoken.proofOfWork(1531005240, 103, {from: accounts[5]});
     console.log("8");
    await oracletoken.setDifficulty(1,{from: accounts[1]});
     console.log("9");*/
/*    await oracletoken.proofOfWork(1531005300, 105, {from: accounts[6]});
    balance2x = await (oracletoken.balanceOf(accounts[2]));
    balance3x = await (oracletoken.balanceOf(accounts[3]));
    balance4x = await (oracletoken.balanceOf(accounts[4]));
    balance5x = await (oracletoken.balanceOf(accounts[5]));
    balance6x = await (oracletoken.balanceOf(accounts[6]));
    assert.equal(balance2-balance2x, 1, "balance should be one for acct2");
   assert.equal(balance6-balance6x, 1, "balance should be one for acct6");
    assert.equal(balance3-balance3x, 5, "balance should be 5 for acct3");
    assert.equal(balance5-balance5x, 5, "balance should be 5 for acct5");
    assert.equal(balance3-balance3x, 10, "balance should be one for acct3");
  */});



  it("Token Transfer", async function(){

  });
  it("Token Approval and Transfer", async function(){

  });
  it("Sample Mine Token", async function(){

  });
  it("Mine tokens and get 20 values", async function(){
    
  });

});
