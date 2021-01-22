module.exports = {
    response: (res, result, status, err) => {
        const resultPrint = {}
        resultPrint.status = 'success'
        resultPrint.statusCode = status
        resultPrint.result = result
        resultPrint.err = err || null
        return res.status(status).json(resultPrint)
    },
    reject: (res, result, status, err) => {
        const resultPrint = {}
        resultPrint.status = 'reject'
        resultPrint.statusCode = status
        resultPrint.result = result
        resultPrint.err = err || null
        return res.status(status).json(resultPrint)
    }
}