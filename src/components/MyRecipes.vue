<template>
    <div>
        <Header />
        <RecipeTile v-for='recipe in recipes' v-bind:recipe='recipe' :key='recipe._id' />
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
            recipes: []
        }
    },
    mounted() {
        const ownerId = getUserInfo()._id;
        axios.get(`http://localhost:3030/api/v1/recipes/by-owner-id/${ownerId}`, {headers: authHeader()})
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