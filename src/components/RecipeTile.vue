<template>
    <router-link :to="{path: '/recipe-card/' + recipe._id}">
        <div class='recipe-tile'>
            <div>
                <router-link :to="{path: '/recipe-card/' + recipe._id}">
                    <h1>
                        {{recipe.name}}
                    </h1>
                </router-link>
                {{recipe.description}}
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'RecipeTile',
    props: {recipe: Object},
    methods: {
        truncateRecipeName(recipeName) {
            if (recipeName.length <= 20) {
                return recipeName;
            }
            return recipeName.slice(0, 20) + '...';
        },
    }
}
</script>