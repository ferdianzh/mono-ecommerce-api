import { Sale, ISaleRequests } from '../models/sale'
import { ProductServices } from './product.services'

const productServices = new ProductServices()

export class SaleServices {
  async addSale(attr: ISaleRequests) {
    let total = 0
    const productIds = attr.map(product => product.product_id)
    const refProducts = await productServices.getProducts(productIds)

    const products = attr.map(product => {
      const refProduct = refProducts.find(refProduct => refProduct._id == product.product_id)
      if (refProduct!.stock < product.amount) {
        throw { message: `insufficient ${refProduct!.name} stock, only ${refProduct!.stock}` }
      }
      const subtotal = refProduct!.price * product.amount
      total += subtotal

      return { ...product, subtotal }
    })

    products.forEach(async ({ product_id, amount }) => {
      await productServices.decreaseStock(product_id, amount)
    })
    
    const request = { total, products }

    const sale = Sale.build(request)
    await sale.save()
    
    return request
  }

  async getSales() {
    const sales = await Sale.find()
    return sales
  }

  async getSaleById(id: string) {
    const sale = await Sale.findById(id)
    if (sale == null) {
      throw { message: `document with id = ${id} not found` }
    }
    return sale
  }

  async deleteSaleById(id: string) {
    const sale = await Sale.findByIdAndDelete(id)
    if (sale == null) {
      throw { message: `document with id = ${id} not found` }
    }
    return sale
  }
}
