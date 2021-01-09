<template>
    <div>
        <Header />
        <div class="outer-content-container">
            <RecipeTile v-for="recipe in queryResults" v-bind:recipe="recipe" :key="recipe._id" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { authHeader } from '../helpers/authHeader';
import Header from './Header';
import RecipeTile from './RecipeTile';

export default {
    name: 'Search',
    components: {
        Header: Header,
        RecipeTile: RecipeTile
    },
    data: function () {
        return {
            queryResults: []
        }
    },
    mounted() {
        const query = this.$route.query.q;

        axios.post('http://localhost:3030/api/v1/search-recipes', {
            query
        },
        {
            headers: authHeader()
        })
        .then(result => {
            this.queryResults = result.data;
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
</script>