<template>
    <div>
        <Header />
        <div v-for='recipe in recipes' :key='recipe._id'>
            <h1>
                {{recipe.name}}
            </h1>
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
    name: 'AllRecipes',
    components: {
        Header: Header
    },
    data: function () {
        return {
            recipes: []
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