<template>
    <div>
        <Header />
        <div class="outer-content-container">
            <h1>
                Favorite Recipes
            </h1>
            <RecipeTile v-for="recipe in favoriteRecipes" v-bind:recipe="recipe" :key="'favorites_' + recipe._id" />
            <h1>
                Recently Added Recipes
            </h1>
            <RecipeTile v-for="recipe in recentRecipes" v-bind:recipe="recipe" :key="'recent_' + recipe._id" />
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
    name: 'Dashboard',
    components: {
        Header: Header,
        RecipeTile: RecipeTile
    },
    props: ['username'],
    data: function () {
        return {
            recipes: [],
            favoriteRecipes: [],
            recentRecipes: [],
            comment: ''
        }
    },
    mounted() {
        const userId = getUserInfo()._id;

        axios.get(`http://localhost:3030/api/v1/recipes/favorites/${userId}`, {headers: authHeader()})
        .then(result => {
            this.favoriteRecipes = result.data;
        })
        .catch(err => {
            if (err && err.response.status === 401) {
                this.$router.push('/login');
                this.$vToastify.error('Your login is not valid. Please try your login again.');
            }
        })
        axios.get('http://localhost:3030/api/v1/recipes/recent/3', {headers: authHeader()})
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