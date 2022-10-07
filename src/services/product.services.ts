import { Product, IProduct } from '../models/product'

export async function addProduct(attr: IProduct) {
  const product = Product.build(attr)
  await product.save()
  return product
}

export async function getProducts(ids: string[] = []) {
  let products
  if (ids.length == 0) {
    products = await Product.find()
  } else {
    products = await Product.find({ '_id': { $in: ids } })
  }
  return products
}

export async function getProductById(id: string) {
  const product = await Product.findById(id)
  if (product == null) {
    throw { message: `document with id = ${id} not found` }
  }
  return product
}

export async function updateProductById(id: string, attr: IProduct) {
  const product = await Product.findByIdAndUpdate(id, attr, { new: true })
  if (product == null) {
    throw { message: `document with id = ${id} not found` }
  }
  return product
}

export async function deleteProductById(id: string) {
  const product = await Product.findByIdAndDelete(id)
  if (product == null) {
    throw { message: `document with id = ${id} not found` }
  }
  return product
}

export async function decreaseStock(id: string, amount: number) {
  const product = await Product.findById(id)
  product!.stock -= amount
  product!.save()
  return product
}
