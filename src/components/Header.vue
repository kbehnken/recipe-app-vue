<template>
    <header>
        <div class="flex-between">
            <div>
                Welcome, {{username}}!
            </div>
            <div>
                <div class="float-left">
                    <VTextField outlined type="search" v-model="search" name="search" placeholder="Search all recipes" dense />
                </div>
                <v-icon medium v-on:click="handleSearch()" class="float-left">
                    mdi-magnify
                </v-icon>
            </div>
        </div>
        <Nav />
    </header>
</template>

<script>
import { getUserInfo } from '../helpers/getUserInfo';
import Nav from './Nav';

export default {
    name: 'Header',
    components: {
        Nav: Nav
    },
    data: function () {
        return {
            search: ''
        }
    },
    methods: {
        handleSearch () {
            return this.$router.push(`/search-recipes?q=${this.search}`);
        }
    },
    computed: {
        username () {
            return getUserInfo().firstName;
        }
    }
}
</script>