<template>
    <header>
        <div class="flex-between">
            <div>
                Welcome, {{username}}!
            </div>
            <div>
                <div class="float-left">
                    <VTextField outlined dense type="search" v-model="search" name="search" placeholder="Search all recipes">
                        <template v-slot:append>
                            <v-icon medium v-on:click="handleSearch()" class="float-left magnify-glass" color="#00b300">
                                mdi-magnify
                            </v-icon>
                        </template>
                    </VTextField>
                </div>
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
            return this.$router.push(`/search-recipes?q=${this.search}`)
            // Prevent duplicate nav error in console when
            // performing the same search twice in a row
            .catch(() => {
                return
            });
        }
    },
    computed: {
        username () {
            return getUserInfo().firstName;
        }
    }
}
</script>