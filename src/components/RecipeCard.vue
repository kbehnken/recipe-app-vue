<template>
    <div>
        <Header />
        <div class="outer-content-container">
            <div id="recipe-card">
                <div class="flex-between">
                    <h1>
                        {{recipe.name}}
                    </h1>
                    <div style="width: 72px;">
                        <v-icon medium v-on:click="handlePrint" class="float-left" title="Print recipe">
                            mdi-printer
                        </v-icon>
                        <div v-if="recipe.ownerId === userId">
                        <router-link :to="`/update-recipe/${this.recipeId}`">
                            <v-icon class="float-left" title="Edit recipe">
                                mdi-pencil
                            </v-icon>
                        </router-link>
                        </div>
                        <v-icon medium v-if="recipe.isFavorite" v-on:click="handleDeleteFavoriteRecipe" color="#ff0000" class="float-left" title="Remove from favorites">
                            mdi-heart
                        </v-icon>
                        <v-icon v-else v-on:click="handleAddFavoriteRecipe" class="float-left" color="#ff0000" title="Love this recipe? Click to add it to your favorites!">
                            mdi-heart-outline
                        </v-icon>
                    </div>
                </div>
                <div v-if="!recipe.fromTheKitchenOf">
                    
                </div>
                <div v-else>
                    From the kitchen of, {{recipe.fromTheKitchenOf}}
                </div>
                <div style="text-align: center;">
                    <br /><br />
                    <img v-bind:src="src" style="max-width: 100%;" />
                    <br /><br />
                </div>
                <div style="text-align: center;">
                    {{recipe.description}}
                    <br /><br />
                </div>
                <div class="float-left time-to-eat">
                    <div>
                        <label>
                            SERVES
                        </label>
                    </div>
                    <div>
                        {{recipe.serves}}
                        <br /><br />
                    </div>
                    <div>
                        <label>
                            PREP TIME
                        </label>
                    </div>
                    <div>
                        {{recipe.prepTime}}
                        <br /><br />
                    </div>
                    <div>
                        <label>
                            COOK TIME
                        </label>
                    </div>
                    <div>
                        {{recipe.cookTime}}
                        <br /><br />
                    </div>
                </div>
                <div class="ingredient-list">
                    <div>
                        <label>
                            INGREDIENTS
                        </label>
                    </div>
                    <div v-for="ingredient in recipe.ingredients" :key="ingredient._id">
                        {{ingredient.quantity}} {{ingredient.name}}<br /><br />
                    </div>
                </div>
                <div style="clear: both; text-align: center;">
                    <label>
                        DIRECTIONS
                    </label>
                </div>
                <div class="directions" style="text-align: justify;">
                    {{recipe.directions}}
                </div>
                <hr />
                <Comments v-bind:recipeId="recipeId" v-bind:comments="recipe.comments" @refresh="handleLoadRecipe" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import printjs from 'print-js';
import { authHeader } from '../helpers/authHeader';
import { getUserInfo } from '../helpers/getUserInfo';
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
            recipe: {comments: []},
            src: ''
        }
    },
    computed: {
        userId() {
            return getUserInfo()._id; 
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
                headers: authHeader(),
                data: {
                    recipeId: this.recipeId
                }
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