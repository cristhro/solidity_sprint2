# IEBS

Sprint 2 - implementando funciones del contrato ERC 20
- Grupo: 15
- Cristhian Rodriguez Gomez
- Jesus Rosas Rosales

## Intruducción
En esta practica, usaremos un nuevo contrato SchoolToken (que implementa el Token ERC-20) para la gestion de tokens que se usara en el contrato SchoolCertificate, 
ampliaremos la funcionalidad del contrato SchoolCertificate del sprint1 añadiendole la posibilidad de pagar con tokens (SchoolToken).

### SchoolToken
- La escuela podra otorgar estos tokens a los estudiantes (minando)
- El estudiante podra consultar su balance
### SchoolCertificate
- El estudiante  podra Solicitar certificado (dando permiso para realizar tranferencias de los fondos al director una vez se apruebe el certificado)
- El director firmara el certificado, acto seguido se hace la transferencia de la cuenta del estudiante a la cuenta del director

## Configuración del entorno
#### .env:
```sh
SIGNER_DIRECTOR_PRIVATE_KEY = TODO: Añadir aqui la clave privada de la cuenta
SIGNER_STUDENT_PRIVATE_KEY = TODO: Añadir aqui la clave privada de la cuenta
SIGNER_SCHOOL_PRIVATE_KEY = TODO: Añadir aqui la clave privada de la cuenta

SCHOOL_CERTIFICATE_CONTRACT_ADDRESS = 0x50cB8A98c6a468adCF4A7e6CCe28e8DebA34D3F3 ('TOBE CONFIGURED AFTER run script school-certificate:deploy')
STUDENT_ADDRESS = 0x9128EC9e3B228771F291b1309a1Ca42098F94dA0
DIRECTOR_ADDRESS = 0x925687E5C08B9653E57672386fe74c5902016042

ETH_SEPOLIA_TESTNET_RPC = https://ethereum-sepolia.blockpi.network/v1/rpc/public
ETH_SCAN_API_KEY = ''
ETH_SEPOLIA_SCAN_WEB = https://sepolia.etherscan.io/


#### packages.json:
Pre configuración antes ejecutar los test,  el order para ejecutar es importante (Ya que SchoolCertificate depende de SchoolGrades ): 
1. Primero hacer deploy de school-token:deploy 
Resultado: dirección del contrato School token
```sh
  npm run school-token:deploy
  ->  0x5Ae5CdF4b34a063351dDFe5A96ce05FaA652CB97
```

2. Verificar el contrato School Token
```sh
  npm run school-token:verify  0x5Ae5CdF4b34a063351dDFe5A96ce05FaA652CB97
  -> Successfully verified contract SchoolToken on Etherscan.
  https://sepolia.etherscan.io/address/0x5Ae5CdF4b34a063351dDFe5A96ce05FaA652CB97#code
```

3. Configurar la variable de entorno en .env
```sh
  SCHOOL_TOKEN_CONTRACT_ADDRESS=0x5Ae5CdF4b34a063351dDFe5A96ce05FaA652CB97
```
4. Hacer deploy de school-certificate:deploy (require la variable de entorno DIRECTOR_ADDRESS y SCHOOL_TOKEN_CONTRACT_ADDRESS  ya que lo usa en el constructor del contrato)
```sh
   npm run school-certificate:deploy
  -> 0xf9d0cac27C306Dd9207A3d15eA68b2F838f0C6ff
```
5. Verificar el contrato School Certificate
```sh
   npm run school-certificate:verify 0xf9d0cac27C306Dd9207A3d15eA68b2F838f0C6ff "0x925687E5C08B9653E57672386fe74c5902016042" "0x5Ae5CdF4b34a063351dDFe5A96ce05FaA652CB97"
```
- Resultado: 
    - https://sepolia.etherscan.io/address/0xf9d0cac27C306Dd9207A3d15eA68b2F838f0C6ff#code
    
7. Configurar la variable de entorno en .env
```sh
  SCHOOL_CERTIFICATE_CONTRACT_ADDRESS=0xf9d0cac27C306Dd9207A3d15eA68b2F838f0C6ff
