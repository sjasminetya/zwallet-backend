const { countTransactionHistory } = require('../models/transfer')

exports.pagination = async(limit, page, id) => {
    const transaction = await countTransactionHistory(id)
    let totalData = transaction[0].totalData
    const totalPage = Math.ceil(totalData / limit)
    const setPagination = {
        totalData,
        totalPage,
        currentPage: page,
        eachPage: limit,
        prevPage: page > 1 ? `${process.env.BASE_URL}/v2/transfer/transaction-history?page=${parseInt(page) - 1}&limit=${limit}`: null,
        nextPage: page < totalPage ? `${process.env.BASE_URL}/v2/transfer/transaction-history?page=${parseInt(page) + 1}&limit=${limit}`: null
    }
    return setPagination
}