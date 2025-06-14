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
![Website Status](https://img.shields.io/website?url=https://treasure-tracing-palace-front-end.vercel.app/&style=for-the-badge)


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/jingjiezhou2021/treasure-tracing-palace">
    <img src="packages/front-end/public/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">溯宝阁</h3>

  <p align="center">
    基于以太坊的去中心化商品销售和追溯平台
    <br />
    <a href="https://treasure-tracing-palace-front-end.vercel.app/">📺<strong>浏览演示网址 »</strong></a>
    <br />
    <br />
    <a href="https://github.com/jingjiezhou2021/treasure-tracing-palace/issues/new?labels=bug&template=bug-report---.md">问题反馈</a>
    &middot;
    <a href="https://github.com/jingjiezhou2021/treasure-tracing-palace/issues/new?labels=enhancement&template=feature-request---.md">提交代码</a>
  </p>
</div>


<h2>目录</h2>

- [关于项目📖](#关于项目)
  - [功能模块](#功能模块)
    - [生产商🏭](#生产商)
      - [创建商品](#创建商品)
      - [登记商品](#登记商品)
      - [库存管理](#库存管理)
      - [订单管理](#订单管理)
      - [商品溯源](#商品溯源)
    - [销售商🏪](#销售商)
      - [商品采购](#商品采购)
      - [库存管理](#库存管理-1)
      - [商品零售](#商品零售)
      - [订单管理](#订单管理-1)
      - [商品溯源](#商品溯源-1)
    - [消费者🛍️](#消费者️)
      - [商品浏览](#商品浏览)
      - [商品购买](#商品购买)
      - [订单管理](#订单管理-2)
      - [商品溯源](#商品溯源-2)
- [技术路线⚙️](#技术路线️)
  - [开发工具🔧](#开发工具)
  - [技术架构🏢](#技术架构)
    - [🧩 一、前端层（用户界面层）](#-一前端层用户界面层)
    - [🧠 二、中间层（服务层 / API 层）](#-二中间层服务层--api-层)
    - [🗃 三、数据库层（数据持久化层）](#-三数据库层数据持久化层)
    - [⛓ 四、智能合约层（区块链层）](#-四智能合约层区块链层)
    - [☁️ 五、云设施层（DevOps 与部署）](#️-五云设施层devops-与部署)
    - [✅ 总结：](#-总结)
- [快速开始🚀](#快速开始)
  - [克隆存储库](#克隆存储库)
  - [📦 环境变量配置](#-环境变量配置)
    - [🔐 `smart-contracts/.env`](#-smart-contractsenv)
    - [🌐 `front-end/.env`](#-front-endenv)
    - [🧪 `front-end/.env.development`](#-front-endenvdevelopment)
    - [🚀 `front-end/.env.production`](#-front-endenvproduction)
  - [开发环境](#开发环境)
    - [运行 IPFS Desktop](#运行-ipfs-desktop)
    - [运行本地数据库](#运行本地数据库)
    - [使用 Prisma 迁移数据库](#使用-prisma-迁移数据库)
    - [运行本地区块链模拟器](#运行本地区块链模拟器)
    - [智能合约部署到区块链模拟器](#智能合约部署到区块链模拟器)
    - [本地启动 Next.js 开发服务器](#本地启动-nextjs-开发服务器)
  - [生产环境](#生产环境)
    - [配置 Pinata](#配置-pinata)
    - [部署智能合约到 Sepolia](#部署智能合约到-sepolia)
    - [使用 Prisma 迁移数据库](#使用-prisma-迁移数据库-1)
    - [Next.js 打包服务器](#nextjs-打包服务器)
    - [启动 Next.js 打包后的服务器](#启动-nextjs-打包后的服务器)
    - [发布到 Vercel](#发布到-vercel)
- [贡献代码🧑🏿‍💻](#贡献代码)
  - [贡献者❤️](#贡献者️)



<!-- ABOUT THE PROJECT -->
# 关于项目📖

![项目截图](/images/readme/entry.png)

溯宝阁是一个去中心化的供应链管理系统，让您能够高效便捷地管理产品分销链。这有助于防止假冒产品流入市场。这对于追踪药品和品牌产品尤为有用。

它从制造商在系统注册产品的根层级开始。产品上市后，会以预先设定的价格出售给零售商。之后，消费者可以从零售商处购买该产品。所有这些交易都记录在区块链上，这使得产品流通更加透明。产品的完整历史记录也会向用户展示，用户可以看到产品自生产以来的流通过程。

本平台使用泰达币（USDT）作为支付工具。

## 功能模块

![功能模块](/images/readme/function-modules-graph.png)

### 生产商🏭

#### 创建商品

![创建商品](/images/readme/create_product_type.png)

#### 登记商品

![登记商品](/images/readme/record_product.png)

#### 库存管理

![库存管理](/images/readme/warehouse_management.png)


#### 订单管理

![订单管理](/images/readme/order_management.png)


#### 商品溯源

![商品溯源](/images/readme/tracing_management.png)

![商品溯源1](/images/readme/tracing_management1.png)
![商品溯源2](/images/readme/tracing_management2.png)


### 销售商🏪

#### 商品采购

![商品采购](/images/readme/purchasing.png)

#### 库存管理

![库存管理-销售商](/images/readme/warehouse_management_distributor.png)

#### 商品零售

![商品零售1](/images/readme/retailing1.png)


![商品零售2](/images/readme/retailing2.png)


![商品零售3](/images/readme/retailing3.png)


#### 订单管理

![订单管理](/images/readme/order_management_distributor.png)


#### 商品溯源

![商品溯源-销售商](/images/readme/tracing_management_distributor1.png)


![商品溯源-销售商2](/images/readme/tracing_management_distributor2.png)

### 消费者🛍️

#### 商品浏览

![商品浏览](/images/readme/browse_commodoties.png)

#### 商品购买

![商品购买](/images/readme/buy_commodoty.png)

#### 订单管理

![订单管理](/images/readme/order_management_customer.png)


#### 商品溯源

![商品溯源-消费者](/images/readme/tracing_management_customer.png)



<p align="right">(<a href="#readme-top">back to top</a>)</p>



# 技术路线⚙️

## 开发工具🔧

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

## 技术架构🏢

![技术架构](/images/readme/tech-architectur.png)

本项目整体采用分层架构设计，按功能可划分为以下六大层：

---

### 🧩 一、前端层（用户界面层）

主要用于构建用户交互界面，技术栈如下：

* **Next.js**：React 框架，用于构建服务端渲染（SSR）与静态页面。
* **React**：构建用户界面组件。
* **Tailwind CSS**：实用工具优先的 CSS 框架，用于快速构建美观 UI。
* **Formik**：用于构建复杂表单，进行表单状态管理。
* **RainbowKit & Wagmi**：用于连接钱包，实现 Web3 钱包交互。
* **Ethers.js**：在前端与以太坊智能合约进行交互。
* **VSCode**：开发工具。
* **Lucide**：图标库，提升界面视觉效果。

➡️ 此层主要负责用户界面展示、钱包连接、合约交互入口。

---

### 🧠 二、中间层（服务层 / API 层）

* **Node.js**：后端运行环境，承载 API 服务。
* **Prisma**：ORM 框架，用于连接数据库，进行数据建模和操作。
* **Pino (图中 Llama 代表 logger)**：高性能日志记录工具。

➡️ 此层主要负责前后端数据通信、数据库操作封装、日志记录等任务。

---

### 🗃 三、数据库层（数据持久化层）

* **PostgreSQL**：关系型数据库，用于存储用户信息、产品信息、订单信息等结构化数据。
* **IPFS**：分布式存储系统，用于存储产品图片、证书等不可篡改数据。

➡️ 此层支持可查询的数据持久化与上链数据的去中心化存储。

---

### ⛓ 四、智能合约层（区块链层）

* **Solidity**：智能合约开发语言。
* **Ethereum**：部署智能合约的区块链平台。
* **Hardhat**：合约编译、测试、部署工具。
* **MetaMask**：Web3 钱包，用于用户签名与交易。

➡️ 此层实现核心的上链逻辑，包括产品注册、订单记录、权限验证等。

---

### ☁️ 五、云设施层（DevOps 与部署）

* **Git**：代码版本控制。
* **Vercel**：部署平台，用于部署前端服务，实现自动化构建与上线。

➡️ 提供自动化 CI/CD，快速上线、迭代和测试。

---

### ✅ 总结：

| 层级    | 主要职责          | 使用技术                            |
| ----- | ------------- | ------------------------------- |
| 前端层   | 用户交互与钱包连接     | React, Next.js, Formik, Wagmi 等 |
| 中间层   | API 服务，数据库操作  | Node.js, Prisma                 |
| 数据层   | 结构化数据和分布式文件存储 | PostgreSQL, IPFS                |
| 智能合约层 | 合约逻辑、区块链交互    | Solidity, Ethereum, Hardhat     |
| 云设施层  | 自动部署与持续集成     | Git, Vercel                     |

---



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
# 快速开始🚀

## 克隆存储库

```shell
git clone https://github.com/jingjiezhou2021/treasure-tracing-palace.git
```

## 📦 环境变量配置

项目分为 `smart-contracts` 和 `front-end` 两个工作区，每个工作区都需要设置环境变量配置文件，以下分别介绍各配置项及其功能。

---

### 🔐 `smart-contracts/.env`

| 变量名                 | 功能描述                             |
| ------------------- | -------------------------------- |
| `ETHERSCAN_API_KEY` | 用于合约部署后与 Etherscan API 交互，实现自动验证 |
| `MNEMONIC`          | 钱包助记词，用于生成部署合约的私钥                |
| `SEPOLIA_RPC_URL`   | Sepolia 测试网的 RPC 节点地址，用于连接区块链网络  |

---

### 🌐 `front-end/.env`

| 变量名               | 功能描述                              |
| ----------------- | --------------------------------- |
| `AUTH_SECRET`     | 用户认证的加密密钥                         |
| `APP_DOMAIN`      | 应用的域名地址                           |
| `NEXTAUTH_URL`    | NextAuth.js 使用的服务 URL     |
| `AUTH_TRUST_HOST` | NextAuth 的信任主机设置                  |
| `NEXTAUTH_SECRET` | 用于加密会话和令牌的密钥（与 AUTH\_SECRET 功能类似） |

---

### 🧪 `front-end/.env.development`

| 变量名                                | 功能描述                       |
| ---------------------------------- | -------------------------- |
| `DATABASE_URL`                     | 开发环境 PostgreSQL 数据库连接地址    |
| `PLATFORM_WALLET_PRIVATE_KEY`      | 平台用于发起交易的私钥                |
| `NEXT_PUBLIC_PLATFORM_WALLET_ADDR` | 平台钱包地址，前端可见                |
| `NEXT_PUBLIC_USDT`                 | USDT 合约地址（本地环境部署的 Mock 合约） |
| `NEXT_PUBLIC_PRODUCT_REGISTRY`     | 商品管理合约地址                   |
| `NEXT_PUBLIC_ORDER_REGISTRY`       | 订单合约地址                     |
| `NEXT_PUBLIC_RPC_URL`              | 区块链本地节点的 RPC 地址            |
| `IPFS_RPC_URL`                     | 本地 IPFS 节点的 RPC 地址         |

---

### 🚀 `front-end/.env.production`

| 变量名                                | 功能描述                                  |
| ---------------------------------- | ------------------------------------- |
| `DATABASE_URL`                     | 生产环境 PostgreSQL 数据库连接地址 |
| `PLATFORM_WALLET_PRIVATE_KEY`      | 平台用于发起链上交易的私钥                         |
| `NEXT_PUBLIC_PLATFORM_WALLET_ADDR` | 平台钱包地址（部署在Sepolia测试网）|
| `NEXT_PUBLIC_USDT`                 | USDT 合约地址（部署在Sepolia测试网）                  |
| `NEXT_PUBLIC_PRODUCT_REGISTRY`     | 商品注册合约地址（部署在Sepolia测试网）                   |
| `NEXT_PUBLIC_ORDER_REGISTRY`       | 订单注册合约地址（部署在Sepolia测试网）                   |
| `NEXT_PUBLIC_RPC_URL`              | 区块链测试网节点地址                |
| `PINATA_API_KEY`                   | Pinata 平台的 API Key，用于上传文件到 IPFS       |
| `PINATA_API_SECRET`                | Pinata 平台的 API Secret                 |
| `PINATA_JWT`                       | Pinata 授权上传使用的 JWT Token              |
| `NEXT_PUBLIC_PINATA_GATEWAY_URL`   | Pinata 网关地址（前端使用）              |
| `PINATA_GATEWAY_KEY`               | Pinata 网关的访问授权密钥                  |

---

## 开发环境

### 运行 IPFS Desktop

运行IPFS Desktop

![ipfs](./images/readme/ipfs.png)

查看IPFS Desktop设置的KURBO RPC API地址

![ipfs1](./images/readme/ipfs1.png)

在`package/front-end/.env.development`中配置`IPFS_RPC_URL`为KURBO RPC API地址

```shell
IPFS_RPC_URL="/ip4/127.0.0.1/tcp/5001"
```

### 运行本地数据库

此处使用Postgre SQL（如果要使用其他数据库需要更改`package/front-end/prisma/schema.prisma`中的`datasource.provider`）

![postgresql1](./images/readme/postgresql1.png)

在`package/front-end/.env.development`中配置`DATABASE_URL`为连接数据库的URL

```shell
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

### 使用 Prisma 迁移数据库

本地创建`prisma-development`分支

```shell
git checkout -b prisma-development
```

内容重置为远程同名分支

```shell
git fetch --all
git reset --hard origin/prisma-development
```

安装依赖

```shell
yarn
```

控制台切换路径到`packages/front-end`

```shell
cd packages/front-end
```

控制台输入命令用Prisma重置数据库（中途需要敲一下`y`键）

```shell
yarn dotenv -e .env.development -- yarn prisma migrate reset
```

![prisma](./images/readme/prisma.png)

切换回`dev`分支

```shell
git checkout dev
```

重新安装依赖

```shell
yarn
```



### 运行本地区块链模拟器

控制台切换路径到`packages/smart-contract`

```shell
cd packages/smart-contract
```

本地启动hardhat node

```shell
npx hardhat node
```

启动成功

![hardhat-node](./images/readme/hardhat-node.png)


### 智能合约部署到区块链模拟器

启动一个新的控制台

![new-terminal](./images/readme/new-terminal.png)

控制台切换路径到`packages/smart-contract`

```shell
cd packages/smart-contract
```

执行部署脚本

```shell
yarn dev-deploy
```

部署成功

![dev-deploy](./images/readme/dev-deploy.png)

可以看到部署提示信息中显示了合约的地址，将这些地址复制到`packages/front-end/.env.development`中

```shell
NEXT_PUBLIC_USDT= #USDT合约地址
NEXT_PUBLIC_PRODUCT_REGISTRY= #商品管理合约地址
NEXT_PUBLIC_ORDER_REGISTRY= #订单管理合约地址
```

### 本地启动 Next.js 开发服务器

控制台切换路径到`packages/front-end`

```shell
cd packages/front-end
```

执行启动脚本

```shell
yarn dev
```

启动成功

![dev-server](./images/readme/dev-server.png)

浏览器打开`localhost:3000`

![dev-server-browser](./images/readme/dev-server-browser.png)

如要使用完整功能需要设置[其它环境变量](#-环境变量配置)

## 生产环境

### 配置 Pinata

在 [Pinata官网](https://pinata.cloud/) 注册账号

![pinata-website](./images/readme/pinata-website.png)

进入管理后台

![pinata-admin](./images/readme/pinata.png)

复制网关地址到`packages/front-end/.env.production`，名称设为`NEXT_PUBLIC_PINATA_GATEWAY_URL`

![pinata-gateway](./images/readme/pinata-gateway.png)

```shell
NEXT_PUBLIC_PINATA_GATEWAY_URL= # pinata 网关地址
```

创建网关秘钥

![pinata-gateway-key1](./images/readme/pinata-gateway-key1.png)

![pinata-gateway-key2](./images/readme/pinata-gateway-key2.png)

![pinata-gateway-key3](./images/readme/pinata-gateway-key3.png)

复制秘钥到`packages/front-end/.env.production`，名称设为`PINATA_GATEWAY_KEY`

```shell
PINATA_GATEWAY_KEY= # pinata 网关秘钥
```

创建API秘钥

![pinata-api-key1](./images/readme/pinata-api-key1.png)

勾选admin选项，任意取名

![pinata-api-key2](./images/readme/pinata-api-key2.png)

点击Copy All，复制到剪切板

![pinata-api-key3](./images/readme/pinata-api-key3.png)

复制的内容有3个成分：`API Key`、`API Secret`、`JWT`

![pinata-api-key4](./images/readme/pinata-api-key4.png)


在`packages/front-end/.env.production`中创建环境变量`PINATA_API_KEY`、`PINATA_API_SECRET`、`PINATA_JWT`存储对应值

```shell
PINATA_API_KEY= # 剪切板中 API Key 的值
PINATA_API_SECRET= # 剪切板中 API Secret 的值
PINATA_JWT= # 剪切板中 JWT 的值
```

### 部署智能合约到 Sepolia

需要在`packages/smart-contract/.env`设置以下环境变量

```shell
ETHERSCAN_API_KEY= # Etherscan API 秘钥
MNEMONIC= # 钱包助记词
SEPOLIA_RPC_URL= # Sepolia 测试网RPC节点URL
```

控制台切换路径到`packages/smart-contract`

```shell
cd packages/smart-contract
```

执行部署到测试网脚本（中途需要敲一下`y`键）

```shell
yarn deploy
```

![deploy](./images/readme/deploy.png)

在Etherscan上打开合约详情发现合约已发布并被验证

![deploy-result](./images/readme/deploy-result.png)

### 使用 Prisma 迁移数据库

在`package/front-end/.env.production`中配置`DATABASE_URL`为连接生产环境数据库的URL

```shell
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```


本地创建`prisma-production`分支

```shell
git checkout -b prisma-production
```

内容重置为远程同名分支

```shell
git fetch --all
git reset --hard origin/prisma-production
```

安装依赖

```shell
yarn
```

控制台切换路径到`packages/front-end`

```shell
cd packages/front-end
```

控制台输入命令用Prisma重置数据库（中途需要敲一下`y`键）

```shell
yarn dotenv -e .env.production -- yarn prisma migrate reset
```

![prisma-production](./images/readme/prisma-production.png)

切换回`dev`分支

```shell
git checkout dev
```

重新安装依赖

```shell
yarn
```

### Next.js 打包服务器

控制台切换路径到`packages/front-end`

```shell
cd packages/front-end
```

执行打包脚本

```shell
yarn build
```

打包成功

![build](./images/readme/build.png)


### 启动 Next.js 打包后的服务器

执行启动脚本

```shell
yarn start
```

浏览器打开`localhost:3000`

![start](./images/readme/start.png)

### 发布到 Vercel


fork此项目

![fork](./images/readme/fork.png)

![fork1](./images/readme/fork1.png)

在 [Vercel官网](https://vercel.com/)注册账号

![vercel-website](./images/readme/vercel.png)

在管理后台创建新项目

![vercel-create1](./images/readme/vercel-create1.png)

选择fork的溯宝阁

![vercel-create2](./images/readme/vercel-create2.png)

覆盖打包和安装依赖的命令

![vercel-create3](./images/readme/vercel-create3.png)



把`package/front-end/.env`和`package/front-end/.env.production`和`package/smart-contract`中的内容粘贴到环境变量设置中

![vercel-create4](./images/readme/vercel-create4.png)

点击部署

![vercel-create5](./images/readme/vercel-create5.png)

第一次部署成功后需要修改Vercel中环境变量`NEXTAUTH_URL`和`AUTH_TRUST_HOST`的值，首先查看Vercel分配的域名

![vercel-create6](./images/readme/vercel-create6.png)

在项目设置中修改`NEXTAUTH_URL`和`AUTH_TRUST_HOST`的值为这个域名

![vercel-create7](./images/readme/vercel-create7.png)



<p align="right">(<a href="#readme-top">back to top</a>)</p>






<!-- CONTRIBUTING -->
# 贡献代码🧑🏿‍💻

正是贡献代码让开源社区成为学习、启发和创造的绝佳场所。我们非常感谢您的任何贡献。

如果您有任何改进建议，请`fork`该仓库并创建拉取请求。您也可以直接提交带有`"enhance"`标签的`issue`。

别忘了给项目点个星⭐！再次感谢！

1. fork 项目
2. 创建您的 Feature 分支（`git checkout -b feature/AmazingFeature`）
3. 提交您的更改（`git commit -m 'Add some AmazingFeature'`）
4. 推送到分支（`git push origin feature/AmazingFeature`）
5. 创建拉取请求

## 贡献者❤️

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