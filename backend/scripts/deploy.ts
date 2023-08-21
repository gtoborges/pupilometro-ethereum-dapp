import "@nomicfoundation/hardhat-toolbox";
import { ethers } from "hardhat";
import { Exams } from "../typechain-types";

async function deploy(name: string) {
  const Contract = await ethers.getContractFactory(name);
  const contract = await Contract.deploy();
  await contract.deployed();

  return contract;
}

async function main() {
  let contract = (await deploy("Exams")) as Exams;
  console.log(contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
