import express, { Request, Response } from 'express'
import { Error } from 'mongoose'
import {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from '../services/product.services'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description = '', price, stock } = req.body
    const product = await addProduct({
      name, description, price, stock
    })

    return res.status(201).send({
      status: 'success',
      data: product,
    })
  } catch (e: any) {
    if (e instanceof Error.ValidationError) {
      return res.status(422).send({
        status: 'fail',
        message: e.message,
      })
    }

    return res.status(500).send({
      status: 'fail',
      message: e.message,
    })
  }
})

router.get('/', async (req: Request, res: Response) => {
  const products = await getProducts()
  return res.status(200).send(products)
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await getProductById(req.params.id)
    
    return res.status(200).send({
      status: 'success',
      data: product,
    })
  } catch (e: any) {
    return res.status(404).send({
      status: 'fail',
      message: `document with id = ${req.params.id} not found`,
    })
  }
})

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const product = await updateProductById(req.params.id, req.body)
    
    return res.status(200).send({
      status: 'success',
      data: product,
    })
  } catch (e: any) {
    return res.status(404).send({
      status: 'fail',
      message: e.message,
    })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const product = await deleteProductById(req.params.id)
    
    return res.status(200).send({
      status: 'success',
      data: product,
    })
  } catch (e: any) {
    return res.status(404).send({
      status: 'fail',
      message: e.message,
    })
  }
})

export { router as productRouter }
