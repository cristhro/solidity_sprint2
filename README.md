# IEBS

Sprint 2 - implementando funciones del contrato ERC 20
- Grupo: 15
- Cristhian Rodriguez Gomez
- Jesus Rosas Rosales


## Configuración del entorno
#### .env:
```sh
SCHOOL_CERTIFICATE_CONTRACT_ADDRESS = 0x50cB8A98c6a468adCF4A7e6CCe28e8DebA34D3F3 ('TOBE CONFIGURED AFTER run script school-certificate:deploy')
STUDENT_ADDRESS = 0x664f16E7dC4F28fF1748aD70E3cf228F7D6E66FB
DIRECTOR_ADDRESS = 0x664f16E7dC4F28fF1748aD70E3cf228F7D6E66FB

ETH_SEPOLIA_TESTNET_RPC = https://ethereum-sepolia.blockpi.network/v1/rpc/public
ETH_SCAN_API_KEY = ''
ETH_SEPOLIA_SCAN_WEB = https://sepolia.etherscan.io/


#### packages.json:
Pre configuración antes ejecutar los test,  el order para ejecutar es importante (Ya que SchoolCertificate depende de SchoolGrades ): 
1. Primero hacer deploy de school-token:deploy 
Resultado: dirección del contrato School token
```sh
  npm run school-token:deploy
  ->  0xaCeEb2ff9e8D571707a2Ec7cD8dE21Fb111BE229
```

2. Verificar el contrato School Token
```sh
  npm run school-token:verify  0xaCeEb2ff9e8D571707a2Ec7cD8dE21Fb111BE229
  -> Successfully verified contract SchoolToken on Etherscan.
  https://sepolia.etherscan.io/address/0xaCeEb2ff9e8D571707a2Ec7cD8dE21Fb111BE229#code
```

3. Configurar la variable de entorno en .env
```sh
  SCHOOL_TOKEN_CONTRACT_ADDRESS=0xaCeEb2ff9e8D571707a2Ec7cD8dE21Fb111BE229
```
4. Hacer deploy de school-certificate:deploy (require la variable de entorno DIRECTOR_ADDRESS y SCHOOL_TOKEN_CONTRACT_ADDRESS  ya que lo usa en el constructor del contrato)
```sh
   npm run school-certificate:deploy
  -> 0x35E9b1b0BE62745722113337815256CFA26719ec
```
5. Verificar el contrato School Certificate
```sh
   npm run school-certificate:verify 0x35E9b1b0BE62745722113337815256CFA26719ec "0xF7491DcDba69fD5419f7d6fd7dc63B5a65c9DD87" "0xaCeEb2ff9e8D571707a2Ec7cD8dE21Fb111BE229"
  -> Successfully submitted source code for contract
contracts/SchoolCertificate.sol:SchoolCertificate at 0x35E9b1b0BE62745722113337815256CFA26719ec
```
7. Configurar la variable de entorno en .env
```sh
  SCHOOL_CERTIFICATE_CONTRACT_ADDRESS=0x35E9b1b0BE62745722113337815256CFA26719ec
```



  ### Solicitar certificado: 
  El estudiante puede solicitar un certificado al contrato SchoolCertificate. [school-certificate:test1]
  
  - Requisitos: Tener configurado la variable de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS en .env
    ```sh
      npm run school-certificate:test1 
      > hardhat run scripts/schoolCertificate/test1_student_request_certificate.ts --network ethereum_sepolia_testnet_as_student
      > certificate : [
          'Juan',
          'Tecnología Blockchain',
          BigNumber { value: "2023" },
          false,
          false,
          studentName: 'Juan',
          degree: 'Tecnología Blockchain',
          year: BigNumber { value: "2023" },
          paid: false,
          granted: false
        ]
    ```
  - Resultado: https://sepolia.etherscan.io/tx/0xd6831ec8ea07c2297b04d69ee2468e650bfb38d101e66ee369cfbf95c969b94a




