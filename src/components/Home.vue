<template>
    <div>
        <Header />
        <div class="outer-content-container">
            <h1>
                <v-icon large color="#ff0000" title="heart">
                    mdi-heart
                </v-icon> Favorite Recipes
            </h1>
            <div v-if="favoriteRecipes && favoriteRecipes.length > 0" class="flex-between-wrap">
                <RecipeTile v-for="recipe in favoriteRecipes" v-bind:recipe="recipe" :key="'favorites_' + recipe._id" />
                <div class="padding-tile" v-for="i in padding" :key="i">
                </div>
            </div>
            <div v-else class="empty">
                You have no favorite recipes to display. <router-link to="/all-recipes">Click here</router-link> to browse all recipes.
            </div>
            <div>
                <hr />
            </div>
            <h1>
                Recently Added Recipes
            </h1>
            <div class="flex-between-wrap">
                <RecipeTile v-for="recipe in recentRecipes" v-bind:recipe="recipe" :key="'recent_' + recipe._id" />
            </div>
            <div style="text-align: right">
                <router-link :to="{path: '/all-recipes/'}">
                    View All
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { authHeader } from '../helpers/authHeader';
import { getUserInfo } from '../helpers/getUserInfo';
import Header from './Header';
import RecipeTile from './RecipeTile';

export default {
    name: 'Home',
    components: {
        Header: Header,
        RecipeTile: RecipeTile
    },
    data: function () {
        return {
            recipes: [],
            favoriteRecipes: [],
            recentRecipes: [],
            comment: '',
            cols: 3
        }
    },
    computed: {
        padding() {
            if (this.favoriteRecipes.length % this.cols === 0) {
                return 0
            }
            return this.cols - (this.favoriteRecipes.length % this.cols)
        }
    },
    mounted() {
        const userId = getUserInfo()._id;

        axios.get(`${process.env.VUE_APP_API_PROTOCOL}${process.env.VUE_APP_API_SERVER}:${process.env.VUE_APP_API_PORT}/api/v1/recipes/favorites/${userId}`, {headers: authHeader()})
        .then(result => {
            this.favoriteRecipes = result.data;
        })
        .catch(err => {
            if (err && err.response.status === 401) {
                this.$router.push('/login');
                this.$vToastify.error('Your login is not valid. Please try your login again.');
            }
        })
        axios.get(`${process.env.VUE_APP_API_PROTOCOL}${process.env.VUE_APP_API_SERVER}:${process.env.VUE_APP_API_PORT}/api/v1/recipes/recent/3`, {headers: authHeader()})
        .then(result => {
            this.recentRecipes = result.data;
        })
        .catch(err => {
            if (err && err.response.status === 401) {
                this.$router.push('/login');
                this.$vToastify.error('Your login is not valid. Please try your login again.');
            }
        })
    }
}
</script>