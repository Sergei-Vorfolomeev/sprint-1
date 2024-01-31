import {Request, Response, Router} from "express";

const PRODUCTS = [
    {
        id: 1,
        title: 'tomato',
        quantity: 150,
    },
    {
        id: 2,
        title: 'orange',
        quantity: 230,
    }
]

export const productsRouter = Router()

productsRouter.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        const searchElement = req.query.title.toString();
        const product = PRODUCTS.filter(product => product.title.includes(searchElement))
        res.send(product)
    } else {
        res.send(PRODUCTS)
    }
})
productsRouter.get('/products/:title', (req: Request, res: Response) => {
    const title = req.params.title
    const product = PRODUCTS.find(product => product.title === title)
    if (product) {
        res.send(product)
    } else {
        res.sendStatus(404)
    }

})

productsRouter.delete('/products:id', (req: Request, res: Response) => {
    const deletedProductId = Number(req.query.id)
    for (let i=0; i<PRODUCTS.length; i++) {
        if (PRODUCTS[i].id === deletedProductId) {
            PRODUCTS.splice(deletedProductId, 1)
            res.sendStatus(204)
            return
        }
    }
    res.sendStatus(404)
})

productsRouter.post('/products', (req: Request, res: Response) => {
    const newProduct = {
        id: +Date.now(),
        title: req.body.title,
        quantity: 0,
    }
    PRODUCTS.push(newProduct)
    res.status(201).send(newProduct)
})

productsRouter.put('/products:id', (req: Request, res: Response) => {
    const productId = Number(req.params.id)
    const product = PRODUCTS.find(p => p.id === productId)
    if (product) {
        product.title = req.body.title
        res.status(200).send(product)
    } else {
        res.sendStatus(404)
    }
})