<template>
    <nav>
        <router-link to='/'>
            Dashboard
        </router-link>
        <router-link to='/all-recipes'>
            Browse All Recipes
        </router-link>
        <router-link to='/add-recipe'>
            Add a New Recipe
        </router-link>
        <router-link to='/my-recipes'>
            My Recipes
        </router-link>
    </nav>
</template>

<script>

export default {
    name: 'Nav'
}
</script>