import type {ProductInterface} from "@/interfaces/Product.interface";

export interface ProductToCartInterface extends ProductInterface {
    quantity: number
}