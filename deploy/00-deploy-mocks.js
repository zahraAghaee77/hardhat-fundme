const { network } = require("hardhat")
const {
    developmentChain,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // check if we need mock
    if (developmentChain.includes(network.name)) {
        // check if we need mock
        console.log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER], // its constructor gets 2 args: 1-decimal, 2-initial answer
        })
        // check if we need mock
        console.log("Mocks deployed!")
        // check if we need mock
        console.log("---------------------------------------------")
    }
}
// to specify which one runs
// yarn hardhat deploy --tags mocks -> this file run
module.exports.tags = ["all", "mocks"]
