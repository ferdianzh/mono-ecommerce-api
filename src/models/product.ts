import mongoose from "mongoose"

interface IProduct {
  name: string
  description: string
  sale_price: number
  restock_price: number
  stock: number
}

interface ProductModelInterface extends mongoose.Model<ProductDoc> {
  build(attr: IProduct): ProductDoc
}

interface ProductDoc extends mongoose.Document {
  name: string
  description: string
  sale_price: number
  restock_price: number
  stock: number
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  sale_price: {
    type: Number,
    required: true,
  },
  restock_price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
})

productSchema.statics.build = (attr: IProduct) => {
  return new Product(attr)
}

const Product = mongoose.model<ProductDoc, ProductModelInterface>('Product', productSchema)

export { Product, IProduct }
