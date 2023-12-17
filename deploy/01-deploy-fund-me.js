// main function
// async function deployFunc() {
//     console.log("hi")
// }
/*
    easy way:
    const { networkConfig } = require("../helper-hardhat-config")
                             ===
    hard way:                         
    const helperConfig = require("../helper-hardhat-config")
    const networkConfig = helperConfig.networkConfig                         
 */

const { network } = require("hardhat")
const { networkConfig, developmentChain } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
// specify main function to run
// module.exports.default = deployFunc

// nameless function
// module.exports.default = async (hre) => {
//     const {getNameAccounts, deployments} = hre

// }

module.exports = async ({ getNamedAccounts, deployments }) => {
    // we use deployments from hre to access to 2 function: deploy, log
    const { deploy, log } = deployments
    // getNamedAccounts function is a way for us to get named accounts
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // if chainId is X use address Y, ....
    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceFeedAddress
    if (developmentChain.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address // or address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    // well what happens when we want to change chains?
    // when going for localhost or hardhat network we want to use a mock
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer, //who is deploying
        args: args, // pass any arguments to the constructor, in this case we should send price feed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    }) // name of .sol file, the list of overrides that we want to add
    // verify -> we do not need in localhost
    if (
        !developmentChain.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        // verify
        await verify(fundMe.address, args)
    }
    log("------------------------------")
}

module.exports.tags = ["all", "fundme"]
