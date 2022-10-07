import express, { Request, Response } from 'express'
import { addSale, getSales, getSaleById, deleteSaleById } from '../services/sale.services'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { products } = req.body
    const sale = await addSale(products)

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
  const sales = await getSales()

  return res.status(200).send({
    status: 'success',
    data: sales,
  })
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const sale = await getSaleById(req.params.id)

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
    const sale = await deleteSaleById(req.params.id)
    
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