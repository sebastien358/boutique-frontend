import {defineStore} from "pinia";
import axios from "axios";
import {useMessageStore} from "@/stores/messageStore";

const BASE_URL: string = 'https://127.0.0.1:8000'

export const useRegistrationStore = defineStore('registrationStore', {
    state: () => {
        return {
            editRegistration: null
        }
    },
    actions: {
        async initRegistration() {
            this.editRegistration = {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirm: ''
            }
        },
        async registration() {
            const messageStore = useMessageStore()

            const formData = new FormData()
            formData.append('firstName', this.editRegistration.firstName)
            formData.append('lastName', this.editRegistration.lastName)
            formData.append('email', this.editRegistration.email)
            formData.append('password[first]', this.editRegistration.password)
            formData.append('password[second]', this.editRegistration.confirm)

            try {
                await axios.post(`${BASE_URL}/registration`, formData)
                messageStore.addMessage('Un email de confirmation d\'inscription vous a été envoyé', 'success')
            } catch(e) {
                messageStore.addMessage('Un compte existe déjà avec cet email', 'danger')
            }
        }
    }
})