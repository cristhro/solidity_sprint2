import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();
const { SCHOOL_TOKEN_CONTRACT_ADDRESS, TEACHER_ADDRESS, STUDENT_ADDRESS, SCHOOL_ADDRESS } = process.env;


async function main() {
  const schoolTokenContract = await ethers.getContractAt('SchoolToken', SCHOOL_TOKEN_CONTRACT_ADDRESS);

  // // Estudiante solicita un título
  const tx = await schoolTokenContract.mintCertificate(STUDENT_ADDRESS, 100);
  await tx.wait();
  
  console.log('🚀 ~ main ~ tx:', tx)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
