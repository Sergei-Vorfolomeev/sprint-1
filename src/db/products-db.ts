export const db: DBType = {
    products: [
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
}

export type ProductType = {
    id: number
    title: string
    quantity: number
}

export type DBType = {
    products: ProductType[]
}