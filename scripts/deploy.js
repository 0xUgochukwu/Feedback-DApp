// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // We get the contract to deploy


  // Print account address you're deploying with and teh balance 
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();
  console.log(
    `
    Deploying contracts with the account: ${deployer.address}
    Account balance: ${accountBalance.toString()}
    `
  );

  const Feedback = await hre.ethers.getContractFactory("Feedback");
  const feedback = await Feedback.deploy();

  await feedback.deployed();


  console.log(
    `Contract deployed successfully to ${feedback.address}`
  );

  // console log the contract abi 
  console.log(
    `Contract ABI: ${JSON.stringify(feedback.interface.format('json'))}`
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
