## Ethereum pupillometer dApp

#### Esta é uma aplicação descentralizada desenvolvida como objeto de estudo de um trabalho de conclusão de curso de Sistemas de Informação na Universidade Federal de Goiás. 

##### Acesse <a href="https://gtoborges.github.io/pupilometro-ethereum-dapp/augustoborges_201606135_tcc.pdf">aqui</a> a monografia produzida para entender mais sobre este trabalho.

Para rodar esta aplicação em ambiente local é preciso ter o <a href="https://nodejs.org/en">NodeJS</a> para:
 - rodar uma rede Ethereum local através do <a href="https://hardhat.org/hardhat-network/docs/overview">Hardhat</a>
 - rodar o frontend no localhost
 - rodar um nó do IPFS através do <a href="https://github.com/ipfs/ipfs-desktop">ipfs-destktop</a>

___
### Configuração do ipfs-desktop

Clone o repositório da aplicação:
```bash
git clone https://github.com/ipfs/ipfs-desktop
```


Realize a instalação dos packages necessários para rodar a aplicação:
```bash
npm install
```


Execute a aplicação com o comanto:
```bash
npm run start
```


Ao executar este comando, uma aplicação em electron será aberta para fazer a configuração no nó. Acesse a configuração em **Settings** no menu principal, e role para baixo buscando a seção **IPFS CONFIG**. Nessa seção, acrescente o endereço do frontend no JSON da configuração como na imagem a seguir:

![ipfs-config](/Imagens/ipfs-config.png)

___

### Configuração da rede Ethereum em ambiente local

Clone este repositório:
```bash
git clone https://github.com/gtoborges/pupilometro-ethereum-dapp
```


Acesse o diretorio backend:
```bash
cd backend
```


Instale os pacotes necessários:
```bash
npm install
```


Compile o contrato (isso irá gerar alguns arquivos, incluindo o json que contém o ABI do contrato utilizado no frontend para a comunicação da metamask com o contrato)
```bash
npx hardhat compile
```


Inicialize a rede do Hardhat com o comando
```bash
npx hardhat node
```


Mantenha a rede rodando e em um novo terminal no mesmo diretório faça o deploy do contrato com o comando:
```bash
npx hardhat run scripts/deploy.ts --network localhost
```


Ao executar o deploy, você verá o endereço no contrato no terminal em que o script foi executado como na imagem a seguir

![contract-address](/Imagens/contract-address.png)


Também é possível ver o mesmo endereço no log do terminal que tiver rodando a rede através do hardhat

![contract-address2](/Imagens/contract-address2.png)

___
### Configuração do frontend

Acesse o diretorio: 
```bash
cd frontend
```


Instale os pacotes necessários:
```bash
npm install
```


Altere o valor da variável *VITE_CONTRACT_ADDRESS* do arquivo **.env** em **frontend/src/.env** e coloque o endereço do contrato que foi feito o deploy na configuração do backend

Execute a aplicação:
```bash
npm run dev
```


Acesse a aplicação em http://localhost:5173/

Caso ainda não tenha a extensão da Metamask instalada, a aplicação irá direcionar para o site da <a href="https://metamask.io/download/">Metamask</a> para realizar a instalação da mesma.

