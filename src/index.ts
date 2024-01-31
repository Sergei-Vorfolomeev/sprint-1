import express from 'express'
import {productsRouter} from "./routers/products-router";
import {testRouter} from "./routers/test-router";
import {db} from "./db/products-db";

export const app = express()

const PORT = 4200

export const HTTP_STATUS = {
   OK_200: 200,
   CREATED_201: 201,
   NO_CONTENT_204: 204,
   BAD_REQUEST_400: 400,
   NOT_FOUND_404: 404,
}

export const RouterPaths = {
   products: '/products',
   __test__: '/__test__'
}

//app.use(express.urlencoded({ extended: true }));
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware);

app.use(RouterPaths.products, productsRouter(db))
app.use(RouterPaths.__test__, testRouter(db))

app.listen(PORT, () => {
   console.log(`Example app is staring on ${PORT} port`)
})
