import {defineStore} from "pinia";
import axios from "axios";
import {useUserAdminStore} from "@/stores/admin/userAdminStore";
import {useMessageStore} from "@/stores/messageStore";

const BASE_URL: string = 'https://127.0.0.1:8000'

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

            try {
                const response = await axios.post(`${BASE_URL}/api/login_check`, {
                    username: this.editLogin.email,
                    password: this.editLogin.password
                })
                sessionStorage.setItem('token', response.data.token)
                messageStore.addMessage('Vous êtes connecté', 'success')
                await userAdminStore.getMe()
            } catch(e) {
                messageStore.addMessage('Identifiant ou mot de passe invalide', 'danger')
            }
        }
    }
})