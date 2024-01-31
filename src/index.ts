import express from 'express'
import {productsRouter} from "./routers/products-router";

const app = express()

const PORT = 4200

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/products', productsRouter)

app.listen(PORT, () => {
   console.log(`Example app is staring on ${PORT} port`)
})
