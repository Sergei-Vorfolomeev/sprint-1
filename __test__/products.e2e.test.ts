import {app, HTTP_STATUS, RouterPaths} from "../src";

const request = require('supertest')

describe('/products', () => {

    beforeAll(async () => {
        await request(app)
            .delete(RouterPaths.__test__)
    })

    it('return status code 200 and empty array', async () => {
        await request(app)
            .get(RouterPaths.products)
            .expect(HTTP_STATUS.OK_200,[])
    })

    it('is not created product with no title', async () => {
        await request(app)
            .post(RouterPaths.products)
            .send({title: ''})
            .expect(HTTP_STATUS.BAD_REQUEST_400)

        await request(app)
            .get(RouterPaths.products)
            .expect(HTTP_STATUS.OK_200, [])
    })
    let createdProduct: any = null
    it('create new product', async () => {
       const res: Response = await request(app)
            .post(RouterPaths.products)
            .send({title: 'cucumber'})
            .expect(HTTP_STATUS.CREATED_201)

        createdProduct = res.body

        expect(createdProduct).toEqual({
            id: expect.any(Number),
            title: 'cucumber',
            quantity: 0
        })

        await request(app)
            .get(RouterPaths.products)
            .expect(HTTP_STATUS.OK_200, [createdProduct])
    })

    it('update non-existing product', async () => {
        await request(app)
            .put(`${RouterPaths.products}/9999`)
            .send({title: 'strawberry'})
            .expect(HTTP_STATUS.BAD_REQUEST_400)

        await request(app)
            .put(`${RouterPaths.products}/1`)
            .send({title: ''})
            .expect(HTTP_STATUS.BAD_REQUEST_400)

    })

    it('update product title', async () => {
        const res: Response = await request(app)
            .put(`${RouterPaths.products}/${createdProduct.id}`)
            .send({title: 'strawberry'})
            .expect(HTTP_STATUS.OK_200)

        const updatedProduct = res.body

        expect(updatedProduct).toEqual({
            ...createdProduct,
            title: 'strawberry'
        })

        await request(app)
            .get(RouterPaths.products)
            .expect(HTTP_STATUS.OK_200, [updatedProduct])
    })

    it('delete product', async () => {
        await request(app)
            .delete(`${RouterPaths.products}/${createdProduct.id}`)
            .expect(HTTP_STATUS.NO_CONTENT_204)

        await request(app)
            .get(RouterPaths.products)
            .expect(HTTP_STATUS.OK_200,[])
    })
})