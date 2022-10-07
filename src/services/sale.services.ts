import { Sale, ISaleRequests } from '../models/sale'
import { getProducts, decreaseStock } from './product.services'

export async function addSale(attr: ISaleRequests) {
  let total = 0
  const productIds = attr.map(product => product.product_id)
  const refProducts = await getProducts(productIds)

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
    await decreaseStock(product_id, amount)
  })
  
  const request = { total, products }

  const sale = Sale.build(request)
  await sale.save()
  
  return request
}

export async function getSales() {
  const sales = await Sale.find()
  return sales
}

export async function getSaleById(id: string) {
  const sale = await Sale.findById(id)
  if (sale == null) {
    throw { message: `document with id = ${id} not found` }
  }
  return sale
}

export async function deleteSaleById(id: string) {
  const sale = await Sale.findByIdAndDelete(id)
  if (sale == null) {
    throw { message: `document with id = ${id} not found` }
  }
  return sale
}
