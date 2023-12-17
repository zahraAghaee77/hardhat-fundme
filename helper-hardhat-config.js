const networkConfig = {
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
    5: {
        name: "goerli",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },
    // 31337 ?
}

// which chain need mocks
const developmentChain = ["hardhat", "laocalhost"]
const DECIMALS = 8
const INITIAL_ANSWER = 200000000000
// we use this to export this network config so other scripts can work with it.
// in other script we should import it by require.

module.exports = {
    networkConfig,
    developmentChain,
    DECIMALS,
    INITIAL_ANSWER,
}
