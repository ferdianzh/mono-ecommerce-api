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

  async getProductById(id: string) {
    const product = await Product.findById(id)
    return product
  }

  async updateProductById(id: string, attr: IProduct) {
    const product = await Product.findByIdAndUpdate(id, attr, { new: true })
    return product
  }

  async deleteProductById(id: string) {
    const product = await Product.findByIdAndDelete(id)
    return product
  }
}
