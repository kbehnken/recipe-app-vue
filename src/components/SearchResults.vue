<template>
    <div>
        <Header />
        <div class="outer-content-container">
            <div v-if="queryResults && queryResults.length > 0">
                <RecipeTile v-for="recipe in queryResults" v-bind:recipe="recipe" :key="recipe._id" />
            </div>
            <div v-else class="empty">
                There are no recipes that match your search criteria. <router-link to="/all-recipes">Click here</router-link> to browse all recipes.
            </div>
            
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

        axios.post(`${process.env.VUE_APP_API_PROTOCOL}${process.env.VUE_APP_API_SERVER}:${process.env.VUE_APP_API_PORT}/api/v1/search-recipes`, {
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