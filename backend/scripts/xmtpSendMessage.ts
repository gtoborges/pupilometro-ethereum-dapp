import { Client } from "@xmtp/xmtp-js";
import { ethers } from "hardhat";

const SERVER_ADDRESS = "http://127.0.0.1:8545";
const contaTeste01 = "0xfD54784d18961e21B0A607b5752f0d0cC5125D50";
const contaTeste02 = "0x13619c9d533b9E77DC9A3bF5D40d2E818e9A93b4";
const contaTeste03 = "0x729e1f907114c7f5054e4C8f79D7Fa3c3F5BFA45";

const main = async () => {
  let provider = new ethers.providers.JsonRpcProvider(SERVER_ADDRESS);
  let signer = await provider.getSigner("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199");

  const xmtp = await Client.create(signer, { env: "dev" });
  // console.log(xmtp.conversations);

  let canMessage = await xmtp.canMessage(contaTeste02);
  console.log(canMessage);
  // return;

  let conversation = await xmtp.conversations.newConversation(contaTeste02, {
    conversationId: "exam",
    metadata: { [""]: "" },
  });
  await conversation.send("Exam's passphrase teste");
  console.log("msg sent");
};

main();
