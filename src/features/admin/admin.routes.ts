import type {RouteRecordRaw} from "vue-router";
import ProductForm from "@/features/admin/views/ProductForm.vue";
import ProductLIst from "@/features/admin/views/ProductLIst.vue";
import ProductEdit from "@/features/admin/views/ProductEdit.vue";

export const ADMIN_ROUTES: RouteRecordRaw[] = [
    {path: '/admin', redirect: '/admin/product-form'},
    {name: 'admin-product-form', path: 'product-form', component: ProductForm},
    {name: 'admin-product-list', path: 'product-list', component: ProductLIst},
    {name: 'admin-product-edit', path: 'product-edit/:id', component: ProductEdit},
]