
const fetch = require("node-fetch")
const url = "https://gist.githubusercontent.com/CITGuru/def83f0b4dc789de85fce7ef5b2b827f/raw/1564dd4e61c6ffeedeefc31d20eebf1aade64e6d/data.json"

// my plan was to chanhe this to async  but Nepa fuck me up
fetch(url).then(res => res.json()).then(data => {
    const lastBlockKey = data.previousBlock
    const decode = (previousBlock) => {
        const block = Buffer.from(previousBlock,"base64").toString('ascii')
        return JSON.parse(block)
    }
    //challenge 1
    const allTransaction = (lastBlock,transactions = [data]) =>{
        let previousBlock = lastBlock
        // my plan was to change this to while loop but nepa fuck me up, i cant think staight
        for (let i = 0; i < 100; i++) {
            const block = decode(previousBlock)
            transactions.push(block)
            
            if(block.previousBlock === undefined) return transactions
            previousBlock = block.previousBlock
        }   
    }
    //challenge 2A
    const allTransactions = allTransaction(lastBlockKey)
    const getTransaction = (value) => {     
        const getTransactionById = allTransactions.find(transaction => transaction._id === value)
        const getTransactionbyRef = allTransactions.find(transaction => transaction.ref === value)
        const getTransactionBytxref = allTransactions.find(transaction => transaction.txRef === value)
        if(getTransactionById) return getTransactionById
        if(getTransactionbyRef) return getTransactionbyRef
        if(getTransactionBytxref) return getTransactionBytxref
        return ''
        
    }
    // getTransactionBy('id',5e8d144c1d56989003cf72c6')
    
    //challenge 2B
    const filterTransaction = value => {
        const filterByAddress = allTransactions
        .filter(transaction => transaction.address == value)
        const filterByAmount = allTransactions
        .filter(transaction => transaction.amount == value)
        const filterByStatus = allTransactions
        .filter(transaction => transaction.status == value)
        const filterByCreatedAt = allTransactions
        .filter(transaction => transaction.created == value)
        if(filterByAddress) return filterByAddress
        if(filterByAmount) return filterByAmount
        if(filterByStatus) return filterByStatus
        if(filterByCreatedAt) return filterByCreatedAt
        return ''
    }
    //challenge 2C
    const sumFilterTransaction = filterTransaction => {
        return filterTransaction.length
    }

    
}).catch(err => console.log(err.message))





