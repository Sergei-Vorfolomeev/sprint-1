import {Request, Response, Router} from "express";
import {DBType} from "../db/products-db";
import {HTTP_STATUS} from "../index";

export const productsRouter = (db: DBType) => {
    const router = Router()

    router.get('/', (req: Request, res: Response) => {
        if (req.query.title) {
            const searchElement = req.query.title.toString();
            const product = db.products.filter(product => product.title.includes(searchElement))
            res.send(product)
        } else {
            res.send(db.products)
        }
    })
    router.get('/:title', (req: Request, res: Response) => {
        const title = req.params.title
        const product = db.products.find(product => product.title === title)
        if (product) {
            res.send(product)
        } else {
            res.sendStatus(404)
        }

    })
    router.delete('/:id', (req: Request, res: Response) => {
        const deletedProductId = Number(req.params.id)
        for (let i=0; i<db.products.length; i++) {
            if (db.products[i].id === deletedProductId) {
                db.products.splice(i, 1)
                res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
                return
            }
        }
        res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
    })
    router.post('/', (req: Request, res: Response) => {
        if (req.body.title) {
            const newProduct = {
                id: +Date.now(),
                title: req.body.title,
                quantity: 0,
            }
            db.products.push(newProduct)
            res.status(HTTP_STATUS.CREATED_201).send(newProduct)
        } else {
            res.sendStatus(HTTP_STATUS.BAD_REQUEST_400)
        }
    })
    router.put('/:id', (req: Request, res: Response) => {
        const productId = Number(req.params.id)
        const product = db.products.find(p => p.id === productId)
        if (product && req.body.title) {
            product.title = req.body.title
            res.status(HTTP_STATUS.OK_200).send(product)
            debugger
        } else {
            res.sendStatus(HTTP_STATUS.BAD_REQUEST_400)
        }
    })

    return router
}
