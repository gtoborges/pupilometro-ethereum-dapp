import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";

import type { Exams } from "../typechain-types";

chai.use(solidity);
chai.use(chaiAsPromised);

const { expect } = chai;

describe("Exames", async () => {
  const deployContract = async () => {
    const Exames = await ethers.getContractFactory("Exams");
    const exams = (await Exames.deploy()) as Exams;
    await exams.deployed();
    return exams;
  };

  let examsContract: Exams;
  let addr1: any, addrEmployee: any, addrDoctor: any, addrPatient: any;
  before(async () => {
    examsContract = await deployContract();
    [addr1, addrEmployee, addrDoctor, addrPatient] = await ethers.getSigners();
    console.log({
      addr1: addr1.address,
      employee: addrEmployee.address,
      doctor: addrDoctor.address,
      patient: addrPatient.address,
    });
  });

  it("should have and address", async () => {
    expect(examsContract.address).to.properAddress;
  });

  it("should return an empty array", async () => {
    let examsIds = await examsContract.getOwnExams();
    expect(examsIds).to.deep.equal([]);
  });

  it("should store an exam and get an error on search", async () => {
    const CID = "QmREQAbAhE3zTgp5om27Ug88TqVKXocKq3vDeveWavmqo3";
    const videos: string[] = ["A" + CID, "B" + CID];
    const images: string[] = ["C" + CID, "D" + CID];
    const texts: string[] = ["E" + CID];
    const timestamp = new Date().getTime();

    await examsContract
      .connect(addrEmployee)
      .storeExam(addrPatient.address, videos, images, texts, timestamp);

    await expect(examsContract.searchPatientExam(addrPatient.address)).to.be.revertedWith(
      "Permission not found"
    );
  });

  it("should get exams of patient wallet", async () => {
    let response = await examsContract.connect(addrPatient).getOwnExams();
    expect(response).to.have.length;
  });

  it("should not find address on removing permission", async () => {
    await expect(
      examsContract.connect(addrPatient).removePermission(addrDoctor.address)
    ).to.be.revertedWith("Address not found");
  });

  it("should grant permission to an address", async () => {
    await examsContract.connect(addrPatient).addPermission(addrDoctor.address);

    let response = await examsContract.connect(addrPatient).getPermissions();
    expect(response).to.have.length;
  });

  it("should not duplicate an address already with permission", async () => {
    await expect(
      examsContract.connect(addrPatient).addPermission(addrDoctor.address)
    ).to.be.revertedWith("Permission already granted");
  });

  it("should get patient's exam", async () => {
    let response = await examsContract.connect(addrDoctor).searchPatientExam(addrPatient.address);
    expect(response).to.have.length;
  });

  it("should remove doctors permission", async () => {
    await examsContract.connect(addrPatient).removePermission(addrDoctor.address);
    let [addressErased] = await examsContract.connect(addrPatient).getPermissions();
    expect(addressErased).to.hexEqual("0x0000");
  });

  it("should not get patient's exam", async () => {
    await expect(
      examsContract.connect(addrDoctor).searchPatientExam(addrPatient.address)
    ).to.be.revertedWith("Permission not found");
  });
});
