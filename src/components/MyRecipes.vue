<template>
    <div>
        <Header />
        <div class="outer-content-container">
            <div>
                <h1>
                    Published
                </h1>
                <div v-if="sharedRecipes && sharedRecipes.length > 0" class="flex-between flex-wrap">
                    <RecipeTile v-for="recipe in sharedRecipes" v-bind:recipe="recipe" :key="recipe._id" />
                    <div class="padding-tile" v-for="i in padding" :key="i">
                    </div>
                </div>
                <div v-else class="empty">
                    You have not contributed any recipes to the recipe box. <router-link to="/add-recipe">Click here</router-link> to add a recipe.
                </div>
            </div>
            <div>
                <h1>
                    Drafts
                </h1>
                <div v-if="draftRecipes && draftRecipes.length > 0" class="flex-between flex-wrap">
                    <RecipeTile v-for="recipe in draftRecipes" v-bind:recipe="recipe" :key="recipe._id" />
                    <div class="padding-tile" v-for="i in padding" :key="i">
                        
                    </div>
                </div>
                <div v-else class="empty">
                    You do not have any unpublished recipes to display. <router-link to="/add-recipe">Click here</router-link> to add a recipe.
                </div>
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
    name: 'MyRecipes',
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
        sharedRecipes() {
            return this.recipes.filter(recipe => recipe.isShared)
        },
        draftRecipes() {
            return this.recipes.filter(recipe => !recipe.isShared)
        },
        padding() {
            if (this.recipes.length % this.cols === 0) {
                return 0
            }
            return this.cols - (this.recipes.length % this.cols)
        }
    },
    mounted() {
        const ownerId = getUserInfo()._id;
        axios.get(`${process.env.VUE_APP_API_PROTOCOL}${process.env.VUE_APP_API_SERVER}:${process.env.VUE_APP_API_PORT}/api/v1/recipes/by-owner-id/${ownerId}`, {headers: authHeader()})
        .then(result => {
            this.recipes = result.data;
        })
        .catch(err => {
            console.log(err)
            if (err && err.response.status === 401) {
                this.$router.push('/login');
                this.$vToastify.error('Your login is not valid. Please try your login again.');
            }
        })
    }
}
</script>