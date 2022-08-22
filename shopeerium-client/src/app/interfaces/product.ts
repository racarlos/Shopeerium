export interface Product {
    productId: number,
    sellerUsername: string,
    title: string,
    imgUrl: string,
    price: number,
    stock: number,
    amountSold: number,
    categories: JSON[],
    description: string,
    quantity: number
}