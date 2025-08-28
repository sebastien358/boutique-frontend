import type { RouteRecordRaw } from "vue-router";
import ProductForm from '@/features/admin/views/ProductForm.vue'
import ProductList from '@/features/admin/views/ProductList.vue'

export const ADMIN_ROUTES: RouteRecordRaw[] = [
  {path: '', redirect: '/productForm'},
  {path: '/productForm', component: ProductForm},
  {path: '/productForm/:id', name: 'edit', component: ProductForm},
  {path: '/productList', component: ProductList}
]