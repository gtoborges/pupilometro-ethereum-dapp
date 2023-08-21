import Exams from '../assets/Exams.json'
import { ethers } from "ethers";

const getEth = () => {
  const eth = window.ethereum
  if(!eth) {
    throw new Error('No metamask installed')
  }

  return eth
}

const examsContract = () => {
  const contract = new ethers.Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS, 
      Exams.abi, 
      new ethers.providers.Web3Provider(getEth()).getSigner()
    )

  return contract
}

export { getEth, examsContract }
