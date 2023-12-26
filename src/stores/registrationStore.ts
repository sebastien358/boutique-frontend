import {defineStore} from "pinia";
import axios from "axios";

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
            const formData = new FormData()
            formData.append('firstName', this.editRegistration.firstName)
            formData.append('lastName', this.editRegistration.lastName)
            formData.append('email', this.editRegistration.email)
            formData.append('password[first]', this.editRegistration.password)
            formData.append('password[second]', this.editRegistration.confirm)

            await axios.post('https://127.0.0.1:8000/registration', formData)
                .then(response => response.data)
                .catch(error => console.error(error))
        }
    }
})