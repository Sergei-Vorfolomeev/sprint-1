import {DBType} from "../db/products-db";
import {Router, Request, Response} from "express";
import {HTTP_STATUS} from ".././index";


export const testRouter = (db: DBType) => {
    const router = Router()

    router.delete('/', (req: Request, res: Response) => {
        db.products = []
        res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
    })

    return router
}