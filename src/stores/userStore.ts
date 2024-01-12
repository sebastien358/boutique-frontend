import {defineStore} from "pinia";
import axios from "axios";
import {useMessageStore} from "@/stores/messageStore";

const BASE_URL: string = 'https://127.0.0.1:8000'

export const useUserStore = defineStore('userStore',{
    state: () => {
        return {}
    },
    actions: {
        async requestPassword(email: string) {
            const messageStore = useMessageStore()

            const formData  = new FormData()
            formData.append('email', email)

            try {
                await axios.post(`${BASE_URL}/request/reset-password`, formData)
                messageStore.addMessage('Un email de réinitialisation de mot de passe vous a été envoyé', 'success')
            } catch(e) {
                messageStore.addMessage('Aucun compte ne correspond à cet email', 'danger')
            }
        },
        async resetPassword(token: string, password: string, confirm: string) {
            const messageStore = useMessageStore()

            const formData  = new FormData()
            formData.append('password[first]', password)
            formData.append('password[second]', confirm)

            try {
                await axios.post(`${BASE_URL}/reset-password/${token}`, formData)
                messageStore.addMessage('Le mot de passe a bien été modifié', 'success')
            } catch(e) {
                messageStore.addMessage('Veuillez refaire une demande de réinitialisation de mot de passe', 'danger')
            }
        }
    }
})