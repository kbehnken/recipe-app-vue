<template>
    <div>
        <Header />
        <div>
            <h1>
                {{recipe.name}}
            </h1>
            <div v-if='recipe.isFavorite' v-on:click='handleDeleteFavoriteRecipe'>
                Remove from favorties
            </div>
            <div v-else v-on:click='handleAddFavoriteRecipe'>
                Add to favorties
            </div>
            {{recipe.fromTheKitchenOf}}
            {{recipe.description}}
            {{recipe.prepTime}}
            {{recipe.cookTime}}
            <div v-for='ingredient in recipe.ingredients' :key='ingredient._id'>
                {{ingredient.quantity}} {{ingredient.name}}
            </div>
            {{recipe.directions}}
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
            recipe: {}
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