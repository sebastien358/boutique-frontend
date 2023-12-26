import {createRouter, createWebHistory} from "vue-router";
import Admin from "@/features/admin/Admin.vue";
import Boutique from "@/features/boutique/Boutique.vue";
import Login from "@/components/login/views/Login.vue";
import Registration from "@/components/registration/views/Registration.vue";
import {useUserAdminStore} from "@/stores/admin/userAdminStore";
import RequestPassword from "@/components/resetPassword/views/RequestPassword.vue";
import ResetPassword from "@/components/resetPassword/views/ResetPassword.vue";
import {ADMIN_ROUTES} from "@/features/admin/admin.routes";
import ProductForm from "@/features/admin/views/ProductForm.vue";
import ProductLIst from "@/features/admin/views/ProductLIst.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/boutique'},
        {name: 'boutique', path: '/boutique', component: Boutique},
        {name: 'login', path: '/login', component: Login},
        {name: 'registration', path: '/registration', component: Registration},
        {name: 'request-password', path: '/request-password', component: RequestPassword},
        {name: 'reset-password', path: '/reset-password/:token', component: ResetPassword},
        {name: 'admin', path: '/admin', meta: {isAuthenticated: true}, component: Admin, children: ADMIN_ROUTES},
    ]
})

// GOOD
router.beforeEach((to, from, next) => {
    const userAdminStore = useUserAdminStore()
    if (to.meta.isAuthenticated && !userAdminStore.isLogged()) next({ name: 'login' })
    else next()
})