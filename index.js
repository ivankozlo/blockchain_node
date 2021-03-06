/* Let's get started */

const SHA256 = require("crypto-js/sha256");



class Transaction {
  from
  to
  amount
  timestamp
  transactionType
  fees
  constructor(from, to, amount, transactionType = "domestic") {
    this.from = from
    this.to = to
    this.amount = amount
    this.timestamp = new Date().getTime()
    this.transactionType = transactionType
  }
}

class TransactionTypeSmartContract {
  static apply(transaction){
    let fee = 0.0
    if(transaction.transactionType == "domestic"){
      fee = 0.02
    }else{
      fee = 0.05
    }
    transaction.fees = transaction.amount * fee
    transaction.amount = transaction.amount - transaction.fees
    return transaction
  }
  constructor(){}
}

class Block {
  index = 0
  previousHash = ""
  hash
  nonce
  transactions = []

  constructor(){
    this.nonce = 0
  }

  get key(){
    return this.index.toString() + this.previousHash + this.nonce.toString() + JSON.stringify(this.transactions)
  }

  addTransaction(transaction){
    this.transactions.push(TransactionTypeSmartContract.apply(transaction))
  }
}

class Blockchain {
  difficulty
  blocks = []

  constructor(genesisBlock, difficulty = 2){
    this.difficulty = difficulty
    this.addBlock(genesisBlock)
  }

  addBlock(block){
    if(this.blocks.length === 0){
      block.previousHash = "0"
      block.hash = this.generateHash(block)
    }else{
      block.index = this.blocks[this.blocks.length - 1].index + 1
      block.previousHash = this.blocks[this.blocks.length - 1].hash
      block.hash = this.proofOfWork(block)
    }
    this.blocks.push(block)
  }

  proofOfWork(block){
    if(block.hash == undefined){
      block.hash = this.generateHash(block)
    }
    while(block.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0")){
      block.nonce++
      block.hash = this.generateHash(block)
    }
    return block.hash
  }

  generateHash(block){
    return SHA256(block.key).toString()
  }

}

console.log('Mining in progress ...')
console.log("--------------------------------------------------------------------")

// The very first block of blockchain is called "Genesis Block"

let genesisBlock = new Block()
let blockchain = new Blockchain(genesisBlock, 4)

let block1 = new Block()
let block2 = new Block()
let block3 = new Block()

let transaction1 = new Transaction('Ivan', 'Ivanova', 10)
let transaction2 = new Transaction('Ivan', 'Konstantin', 3)
let transaction3 = new Transaction('Ivan', 'Max', 4, 'international')
let transaction4 = new Transaction('Tetra', 'Ivan', 3)
let transaction5 = new Transaction('Ivan', 'Tetra', 20, 'international')

block1.addTransaction(transaction1)
block1.addTransaction(transaction2)
block2.addTransaction(transaction3)
block3.addTransaction(transaction4)
block3.addTransaction(transaction5)

blockchain.addBlock(block1)
blockchain.addBlock(block2)
blockchain.addBlock(block3)

console.log(JSON.stringify(blockchain, null, 2))
