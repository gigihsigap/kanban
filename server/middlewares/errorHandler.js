"use strict"

function errorHandler(err, req, res, next) {
    console.log('ERROR HANDLER')
    console.log(err)
    console.log('ERROR NAME')
    console.log(err.name)
    let status, error = []

    switch (err.name) {
        case ('SequelizeValidationError'):
            status = 400
            for (let key in err.errors) error.push(err.errors[key].message)
            break
        case ('JsonWebTokenError'):
            status = 400
            error.push(`You're not authenticated to do that!`)
            break
        default:
            status = err.status || 500
            error.push(err)
            break
    }
    console.log('SENDING ERROR')
    res.status(status).json({ error })
}

module.exports = errorHandler