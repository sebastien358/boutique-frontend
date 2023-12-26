import {defineStore} from "pinia";
import axios from "axios";

export const useUserAdminStore = defineStore('userAdminStore',{
    state: () => {
        return {}
    },
    actions: {
        getMe() {
            axios.get('https://127.0.0.1:8000/admin/me', {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('token')
                }
            })
            .then(response => {
                response.data
            })
            .catch(error => console.error(error))
        },
        isLogged() {
            return sessionStorage.getItem('token') !== null
        },
        logout() {
            return sessionStorage.removeItem('token')
        }
    }
})