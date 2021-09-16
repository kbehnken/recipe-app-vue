<template>
    <div>
        <Header />
        <div class="outer-content-container">
            <div v-if="recipes && recipes.length > 0" class="flex-between-wrap">
                <RecipeTile v-for="recipe in recipes" v-bind:recipe="recipe" :key="recipe._id" />
                <div class="padding-tile" v-for="i in padding" :key="i">
                    
                </div>
            </div>
            <div v-else class="empty">
                There are no published recipes to display. <router-link to="/add-recipe">Click here</router-link> to here to add one.
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { authHeader } from '../helpers/authHeader';
import Header from './Header';
import RecipeTile from './RecipeTile';

export default {
    name: 'AllRecipes',
    components: {
        Header: Header,
        RecipeTile: RecipeTile
    },
    data: function () {
        return {
            recipes: [],
            cols: 3
        }
    },
    computed: {
        padding() {
            if (this.recipes.length % this.cols === 0) {
                return 0
            }
            return this.cols - (this.recipes.length % this.cols)
        }
    },
    mounted() {
        axios.get('http://localhost:3030/api/v1/recipes', {headers: authHeader()})
        .then(result => {
            this.recipes = result.data;
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