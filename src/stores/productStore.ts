import {defineStore} from "pinia";
import axios from "axios";

const BASE_URL = 'https://127.0.0.1:8000'

export const useProductStore = defineStore('productStore', {
    state: () => {
        return {
            products: [],
            cart: [],
            editProduct: null,
            productsFilters: {
                title: '',
                price: 0,
                category: 'all'
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

            if (this.productsFilters.category !== 'all') {
                filters.push(`category=${this.productsFilters.category}`)
            }

            this.products = await axios.get(`${BASE_URL}/products${filters.length ? '?' + filters.join('&') : ''}`)
                .then(response => response.data)
                .catch(error => console.log(error))
        },
        async getProductItem(id: number) {
            try {
                const response = await axios.get(`${BASE_URL}/product/${id}`)
                this.editProduct = response.data
            } catch(e) {
                console.log(e)
            }
        },
        initFiltersProducts() {
            this.productsFilters = {
                title: '',
                price: 0,
                category: 'all'
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