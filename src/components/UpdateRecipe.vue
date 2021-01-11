<template>
    <div>
        <Header />
        <div class="outer-content-container">
            <VTextField outlined v-model="recipe.name" name="name" placeholder="Recipe Name" />
            <VTextField outlined v-model="recipe.fromTheKitchenOf" name="fromTheKitchenOf" placeholder="From the kitchen of" />
            <VTextField outlined v-model="recipe.description" name="description" placeholder="Description" />
            <VTextField outlined v-model="recipe.serves" name="serves" placeholder="Serves" />
            <VTextField outlined v-model="recipe.prepTime" name="prepTime" placeholder="Prep Time" />
            <VTextField outlined v-model="recipe.cookTime" name="cookTime" placeholder="Cook Time" />
            <VTextField outlined v-model="quantity" name="quantity" placeholder="Quantity" />
            <VTextField outlined v-model="ingredient" name="ingredient" placeholder="Ingredient" />
            <button v-on:click="handleAddIngredient">
                +
            </button>
            <draggable v-model="recipe.ingredients" name="draggableIngredients">
                <div v-for="(ingredient, index) in recipe.ingredients" :key="ingredient.name" style="background-color: #eee; padding: 10px;">
                    {{ingredient.quantity}} {{ingredient.name}} <span v-on:click="handleDeleteIngredient(index)">-</span>
                </div>
            </draggable>
            <VTextField outlined v-model="recipe.directions" name="directions" placeholder="Directions" />
            <div>
                <VFileInput v-model="photo"/><br /><br />
                <br /><br />
            </div>
            <div>
                <VCheckbox v-model="recipe.isShared"/>
                <label>Publish?</label>
            </div>
            <button v-on:click="handleUpdateRecipe">
                Save
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import draggable from 'vuedraggable';
import { authHeader } from '../helpers/authHeader';
import Header from './Header';

export default {
    name: 'UpdateRecipe',
    components: {
        Header: Header,
        draggable
    },
    data: function () {
        return {
            recipe: {},
            recipeId: '',
            quantity: '',
            ingredient: '',
            photo: []
        }
    },
    mounted() {
        this.recipeId = this.$route.params.recipeId;
        axios.get(`${process.env.VUE_APP_API_PROTOCOL}${process.env.VUE_APP_API_SERVER}:${process.env.VUE_APP_API_PORT}/api/v1/recipes/by-recipe-id/${this.recipeId}`, {headers: authHeader()})
        .then(result => {
            this.recipe = result.data;
        })
    },
    methods: {
        handleAddIngredient() {
            this.recipe.ingredients.push({
                quantity: this.quantity,
                name: this.ingredient
            })
            this.quantity = ''
            this.ingredient = ''
        },
        handleDeleteIngredient(index) {
            this.recipe.ingredients.splice(index, 1)
        },
        handleUpdateRecipe() {
            let formData = new FormData();
            
            formData.append('recipe', JSON.stringify( this.recipe))
            formData.append('photo', this.photo)

            axios.put(`${process.env.VUE_APP_API_PROTOCOL}${process.env.VUE_APP_API_SERVER}:${process.env.VUE_APP_API_PORT}/api/v1/recipes/${this.recipeId}`, formData, {
                headers: authHeader()
            }
            )
            .then(() => {
                this.$vToastify.success('You successfully updated your ' + this.recipe.name + ' recipe.')
                this.$router.push(`/recipe-card/${this.recipeId}`);
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
}
</script>