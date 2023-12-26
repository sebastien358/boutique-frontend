import {defineStore} from "pinia";
import axios from "axios";
import {useUserAdminStore} from "@/stores/admin/userAdminStore";
import {useMessageStore} from "@/stores/messageStore";

export const useLoginStore = defineStore('loginStore',{
    state: () => {
        return {
            editLogin: null
        }
    },
    actions: {
        initLogin() {
            this.editLogin = {
                email: '',
                password: ''
            }
        },
        async login() {
            const messageStore = useMessageStore()
            const userAdminStore= useUserAdminStore()
            await axios.post('https://127.0.0.1:8000/api/login_check', {
                username: this.editLogin.email,
                password: this.editLogin.password
            })
            .then(response => {
                sessionStorage.setItem('token', response.data.token)
                messageStore.addMessage('Vous êtes connecté', 'success')
                userAdminStore.getMe()
            })
            .catch(error => {
                messageStore.addMessage('Identifiant ou mot de passe invalide', 'danger')
                console.error(error)
            })
        }
    }
})