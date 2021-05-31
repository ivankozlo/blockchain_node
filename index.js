/* Let's get started */

class Transaction {
  from
  to
  amount
  constructor(from, to, amount) {
    this.from = from
    this.to = to
    this.amount = amount
  }
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
    this.transactions.push(transaction)
  }
}

class Blockchain {
  blocks = []
  constructor(genesisBlock){
    addBlock(genesisBlock)
  }

  addBlock(block){
    if(this.blocks.length === 0){
      block.previousHash = "000000000000000000000000000000" // 30 zeros
      block.hash = generateHash(block)
    }
    this.blocks.push(block)
  }
  generateHash(block){
    let hash = block.key
  }
}

// The very first block of blockchain is called "Genesis Block"

let genesisBlock = new Block()
let blockchain = new Blockchain(genesisBlock)


// let t = new Transaction('a', 'b', 10)
// let b = new Block()
//
// b.addTransaction(t)
//
// console.log(b.key)
