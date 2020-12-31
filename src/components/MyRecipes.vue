<template>
    <div>
        <Header />
        <div v-for='recipe in recipes' :key='recipe._id'>
            <h1>
                {{recipe.name}}
            </h1>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { authHeader } from '../helpers/authHeader';
import Header from './Header';

export default {
    name: 'MyRecipes',
    components: {
        Header: Header
    },
    data: function () {
        return {
            recipes: []
        }
    },
    mounted() {
        axios.get('http://localhost:3030/api/v1/my-recipes', {headers: authHeader()})
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