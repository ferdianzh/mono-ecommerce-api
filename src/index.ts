import express from 'express'
import mongoose from 'mongoose'
import { json } from 'body-parser'

import { productRouter } from './routes/product.routes'

const app = express()
app.use(json())

app.use('/api/products', productRouter)

mongoose.connect('mongodb+srv://mono_developer:mono_developer@learn.kndkh.mongodb.net/mono_ecommerce?retryWrites=true&w=majority')
  .then(() => console.log('db connection success'))
  .catch((err) => console.log(`db connection fail : ${err.message}`))

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})
