import {defineStore} from "pinia";
import axios from "axios";

const BASE_URL = 'https://127.0.0.1:8000'

export const useUserAdminStore = defineStore('userAdminStore',{
    state: () => {
        return {
            user: []
        }
    },
    actions: {
        async getMe() {
            try {
                const response = await axios.get(`${BASE_URL}/admin/me`, {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    }
                })
                this.user = response.data
                console.log(this.user)
            } catch (e) {
                console.log(e)
            }
        },
        isLogged() {
            return sessionStorage.getItem('token') !== null
        },
        logout() {
            return sessionStorage.removeItem('token')
        }
    }
})