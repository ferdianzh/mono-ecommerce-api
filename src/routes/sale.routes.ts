import express, { Request, Response } from 'express'
import { SaleServices } from '../services/sale.services'
import { ProductServices } from '../services/product.services'

const router = express.Router()
const saleServices = new SaleServices()
const productServices = new ProductServices()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { products } = req.body
    const sale = await saleServices.addSale(products)

    return res.status(201).send({
      status: 'success',
      data: sale,
    })
  } catch (e: any) {
    return res.status(422).send({
      status: 'fail',
      message: e.message,
    })
  }
})

router.get('/', async (req: Request, res: Response) => {
  const sales = await saleServices.getSales()

  return res.status(200).send({
    status: 'success',
    data: sales,
  })
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const sale = await saleServices.getSaleById(req.params.id)

    return res.status(200).send({
      status: 'success',
      data: sale,
    })
  } catch (e: any) {
    return res.status(404).send({
      status: 'fail',
      message: e.message
    })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const sale = await saleServices.deleteSaleById(req.params.id)
    
    return res.status(200).send({
      status: 'success',
      data: sale,
    })
  } catch (e: any) {
    return res.status(404).send({
      status: 'fail',
      message: e.message,
    })
  }
})

export { router as saleRouter }