const { countTransactionHistory } = require('../models/transfer')

exports.pagination = async(limit, page, totalTransaction) => {
    const transaction = await countTransactionHistory()
    let totalData = transaction[0].totalData
    console.log(totalTransaction)
    if (totalTransaction) {
        totalData = totalTransaction
    }
    const totalPage = Math.ceil(totalData / limit)
    const setPagination = {
        totalData: totalData,
        totalPage,
        currentPage: page,
        eachPage: limit,
        prevPage: page > 1 ? `${process.env.BASE_URL}/v2/transfer/transaction-history?page=${parseInt(page) - 1}&limit=${limit}`: null,
        nextPage: page <= totalPage ? `${process.env.BASE_URL}/v2/transfer/transaction-history?page=${parseInt(page) + 1}&limit=${limit}`: null
    }
    return setPagination
}