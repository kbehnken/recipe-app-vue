<template>
    <div>
        <Header />
        <div class="outer-content-container">
            <div id="recipe-card">
                <div class="flex-between">
                    <h1>
                        {{recipe.name}}
                    </h1>
                    <div>
                        <div v-on:click="handlePrint" class="float-left">
                            Print
                        </div>
                        <div class="float-left">
                            <router-link :to="`/update-recipe/${this.recipeId}`">
                                Edit
                            </router-link>
                        </div>
                        <div v-if="recipe.isFavorite" v-on:click="handleDeleteFavoriteRecipe" class="float-left">
                            Remove from favorties
                        </div>
                        <div v-else v-on:click="handleAddFavoriteRecipe" class="float-left">
                            Add to favorties
                        </div>
                    </div>
                </div>
                <div style="text-align: center;">
                    <br /><br />
                    <img v-bind:src="src" style="max-width: 100%;" />
                    <br /><br />
                </div>
                {{recipe.fromTheKitchenOf}}
                {{recipe.description}}
                {{recipe.serves}}
                {{recipe.prepTime}}
                {{recipe.cookTime}}
                <div>
                    <label>
                        INGREDIENTS
                    </label>
                </div>
                <div v-for="ingredient in recipe.ingredients" :key="ingredient._id">
                    {{ingredient.quantity}} {{ingredient.name}}
                </div>
                <div>
                    <label>
                        DIRECTIONS
                    </label>
                </div>
                <div class="directions">
                    {{recipe.directions}}
                </div>
            </div>
            <Comments v-bind:recipeId="recipeId" v-bind:comments="recipe.comments" @refresh="handleLoadRecipe" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import printjs from 'print-js';
import { authHeader } from '../helpers/authHeader';
import Header from './Header';
import Comments from './Comments';

export default {
    name: 'RecipeCard',
    props: {
        recipeId: String
    },
    components: {
        Header: Header,
        Comments: Comments
    },
    data: function () {
        return {
            recipe: {},
            src: ''
        }
    },
    mounted() {
        this.handleLoadRecipe();
        this.handleLoadPhoto();
    },
    methods: {
        handleLoadRecipe() {
            axios.get(`http://localhost:3030/api/v1/recipes/by-recipe-id/${this.recipeId}`, {headers: authHeader()})
            .then(result => {
                this.recipe = result.data;
            })
            .catch(err => {
                if (err && err.response.status === 401) {
                    this.$router.push('/login');
                    this.$vToastify.error('Your login is not valid. Please try your login again.');
                }
            })
        },
        handleLoadPhoto() {
            const url=`${process.env.VUE_APP_API_PROTOCOL}${process.env.VUE_APP_API_SERVER}:${process.env.VUE_APP_API_PORT}/api/v1/recipes/photos/${this.recipeId}`;
            
            fetch(url, {headers: authHeader()})
            .then(async res => {
                if (res.status === 200) {
                    this.src = URL.createObjectURL(await res.blob());
                    console.log(this.src)
                } else {
                    console.log(res.status)
                }
            })
            .catch(err => {
                console.log(err);
            }) 
        },
        handleAddFavoriteRecipe() {
            axios.post('http://localhost:3030/api/v1/recipes/favorites', {
                recipeId: this.recipeId
            },
            {
                headers: authHeader()
            })
            .then(() => {
                this.recipe.isFavorite = true;
            })
            .catch(err => {
                console.log(err);
                if (err && err.response.status === 401) {
                    this.$vToastify.error('Something went wrong.');
                    this.$router.push('/login');
                }
            })
        },
        handleDeleteFavoriteRecipe() {
            axios.delete('http://localhost:3030/api/v1/recipes/favorites', {
                headers: authHeader()
            },
            {
                recipeId: this.recipeId
            })
            .then(() => {
                this.recipe.isFavorite = false;
            })
            .catch(err => {
                console.log(err);
                if (err && err.response.status === 401) {
                    this.$vToastify.error('Something went wrong.');
                    this.$router.push('/login');
                }
            })
        },
        handlePrint() {
            printjs('recipe-card', 'html')
        }
    }
}
</script>