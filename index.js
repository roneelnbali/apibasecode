const express = require ('express')
const cors = require ('cors')
const rateLimit = require ('express-rate-limit')
require ('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

//api rate limiting default set for 10 minutes (10*6.*1000)
const limiter = rateLimit({
    windowMS:10*60*1000,
    max: 100,
})

app.use(limiter)
app.set('trust proxy', 1)

// set static folder
app.use(express.static('public'))

app.use('/api', require('./routes'))

app.use(cors())

app.listen(PORT, () => console.log(`server running on port ${PORT}`))



