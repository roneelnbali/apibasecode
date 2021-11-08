const url = require ('url')
const express = require ('express')
const needle = require ('needle')
const apicache = require ('apicache')

const router = express.Router()

// env vars
const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

// initialize cacheing of api
let cache = apicache.middleware

router.get('/',cache('2 minutes'), async(req, res) => {
    try {
        const params = new URLSearchParams({
            ...url.parse(req.url, true).query,
            [API_KEY_NAME]:API_KEY_VALUE,
        })
        const resApi = needle('get', `${API_BASE_URL}? ${params}`)
        const data = resApi.body

        if (process.env.NODE_ENV !== 'production'){
            console.log(`REQUEST: ${API_BASE_URL}?${params}`)

        }

        res.status(200).json(data)
        
    } catch (error) {
        res.json(500).json(error)
    }
   
})

module.exports = router
