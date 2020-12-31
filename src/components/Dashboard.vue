<template>
    <div>
        <Header />
        <h1>
            Favorite Recipes
        </h1>
        <ul>
            <li v-for='recipe in recipes' :key='recipe._id'>
                {{recipe.name}}
            </li>
        </ul>
        <h1>
            Recently Added Recipes
        </h1>
        <input v-model='comment' placeholder='Enter comment' />
        <p>
            You said, {{comment}}
        </p>
    </div>
</template>

<script>
import axios from 'axios';
import { authHeader } from '../helpers/authHeader';
import Header from './Header';

export default {
    name: 'Dashboard',
    components: {
        Header: Header
    },
    props: ['username'],
    data: function () {
        return {
            recipes: [],
            comment: ''
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