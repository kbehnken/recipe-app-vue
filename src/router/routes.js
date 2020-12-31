import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../components/Dashboard.vue';
import AllRecipes from '../components/AllRecipes.vue';
import AddRecipeForm from '../components/AddRecipeForm.vue';
import MyRecipes from '../components/MyRecipes.vue';
import Login from '../components/Login.vue';
import isLoggedIn from '../helpers/isLoggedIn';

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            authRequired: true
        }
    },
    {
        path: '/all-recipes',
        name: 'allRecipes',
        component: AllRecipes,
        meta: {
            authRequired: true
        }
    },
    {
        path: '/add-recipe',
        name: 'addRecipeForm',
        component: AddRecipeForm,
        meta: {
            authRequired: true
        }
    },
    {
        path: '/my-recipes',
        name: 'myRecipes',
        component: MyRecipes,
        meta: {
            authRequired: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(rteRecord => rteRecord.meta.authRequired)) {
        if (!isLoggedIn()) {
            next({
                path: '/login'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router