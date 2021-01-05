<template>
    <div>
        <div style='border: 1px solid #000;'>
            <h1>
                {{recipe.name}}
            </h1>
            {{recipe.description}}
        </div>
    </div>
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