## Ethereum pupillometer dApp

#### Esta é uma aplicação descentralizada desenvolvida como objeto de estudo de um trabalho de conclusão de curso de Sistemas de Informação na Universidade Federal de Goiás. 

##### Acesse <a href="https://gtoborges.github.io/pupilometro-ethereum-dapp/augustoborges_201606135_tcc.pdf">aqui</a> a monografia produzida para entender mais sobre este trabalho.

Para rodar esta aplicação em ambiente local é preciso ter o <a href="https://nodejs.org/en">NodeJS</a> para:
 - rodar uma rede Ethereum local através do <a href="https://hardhat.org/hardhat-network/docs/overview">Hardhat</a>
 - rodar o frontend no localhost
 - rodar um nó do IPFS através do <a href="https://github.com/ipfs/ipfs-desktop">ipfs-destktop</a>

___
### Configuração do ipfs-desktop

Clone o repositório da aplicação com o comando 
```bash
git clone https://github.com/ipfs/ipfs-desktop
```

Realize a instalação dos packages necessários para rodar a aplicação com o comando
```bash
npm install
```

Execute a aplicação com o comanto
```bash
npm run start
```

Ao executar este comando, uma aplicação em electron será aberta para fazer a configuração no nó. Acesse a configuração em **Settings** no menu principal, e role para baixo buscando a seção **IPFS CONFIG**. Nessa seção, acrescente o endereço do frontend no JSON da configuração como na imagem a seguir:

![ipfs-config](/Imagens/ipfs-config.png)

___

### Configuração da rede Ethereum em ambiente local

Clone este repositório com o comando
```bash
git clone https://github.com/gtoborges/pupilometro-ethereum-dapp
```

Acesse o diretorio backend com
```bash
cd backend
```

Instale os pacotes necessários com
```bash
npm install
```

Compile o contrato com o comando (isso irá gerar alguns arquivos, incluindo o json que contém o ABI do contrato utilizado no frontend para a comunicação da metamask com o contrato)
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

