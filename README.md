# Aloha ERC20 smart contract

Install

    $ npm install

    
In separete window run hardhat node

    $ npx hardhat node
    
Compile smart contract

    $ npx hardhat compile

Test smart contract

    $ npm test

Or

    $ npx hardhat test 
    
Deploy smart contract

    $ npx hardhat run scripts/deploy.js --network localhost --show-stack-traces

Deploy upgradable smart contract

    $ npx hardhat run --network localhost scripts/deployUpgradeable.js

Run hardhat localhost console

    $ npx hardhat console --network localhost
    
Open Zeppelin docs: https://docs.openzeppelin.com/openzeppelin/
