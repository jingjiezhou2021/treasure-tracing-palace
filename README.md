<!-- Improved compatibility of back to top link: See: https://github.com/jingjiezhou2021/treasure-tracing-palace/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the treasure-tracing-palace. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]
[![Website Status](https://img.shields.io/website?url=https://treasure-tracing-palace-front-end.vercel.app/en/&style=for-the-badge)](https://treasure-tracing-palace-front-end.vercel.app)


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/jingjiezhou2021/treasure-tracing-palace">
    <img src="packages/front-end/public/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Treasure Tracing Palace</h3>

  <p align="center">
    A decentralized platform on Ethereum for product sales and traceability
    <br />
    <a href="https://treasure-tracing-palace-front-end.vercel.app/">📺<strong>View Demo »</strong></a>
    <br />
    English
    &middot;
    <a href="./README-zh.md">中文</a>
    <br />
    <a href="https://github.com/jingjiezhou2021/treasure-tracing-palace/issues/new?labels=bug&template=bug-report---.md">Report An Issure</a>
    &middot;
    <a href="https://github.com/jingjiezhou2021/treasure-tracing-palace/issues/new?labels=enhancement&template=feature-request---.md">Submit Feature</a>
  </p>
</div>


<h2>Table of Contents</h2>

- [About the Project📖](#about-the-project)
  - [Feature Modules](#feature-modules)
    - [Manufacturer 🏭](#manufacturer-)
      - [Create Product Type](#create-product-type)
      - [Register Product Instance](#register-product-instance)
      - [Inventory Management](#inventory-management)
      - [Order Management](#order-management)
      - [Product Traceability](#product-traceability)
    - [Distributor 🏪](#distributor-)
      - [Product Procurement](#product-procurement)
      - [Inventory Management](#inventory-management-1)
      - [Retail Products](#retail-products)
      - [Order Management](#order-management-1)
      - [Product Traceability](#product-traceability-1)
    - [Consumer 🛍️](#consumer-️)
      - [Browse Products](#browse-products)
      - [Purchase Products](#purchase-products)
      - [Order Management](#order-management-2)
      - [Product Traceability](#product-traceability-2)
- [Tech Stack ⚙️](#tech-stack-️)
  - [Tools 🔧](#tools-)
  - [Architecture 🏢](#architecture-)
    - [🧩 1. Frontend Layer (User Interface Layer)](#-1-frontend-layer-user-interface-layer)
    - [🧠 2. Middleware Layer (Service Layer / API Layer)](#-2-middleware-layer-service-layer--api-layer)
    - [🗃 3. Database Layer (Data Persistence Layer)](#-3-database-layer-data-persistence-layer)
    - [⛓ 4. Smart Contract Layer (Blockchain Layer)](#-4-smart-contract-layer-blockchain-layer)
    - [☁️ 5. Cloud Infrastructure Layer (DevOps \& Deployment)](#️-5-cloud-infrastructure-layer-devops--deployment)
    - [✅ Summary](#-summary)
- [Quick Start🚀](#quick-start)
  - [Clone Repository](#clone-repository)
  - [📦 Configure Environment Variables](#-configure-environment-variables)
    - [🔐 `smart-contracts/.env`](#-smart-contractsenv)
    - [🌐 `front-end/.env`](#-front-endenv)
    - [🧪 `front-end/.env.development`](#-front-endenvdevelopment)
    - [🚀 `front-end/.env.production`](#-front-endenvproduction)
  - [Development](#development)
    - [Run IPFS Desktop](#run-ipfs-desktop)
    - [Run Local Database](#run-local-database)
    - [Prisma Migration](#prisma-migration)
    - [Run Local Blockchain](#run-local-blockchain)
    - [Deploy Smart Contracts To Local Blockchain](#deploy-smart-contracts-to-local-blockchain)
    - [Run Next.js Development Server](#run-nextjs-development-server)
  - [Production](#production)
    - [Set Up Pinata](#set-up-pinata)
    - [Deploy Smart Contracts To Sepolia](#deploy-smart-contracts-to-sepolia)
    - [Prisma Migration](#prisma-migration-1)
    - [Next.js Build](#nextjs-build)
    - [Start Next.js Built Server](#start-nextjs-built-server)
    - [Publish Vercel](#publish-vercel)
- [Contribute 🧑🏿‍💻](#contribute-)
  - [Contributors❤️](#contributors️)



<!-- ABOUT THE PROJECT -->
# About the Project📖

![项目截图](/images/readme/entry.png)

Treasure Tracing Palace is a decentralized supply chain platform built to help track and validate high-value products using blockchain. It drastically reduces counterfeit risk—for example, in pharmaceuticals and branded goods—by making every transaction transparent and verifiable.

Manufacturers register products in the system first. Products can then be sold to distributors at preset prices. Consumers can purchase from distributors, with all transactions recorded on-chain. Buyers can trace the full lifecycle of the product, from manufacture to delivery.

Our platform uses USDT as the payment currency.

## Feature Modules

![Feature Modules](/images/readme/function-modules-graph.png)

### Manufacturer 🏭

#### Create Product Type

![Create Product Type](/images/readme/create_product_type.png)

#### Register Product Instance

![register product](/images/readme/record_product.png)

#### Inventory Management
![inventory management](/images/readme/warehouse_management.png)

#### Order Management
![order management](/images/readme/order_management.png)

#### Product Traceability  
![traceability step 1](/images/readme/tracing_management.png)  
![traceability step 2](/images/readme/tracing_management1.png)  
![traceability step 3](/images/readme/tracing_management2.png)



### Distributor 🏪

#### Product Procurement  
![procurement](/images/readme/purchasing.png)

#### Inventory Management  
![distributor inventory](/images/readme/warehouse_management_distributor.png)

#### Retail Products  
![retail product 1](/images/readme/retailing1.png)  
![retail product 2](/images/readme/retailing2.png)  
![retail product 3](/images/readme/retailing3.png)

#### Order Management  
![distributor orders](/images/readme/order_management_distributor.png)

#### Product Traceability  
![distributor traceability 1](/images/readme/tracing_management_distributor1.png)  
![distributor traceability 2](/images/readme/tracing_management_distributor2.png)

### Consumer 🛍️

#### Browse Products  
![browse products](/images/readme/browse_commodoties.png)

#### Purchase Products  
![purchase products](/images/readme/buy_commodoty.png)

#### Order Management  
![consumer orders](/images/readme/order_management_customer.png)

#### Product Traceability  
![consumer traceability](/images/readme/tracing_management_customer.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



# Tech Stack ⚙️

## Tools 🔧

* [![Next.js](https://img.shields.io/badge/Next.js-15.3.1--canary.15-black?logo=next.js&logoColor=white)](#)
* [![React](https://img.shields.io/badge/React-latest-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
* [![NodeJS](https://img.shields.io/badge/Node.js-20.19.2-6DA55F?logo=node.js&logoColor=green)](#)
* [![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-%2338B2AC.svg?logo=tailwind-css&logoColor=%2338B2AC)](#)
* [![Hardhat](https://custom-icon-badges.demolab.com/badge/Hardhat-^2.14.0-yellow?logo=hardhat&logoColor=yellow)](#)
* [![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?logo=typescript&logoColor=3178C6)](#)
* [![Postgres](https://img.shields.io/badge/Postgres-14.13-%23316192.svg?logo=postgresql&logoColor=%23316192)](#)
* [![Prisma](https://img.shields.io/badge/Prisma-^6.6.0-2D3748?logo=prisma&logoColor=2D3748)](#)
* [![Solidity](https://img.shields.io/badge/Solidity-0.8.24-363636?logo=solidity&logoColor=363636)](#)
* [![Wagmi](https://img.shields.io/badge/Wagmi-^2.15.0-000?logo=wagmi&logoColor=000)](#)
* [![Viem](https://custom-icon-badges.demolab.com/badge/Viem-^2.28.0-000000?logo=viem&logoColor=000000)](#)
* [![Ant Design Web3](https://custom-icon-badges.demolab.com/badge/Ant_Design_Web3-^1.23.0-6c58f6?logo=antdesign&logoColor=6c58f6)](#)
* [![Pinata](https://custom-icon-badges.demolab.com/badge/Pinata-^2.4.6-6a58f6?logo=pinata)](#)
* [![Metamask](https://custom-icon-badges.demolab.com/badge/Metamask-^2.4.6-orange?logo=metamask)](#)
* [![Sepolia Ethereum](https://img.shields.io/badge/Sepolia-3C3C3D?logo=ethereum&logoColor=white)](#)
* [![Tether](https://img.shields.io/badge/Tether-168363?&logo=tether&logoColor=white)](#)
* [![ipfs](https://img.shields.io/badge/IPFS-blue?&logo=ipfs&logoColor=white)](#)

## Architecture 🏢

![architecture](/images/readme/tech-architectur.png)

The overall layered architecture design of this project can be divided into the following six layers:

---

### 🧩 1. Frontend Layer (User Interface Layer)

Primarily responsible for building the user interaction interface. The tech stack includes:

* **Next.js**: A React framework used for server-side rendering (SSR) and static page generation.
* **React**: For building user interface components.
* **Tailwind CSS**: A utility-first CSS framework for quickly building beautiful UIs.
* **Formik**: For building complex forms and managing form state.
* **RainbowKit & Wagmi**: Used for wallet connection and Web3 wallet interactions.
* **Ethers.js**: For frontend interaction with Ethereum smart contracts.
* **VSCode**: Development tool.
* **Lucide**: Icon library that enhances the visual appeal of the UI.

➡️ This layer is mainly responsible for user interface display, wallet connection, and entry points for contract interaction.

---

### 🧠 2. Middleware Layer (Service Layer / API Layer)

* **Node.js**: Backend runtime environment that hosts API services.
* **Prisma**: ORM framework for connecting to the database, data modeling, and operations.
* **Pino (represented by "Llama" in the diagram)**: High-performance logging tool.

➡️ This layer primarily handles data communication between frontend and backend, encapsulates database operations, and manages logging.

---

### 🗃 3. Database Layer (Data Persistence Layer)

* **PostgreSQL**: Relational database used to store structured data such as user info, product info, and order info.
* **IPFS**: Distributed storage system for storing immutable data like product images and certificates.

➡️ This layer supports queryable data persistence and decentralized storage for on-chain data.

---

### ⛓ 4. Smart Contract Layer (Blockchain Layer)

* **Solidity**: Programming language for developing smart contracts.
* **Ethereum**: Blockchain platform for deploying smart contracts.
* **Hardhat**: Tool for compiling, testing, and deploying contracts.
* **MetaMask**: Web3 wallet used for user signing and transactions.

➡️ This layer implements core on-chain logic, including product registration, order recording, and access control.

---

### ☁️ 5. Cloud Infrastructure Layer (DevOps & Deployment)

* **Git**: Version control for code.
* **Vercel**: Deployment platform for frontend services, supporting automated build and deployment.

➡️ Provides automated CI/CD for fast deployment, iteration, and testing.

---

### ✅ Summary

| Layer                      | Main Responsibility                        | Technologies Used                   |
| -------------------------- | ------------------------------------------ | ----------------------------------- |
| Frontend Layer             | User interaction & wallet connection       | React, Next.js, Formik, Wagmi, etc. |
| Middleware Layer           | API services & database operations         | Node.js, Prisma                     |
| Database Layer             | Structured data & distributed file storage | PostgreSQL, IPFS                    |
| Smart Contract Layer       | Contract logic & blockchain interaction    | Solidity, Ethereum, Hardhat         |
| Cloud Infrastructure Layer | Auto deployment & continuous integration   | Git, Vercel                         |

---



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
# Quick Start🚀

## Clone Repository

```shell
git clone https://github.com/jingjiezhou2021/treasure-tracing-palace.git
```

## 📦 Configure Environment Variables

The project is divided into two workspaces: `smart-contracts` and `front-end`. Each workspace needs to set the environment variable configuration file. The following introduces each configuration item and its function



---

### 🔐 `smart-contracts/.env`

| Variable Name       | Description                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `ETHERSCAN_API_KEY` | Used to interact with the Etherscan API after contract deployment for auto-verification |
| `MNEMONIC`          | Wallet mnemonic phrase used to generate the private key for contract deployment         |
| `SEPOLIA_RPC_URL`   | RPC node address for the Sepolia testnet, used to connect to the blockchain network     |

---

### 🌐 `front-end/.env`

| Variable Name     | Description                                                                    |
| ----------------- | ------------------------------------------------------------------------------ |
| `AUTH_SECRET`     | Encryption key for user authentication                                         |
| `APP_DOMAIN`      | Domain address of the application                                              |
| `NEXTAUTH_URL`    | Service URL used by NextAuth.js                                                |
| `AUTH_TRUST_HOST` | Trusted host setting for NextAuth                                              |
| `NEXTAUTH_SECRET` | Key used to encrypt sessions and tokens (similar in function to `AUTH_SECRET`) |

---

### 🧪 `front-end/.env.development`

| Variable Name                      | Description                                                       |
| ---------------------------------- | ----------------------------------------------------------------- |
| `DATABASE_URL`                     | PostgreSQL database connection string for development environment |
| `PLATFORM_WALLET_PRIVATE_KEY`      | Private key used by the platform to initiate transactions         |
| `NEXT_PUBLIC_PLATFORM_WALLET_ADDR` | Platform wallet address, visible to the frontend                  |
| `NEXT_PUBLIC_USDT`                 | USDT contract address (mock contract deployed locally)            |
| `NEXT_PUBLIC_PRODUCT_REGISTRY`     | Product management contract address                               |
| `NEXT_PUBLIC_ORDER_REGISTRY`       | Order contract address                                            |
| `NEXT_PUBLIC_RPC_URL`              | RPC address of the local blockchain node                          |
| `IPFS_RPC_URL`                     | RPC address of the local IPFS node                                |

---

### 🚀 `front-end/.env.production`

| Variable Name                      | Description                                                         |
| ---------------------------------- | ------------------------------------------------------------------- |
| `DATABASE_URL`                     | PostgreSQL database connection string for production                |
| `PLATFORM_WALLET_PRIVATE_KEY`      | Private key used by the platform to initiate on-chain transactions  |
| `NEXT_PUBLIC_PLATFORM_WALLET_ADDR` | Platform wallet address (deployed on the Sepolia testnet)           |
| `NEXT_PUBLIC_USDT`                 | USDT contract address (deployed on the Sepolia testnet)             |
| `NEXT_PUBLIC_PRODUCT_REGISTRY`     | Product registry contract address (deployed on the Sepolia testnet) |
| `NEXT_PUBLIC_ORDER_REGISTRY`       | Order registry contract address (deployed on the Sepolia testnet)   |
| `NEXT_PUBLIC_RPC_URL`              | Blockchain testnet node address                                     |
| `PINATA_API_KEY`                   | Pinata platform API key, used to upload files to IPFS               |
| `PINATA_API_SECRET`                | Pinata platform API secret                                          |
| `PINATA_JWT`                       | JWT token used for authorized uploads via Pinata                    |
| `NEXT_PUBLIC_PINATA_GATEWAY_URL`   | Pinata gateway URL (used on the frontend)                           |
| `PINATA_GATEWAY_KEY`               | Authorization key for accessing the Pinata gateway                  |


---

## Development

### Run IPFS Desktop


![ipfs](./images/readme/ipfs.png)

Check `KURBO RPC API Address` in the setting

![ipfs1](./images/readme/ipfs1.png)

Set`IPFS_RPC_URL` to `KURBO RPC API Address` in `package/front-end/.env.development`

```shell
IPFS_RPC_URL="/ip4/127.0.0.1/tcp/5001"
```

### Run Local Database

In this repo I used Postgre SQL（If you're using another db please modify `datasource.provider` value in `package/front-end/prisma/schema.prisma`）

![postgresql1](./images/readme/postgresql1.png)

Set `DATABASE_URL` to the url of local database in `package/front-end/.env.development`

```shell
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

### Prisma Migration 

Local create git branch `prisma-development`

```shell
git checkout -b prisma-development
```

Reset to remote branch with the same name

```shell
git fetch --all
git reset --hard origin/prisma-development
```

Install dependencies

```shell
yarn
```

Change directory to `packages/front-end`

```shell
cd packages/front-end
```

Use prisma to reset database(Tap `y` to confirm action)

```shell
yarn dotenv -e .env.development -- yarn prisma migrate reset
```

![prisma](./images/readme/prisma.png)

Switch back to `dev` branch

```shell
git checkout dev
```

Reinstall the dependencies

```shell
yarn
```



### Run Local Blockchain

Change directory to `packages/smart-contract`

```shell
cd packages/smart-contract
```

Launch hardhat nodes

```shell
npx hardhat node
```

Launch successful

![hardhat-node](./images/readme/hardhat-node.png)


### Deploy Smart Contracts To Local Blockchain

Create A New Console

![new-terminal](./images/readme/new-terminal.png)

Change directory to `packages/smart-contract`

```shell
cd packages/smart-contract
```

Execute deploying script

```shell
yarn dev-deploy
```

Deployment successful

![dev-deploy](./images/readme/dev-deploy.png)

The addresses of contracts are displayed in the log, copy paste these addresses into `packages/front-end/.env.development`


```shell
NEXT_PUBLIC_USDT= # USDT contract address
NEXT_PUBLIC_PRODUCT_REGISTRY= # ProductRegistry contract address
NEXT_PUBLIC_ORDER_REGISTRY= # OrderRegistry contract address
```

### Run Next.js Development Server

Change directory to `packages/front-end`

```shell
cd packages/front-end
```

Run dev script

```shell
yarn dev
```

Server started

![dev-server](./images/readme/dev-server.png)

Open `localhost:3000` in the browser

![dev-server-browser](./images/readme/dev-server-browser.png)

To reach full capabilities of the project you need to configure [Other Environment variables](#-configure-environment-variables)

## Production

### Set Up Pinata

Register account in [Pinata Website](https://pinata.cloud/)

![pinata-website](./images/readme/pinata-website.png)

Enter account admin page

![pinata-admin](./images/readme/pinata.png)

Copy gateway address into `packages/front-end/.env.production`,the name of key will be `NEXT_PUBLIC_PINATA_GATEWAY_URL`

![pinata-gateway](./images/readme/pinata-gateway.png)

```shell
NEXT_PUBLIC_PINATA_GATEWAY_URL= # pinata gateway address
```

Create gateway key

![pinata-gateway-key1](./images/readme/pinata-gateway-key1.png)

![pinata-gateway-key2](./images/readme/pinata-gateway-key2.png)

![pinata-gateway-key3](./images/readme/pinata-gateway-key3.png)

Copy gate way key into `packages/front-end/.env.production`,the name of key will be `PINATA_GATEWAY_KEY`

```shell
PINATA_GATEWAY_KEY= # pinata gateway key
```

Create an API key

![pinata-api-key1](./images/readme/pinata-api-key1.png)

Check admin option

![pinata-api-key2](./images/readme/pinata-api-key2.png)

Click Copy All to copy to clipboard

![pinata-api-key3](./images/readme/pinata-api-key3.png)

There are 3 parts in the copied content: `API Key`,`API Secret`,`JWT`

![pinata-api-key4](./images/readme/pinata-api-key4.png)


Create environment variables `PINATA_API_KEY`、`PINATA_API_SECRET`、`PINATA_JWT` in`packages/front-end/.env.production` and paste the corresponding value for them

```shell
PINATA_API_KEY= # API Key value in the clipboard
PINATA_API_SECRET= # API Secret in the clipboard
PINATA_JWT= # JWT in the clipboard
```

### Deploy Smart Contracts To Sepolia

Set the environment variables below in `packages/smart-contract/.env`

```shell
ETHERSCAN_API_KEY= # Etherscan API key
MNEMONIC= # Wallet mnemonic
SEPOLIA_RPC_URL= # Sepolia RPC node url
```

Change directory to`packages/smart-contract`

```shell
cd packages/smart-contract
```

Execute deploy to Sepolia script(tap `y` to confirm)


```shell
yarn deploy
```

![deploy](./images/readme/deploy.png)

Check contract in Etherscan tp see the contract has been verified


![deploy-result](./images/readme/deploy-result.png)

### Prisma Migration

Set `DATABASE_URL`to url of the database used in production  `package/front-end/.env.production`

```shell
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```


Local create git branch `prisma-production`

```shell
git checkout -b prisma-production
```

Reset to remote branch with the same name

```shell
git fetch --all
git reset --hard origin/prisma-production
```

Install dependencies

```shell
yarn
```

Change directory to `packages/front-end`

```shell
cd packages/front-end
```

Use prisma to reset database(Tap `y` to confirm action)

```shell
yarn dotenv -e .env.production -- yarn prisma migrate reset
```

![prisma-production](./images/readme/prisma-production.png)

Switch back to `dev`

```shell
git checkout dev
```

Reinstall dependencies

```shell
yarn
```

### Next.js Build

Change directory to `packages/front-end`

```shell
cd packages/front-end
```

Execute build script

```shell
yarn build
```

Build successful

![build](./images/readme/build.png)


### Start Next.js Built Server

Run start script

```shell
yarn start
```

Open `localhost:3000` in the browser

![start](./images/readme/start.png)

### Publish Vercel

fork this repo

![fork](./images/readme/fork.png)

![fork1](./images/readme/fork1.png)

Register an account or login in [Vercel Website](https://vercel.com/)

![vercel-website](./images/readme/vercel.png)

Create a new project

![vercel-create1](./images/readme/vercel-create1.png)

Choose the forked treasure-tracing-palace

![vercel-create2](./images/readme/vercel-create2.png)

Override build and install command


![vercel-create3](./images/readme/vercel-create3.png)



Copy `package/front-end/.env`,`package/front-end/.env.production`,`package/smart-contract` content and paste them into environment variables setting

![vercel-create4](./images/readme/vercel-create4.png)

Click deploy

![vercel-create5](./images/readme/vercel-create5.png)

After first deployment success you need to modify the values of `NEXTAUTH_URL` and `AUTH_TRUST_HOST`. First check the domain assigned by vercel

![vercel-create6](./images/readme/vercel-create6.png)

Set the values of both `NEXTAUTH_URL`,`AUTH_TRUST_HOST` to this domain

![vercel-create7](./images/readme/vercel-create7.png)



<p align="right">(<a href="#readme-top">back to top</a>)</p>






<!-- CONTRIBUTING -->
# Contribute 🧑🏿‍💻

Contributing code is what makes the open source community a great place to learn, be inspired, and create. We really appreciate any contribution you may have.

If you have any suggestions for improvements, please `fork` the repository and create a pull request. You can also directly submit an `issue` with the `"enhance"` label.

Don't forget to give the project a star ⭐! Thanks again!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a pull request

## Contributors❤️

<a href="https://github.com/jingjiezhou2021/treasure-tracing-palace/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jingjiezhou2021/treasure-tracing-palace" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>









<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/jingjiezhou2021/treasure-tracing-palace.svg?style=for-the-badge
[contributors-url]: https://github.com/jingjiezhou2021/treasure-tracing-palace/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jingjiezhou2021/treasure-tracing-palace.svg?style=for-the-badge
[forks-url]: https://github.com/jingjiezhou2021/treasure-tracing-palace/network/members
[stars-shield]: https://img.shields.io/github/stars/jingjiezhou2021/treasure-tracing-palace.svg?style=for-the-badge
[stars-url]: https://github.com/jingjiezhou2021/treasure-tracing-palace/stargazers
[issues-shield]: https://img.shields.io/github/issues/jingjiezhou2021/treasure-tracing-palace.svg?style=for-the-badge
[issues-url]: https://github.com/jingjiezhou2021/treasure-tracing-palace/issues
[license-shield]: https://img.shields.io/github/license/jingjiezhou2021/treasure-tracing-palace.svg?style=for-the-badge
[license-url]: https://github.com/jingjiezhou2021/treasure-tracing-palace/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/jingjiezhou2021
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 