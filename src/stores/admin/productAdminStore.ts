import {defineStore} from "pinia";
import axios from "axios";
import {useMessageStore} from "@/stores/messageStore";

const BASE_URL: string = 'https://127.0.0.1:8000'

export const useProductAdminStore = defineStore('productAdminStore', {
    state: () => {
        return {
            products: [],
            editProduct: null,
            productFilter: {
                title: '',
            }
        }
    },
    actions: {
        async getProducts() {
            const filters = []
            if (this.productFilter.title !== '') {
                filters.push(`title=${this.productFilter.title}`)
            }
            this.products = await axios.get(`${BASE_URL}/admin/products${filters.length ? '?' + filters.join('&') : ''}`, {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            .then(response => response.data)
            .catch(error => console.error(error))
        },
        initFilterProduct() {
            this.productFilter = {
                title: ''
            }
        },
        async getProductItem(id: string) {
            this.editProduct = await axios.get(`${BASE_URL}/admin/product/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            .then(response => response.data)
            .catch(error => console.error(error))
        },
        initProduct() {
            this.editProduct = {
                title: '',
                description: '',
                price: '',
                category: '',
                pictures: []
            }
        },
        async addProduct(pictures) {
            const messageStore = useMessageStore()

            const formData = new FormData()
            formData.append('title', this.editProduct.title)
            formData.append('description', this.editProduct.description)
            formData.append('price', this.editProduct.price)
            formData.append('category', this.editProduct.category)

            for (let i = 0; i < pictures.length; i++) {
                formData.append(`pictures_${i}`, pictures[i])
            }
            await axios.post(`${BASE_URL}/admin/new-product`, formData, {
                'Content-type': 'multipart/form-data',
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            .then(response => {
                messageStore.addMessage('L\'article a bien été ajouté', 'success')
                this.initProduct()
                console.log(response.data)
            })
            .catch(error => {
                messageStore.addMessage('L\'article n\'a pas pu être ajouté', 'danger')
                console.log(error)
            })

            await this.getProducts()
        },
        async updateProduct(pictures) {
            const messageStore = useMessageStore()

            const formData = new FormData()
            formData.append('title', this.editProduct.title)
            formData.append('description', this.editProduct.description)
            formData.append('price', this.editProduct.price)
            formData.append('category', this.editProduct.category)

            for (let i = 0; i < pictures.length; i++) {
                formData.append(`pictures_${i}`, pictures[i])
            }

            try {
                const response = await axios.post(`${BASE_URL}/admin/edit-product/${this.editProduct.id}`, formData, {
                    'Content-type': 'multipart/form-data',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    }
                })
                this.editProduct.pictures = response.data.pictures
                messageStore.addMessage('L\'article a bien été modifié', 'success')
            } catch(e) {
                messageStore.addMessage('L\'article n\'a pas pu être modifié', 'danger')
                console.error(e)
            }

            await this.getProducts()
        },
        async deleteProduct(id: number) {
            const messageStore = useMessageStore()
            try {
                await axios.delete(`${BASE_URL}/admin/delete-product/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    }
                })
                messageStore.addMessage('L\'article a bien été supprimé', 'success')
            } catch(e) {
                messageStore.addMessage('L\'article n\'a pas pu être supprimé', 'danger')
                console.error(e)
            }

            await this.getProducts()
        },
        async deletePicture(id: number) {
            const messageStore = useMessageStore()
            try {
                await axios.delete(`${BASE_URL}/admin/delete-picture/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    }
                })
                this.editProduct.pictures = this.editProduct.pictures.filter(picture => picture.id !== id)
                messageStore.addMessage('L\'image a bien été supprimée', 'success')
            } catch(e) {
                messageStore.addMessage('L\'image n\'a pas pu être supprimée', 'danger')
                console.error(e)
            }

            await this.getProducts()
        }
    }
})