import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import { json } from 'body-parser'
import cors from 'cors'

import { productRouter } from './routes/product.routes'
import { saleRouter } from './routes/sale.routes'

dotenv.config()
const app = express()
app.use(json())
app.use(cors())

app.use('/api/products', productRouter)
app.use('/api/sales', saleRouter)

mongoose.connect(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@learn.kndkh.mongodb.net/${process.env.MONGO_ATLAS_COLLECTION}?retryWrites=true&w=majority`)
  .then(() => console.log('db connection success'))
  .catch((err) => console.log(`db connection fail : ${err.message}`))

app.listen(process.env.APP_PORT, () => {
  console.log(`server is listening on port ${process.env.APP_PORT}`)
})
