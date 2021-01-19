import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import AllRecipes from '../components/AllRecipes.vue';
import CreateRecipe from '../components/CreateRecipe.vue';
import UpdateRecipe from '../components/UpdateRecipe.vue';
import MyRecipes from '../components/MyRecipes.vue';
import RecipeCard from '../components/RecipeCard.vue';
import ChangePassword from '../components/ChangePassword.vue';
import SearchResults from '../components/SearchResults.vue';
import Login from '../components/Login.vue';
import isLoggedIn from '../helpers/isLoggedIn';

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            authRequired: true
        }
    },
    {
        path: '/all-recipes',
        name: 'AllRecipes',
        component: AllRecipes,
        meta: {
            authRequired: true
        }
    },
    {
        path: '/add-recipe',
        name: 'CreateRecipe',
        component: CreateRecipe,
        meta: {
            authRequired: true
        }
    },
    {
        path: '/update-recipe/:recipeId',
        name: 'UpdateRecipe',
        component: UpdateRecipe,
        meta: {
            authRequired: true
        }
    },
    {
        path: '/my-recipes',
        name: 'MyRecipes',
        component: MyRecipes,
        meta: {
            authRequired: true
        }
    },
    {
        path: '/recipe-card/:recipeId',
        name: 'RecipeCard',
        props: true,
        component: RecipeCard,
        meta: {
            authRequired: true
        }
    },
    {
        path: '/change-password',
        name: 'ChangePassword',
        component: ChangePassword,
        meta: {
            authRequired: true
        }
    },
    {
        path: '/search-recipes',
        name: 'SearchResults',
        component: SearchResults,
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