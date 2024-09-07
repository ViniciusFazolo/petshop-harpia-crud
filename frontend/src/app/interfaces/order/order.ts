import { Client } from "../client/client";
import { Product } from "../product/product";

interface Product_Order {
    qt: number,
    product: Product,
    order: Order
}

export interface Order {
    id?: string,
    client: Client,
    products: Product_Order[],
    totalPrice: number
}