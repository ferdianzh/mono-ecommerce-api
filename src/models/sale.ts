import mongoose from 'mongoose'

interface ISale {
  total: number
  products: {
    product_id: string
    amount: number
    subtotal: number
  }[]
}

interface ISaleRequest {
  product_id: string
  amount: number
}
interface ISaleRequests extends Array<ISaleRequest>{}

interface SaleModelInterface extends mongoose.Model<SaleDoc> {
  build(attr: ISale): SaleDoc
}

interface SaleDoc extends mongoose.Document {
  total: number
  products: {
    product_id: string
    amount: number
    subtotal: number
  }[],
  createdAt: string,
}

const saleProductSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
}, { _id: false })

const saleSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
  },
  products: {
    type: [saleProductSchema],
    required: true,
  },
}, { timestamps: { createdAt: true, updatedAt: false } })

saleSchema.statics.build = (attr: ISale) => {
  return new Sale(attr)
}

const Sale = mongoose.model<SaleDoc, SaleModelInterface>('Sale', saleSchema)

export { Sale, ISale, ISaleRequests }
