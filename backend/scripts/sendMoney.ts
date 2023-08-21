import { ethers } from "hardhat";

const SERVER_ADDRESS = "http://127.0.0.1:8545";

const sendMoney = async () => {
  let provider = new ethers.providers.JsonRpcProvider(SERVER_ADDRESS);
  let signer = await provider.getSigner("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199");
  let data = {
    // address teste1
    to: "0xfD54784d18961e21B0A607b5752f0d0cC5125D50",
    value: ethers.utils.parseEther("1"),
  };

  // let data = {
  //   // adress teste2
  //   to: "0x13619c9d533b9E77DC9A3bF5D40d2E818e9A93b4",
  //   value: ethers.utils.parseEther("1"),
  // };

  // let data = {
  //   // address teste03
  //   to: "0x729e1f907114c7f5054e4C8f79D7Fa3c3F5BFA45",
  //   value: ethers.utils.parseEther("1"),
  // };

  let response = await signer.sendTransaction(data);
  console.log(response);
  let recibo = await response.wait();
  console.log(recibo);
  let response2 = await signer.getBalance();
  console.log(response2);

  return;
};

sendMoney();