```

 
## Descripción de los casos de uso y los tests aplicados


  ### Agregar SchoolTokens al estudiante (Para poder pagar el certificado): 

  La escuela le otorga 100 tokens (SchoolTokens) al estudiante

  - Requisitos: Configurar la variable de entorno SCHOOL_TOKEN_CONTRACT_ADDRESS, STUDENT_ADDRESS
  ```sh
      npm run school-token:test1
      > hardhat run scripts/schoolToken/test1_school_add_tokens_to_student.ts  --network ethereum_sepolia_testnet_as_school
   ```
  - Resultado: 
    - https://sepolia.etherscan.io/tx/0x4e12563e6861f64ed295404a518999b90556881d4cf01b23b7cc918508ce6524


  ### Balance del estudiante: 

  Se muestra el balance actual del estudiante.
  Con la cuenta de estudiante invocamos al contrato (SchoolToken) para obtener el balance

  - Requisitos: Configurar la variable de entorno SCHOOL_TOKEN_CONTRACT_ADDRESS
  ```sh
      npm run school-token:test2
      > hardhat run scripts/schoolToken/test2_student_my_balance.ts  --network ethereum_sepolia_testnet_as_student
   ```
  - Resultado: 
    -  tx: BigNumber { value: "100" }


  ### Balance del estudiante: 

  Se muestra el balance actual del director.
  Con la cuenta de director invocamos al contrato (SchoolToken) para obtener el balance

  - Requisitos: Configurar la variable de entorno SCHOOL_TOKEN_CONTRACT_ADDRESS
  ```sh
      npm run school-token:test3
      hardhat run scripts/schoolToken/test3_director_my_balance.ts  --network ethereum_sepolia_testnet_as_director
   ```
  - Resultado: 
    -  tx: BigNumber { value: "0" }

  
 ### Solicitar certificado: 
  El estudiante solicita un certificado al contrato SchoolCertificate. [school-certificate:test1]
  
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
          allowed: false,
          granted: false
        ]
    ```
  - Resultado: https://sepolia.etherscan.io/tx/0xeec15338376f02c703bf891035f54cd73b607942d5bf64e365e4ede7c992dcd4

  
 ### Autorizar certificado: 
 El estudiante autoriza al director para que se realice el cargo de 100 Tokens (SchoolTokens) para obtener su certificado una vez aprobado [school-certificate:test2].
 
  
   - Requisitos: Tener configurado la variable de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS en .env
   
     ```sh
        npm run school-certificate:test2
        > hardhat run scripts/schoolCertificate/test2_student_allow_certificate.ts --network ethereum_sepolia_testnet_as_student
        > certificate : [
            'Juan',
            'Tecnología Blockchain',
            BigNumber { value: "2023" },
            true,
            false,
            studentName: 'Juan',
            degree: 'Tecnología Blockchain',
            year: BigNumber { value: "2023" },
            allowed: true, <-- ESTO CAMBIA 
            granted: false
          ]
      ```
- Resultado: https://sepolia.etherscan.io/tx/0x77be5c9b57e7e91ebe6b744a2bddbec941d8dbdb8860bcc6d5aee909cbecba37



### Ver solicitud: 
  Como estudiante puedo consultar si mi solicitud ha sido aprobada (granted). [school-certificate:test3].
  - Requisitos: Tener configurado la variable de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS en .env
     ```sh
        npm run school-certificate:test3
        > hardhat run scripts/schoolCertificate/test3_student_view_certificate.ts --network ethereum_sepolia_testnet_as_student
        > certificate : [
            'Juan',
            'Tecnología Blockchain',
            BigNumber { value: "2023" },
            true,
            false,
            studentName: 'Juan',
            degree: 'Tecnología Blockchain',
            year: BigNumber { value: "2023" },
            allowed: true,
            granted: false
          ]
    ```
  ### Firmar certificado: 
  #### El director firmara el certificado, hará la transferencia de la cuenta del estudiante a la cuenta del director
    
  - Requisitos: Tener configurado las variables de entorno SCHOOL_CERTIFICATE_CONTRACT_ADDRESS y STUDENT_ADDRESS en .env
    
  ```sh
      npm run school-certificate:test4
      > hardhat run scripts/schoolCertificate/test4_director_grant_certificate.ts --network ethereum_sepolia_testnet_as_director
      certificate : [
        'Juan',
        'Tecnología Blockchain',
        BigNumber { value: "2023" },
        true,
        false,
        studentName: 'Juan',
        degree: 'Tecnología Blockchain',
        year: BigNumber { value: "2023" },
        allowed: true,
        granted: true <--- ESTO CAMBIA
      ]
    ]
  ```
   - Resultado: https://sepolia.etherscan.io/tx/0x3d1d9251fae5078b58689586bc387d324382aa1eefdf8e35e35e23e8d94cd57a




   




