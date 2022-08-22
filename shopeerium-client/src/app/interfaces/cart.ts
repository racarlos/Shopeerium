export interface Cart{ 
    username: string,
    productId: number,
    sellerUsername: string,
    title: string,
    imgUrl: string,
    price: number,
    stock: number,
    quantity: number,
    isChecked: boolean
}