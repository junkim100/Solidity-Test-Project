const DappToken = artifacts.require("DappToken")
const DaiToken = artifacts.require("DaiToken")
const TokenFarm = artifacts.require("TokenFarm")

module.exports = async function(deployer, network, accounts) {
    // Deploy Mock Dai Token
    await deployer.deploy(DaiToken)
    const daiToken = await DaiToken.deployed()

    // Deploy Dapp Token
    await deployer.deploy(DappToken)
    const dappToken = await DappToken.deployed()

    // Deploy Token Farm
    await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
    const tokenFarm = await TokenFarm.deployed()

    // Transfer all tokens to TokenFarm
    await dappToken.transfer(tokenFarm.address, await dappToken.totalSupply())

    // Transfer 100 Mock DAI Tokens to Investor
    await daiToken.transfer(accounts[1], "100000000000000000000")
};
