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
                <div>
                    {{recipe.directions}}
                </div>
            </div>
            <h1>
                Comments
            </h1>
            <div v-if="recipe.comments.length">
                <div v-for="comment in recipe.comments" :key="comment._id">
                    Posted by {{comment.owner.firstName}} {{comment.owner.lastName}} on {{comment.createdAt}}<br /><br />
                    {{comment.comment}}
                </div>
            </div>
            <div v-else>
                There are currently no comments to display for this recipe. Click here to add one!
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { authHeader } from '../helpers/authHeader';
import Header from './Header';

export default {
    name: 'RecipeCard',
    props: ['recipeId'],
    components: {
        Header: Header
    },
    data: function () {
        return {
            recipe: {},
            src: ''
        }
    },
    mounted() {
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
    methods: {
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
        }
    }
}
</script>