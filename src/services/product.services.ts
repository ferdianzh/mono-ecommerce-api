import { Product, IProduct } from '../models/product'

export class ProductServices {
  async addProduct(attr: IProduct) {
    const product = Product.build(attr)
    await product.save()
    return product
  }

  async getProducts(ids: string[] = []) {
    let products
    if (ids.length == 0) {
      products = await Product.find()
    } else {
      products = await Product.find({ '_id': { $in: ids } })
    }
    
    return products
  }

  async getProductById(id: string) {
    const product = await Product.findById(id)
    if (product == null) {
      throw { message: `document with id = ${id} not found` }
    }
    return product
  }

  async updateProductById(id: string, attr: IProduct) {
    const product = await Product.findByIdAndUpdate(id, attr, { new: true })
    if (product == null) {
      throw { message: `document with id = ${id} not found` }
    }
    return product
  }

  async deleteProductById(id: string) {
    const product = await Product.findByIdAndDelete(id)
    if (product == null) {
      throw { message: `document with id = ${id} not found` }
    }
    return product
  }

  async decreaseStock(id: string, amount: number) {
    const product = await Product.findById(id)
    product!.stock -= amount
    product!.save()
    return product
  }
}
