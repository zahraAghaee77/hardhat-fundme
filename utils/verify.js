const { run } = require("hardhat")

async function verify(contractAddress, args) {
    // if contract has instructor args has passed.
    console.log("Verifying...")
    try {
        await run("verify:verify", {
            // first parameter: task, second parameter: list of actual parameters
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

module.exports = { verify }
