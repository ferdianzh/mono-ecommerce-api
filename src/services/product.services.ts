import { Product, IProduct } from '../models/product'

export class ProductServices {
  async addProduct(attr: IProduct) {
    const product = Product.build(attr)
    await product.save()
    return product
  }

  async getProducts() {
    const products = await Product.find()
    return products
  }

  async getProductById(id: String) {
    const product = await Product.findById(id)
    return product
  }

  async updateProductById(id: String, attr: IProduct) {
    const result = await Product.findByIdAndUpdate(id, attr, { new: true })
    return result
  }

  async deleteProductById(id: String) {
    const result = await Product.findByIdAndDelete(id)
    return result
  }
}
