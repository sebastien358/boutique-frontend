import {defineStore} from "pinia";
import axios from "axios";

export const useProductStore = defineStore('productStore', {
    state: () => {
        return {
            products: [],
            cart: [],
            productsFilters: {
                title: '',
                price: 0,
                category: ''
            }
        }
    },
    actions: {
        async getProducts() {
            const filters = []
            if (this.productsFilters.title !== '') {
                filters.push(`title=${this.productsFilters.title}`)
            }

            if (this.productsFilters.price !== 0) {
                filters.push(`price=${this.productsFilters.price}`)
            }

            if (this.productsFilters.category !== '') {
                filters.push(`category=${this.productsFilters.category}`)
            }

            this.products = await axios.get(`https://127.0.0.1:8000/products${filters.length ? '?' + filters.join('&') : ''}`)
                .then(response => response.data)
                .catch(error => console.log(error))
        },
        initFiltersProducts() {
            this.productsFilters = {
                title: '',
                price: 0,
                category: ''
            }
        },
        addProductToCart(id: number) {
            const product = this.products.find(product => product.id === id)
            if (product) {
                const productToCart = this.cart.find(product => product.id === id)
                 if (productToCart) {
                     productToCart.quantity++
                 } else {
                     this.cart.push({...product, quantity: 1})
                 }
            }
        },
        totalPrice() {
            return this.cart.reduce((acc, product) => {
                return (acc + product.price) * product.quantity
            }, 0)
        },
        deleteProductToCart(id: number) {
            const product = this.cart.find(product => product.id === id)
            if (product.quantity === 1) {
                this.cart = this.cart.filter(product => product.id !== id)
            } else {
                product.quantity--
            }
        }
    }
})