<template>
    <div>
        <Header />
        <div class='outer-content-container'>
            <p style='text-align: center;'>
                Fill out the form below and click the Add button to add a new recipe to the recipe box.<br /><br />
            </p>
            <div class='form-container'>  
                <VTextField outlined v-model='recipe.name' name='name' placeholder='Recipe Name' />
                <VTextField outlined v-model='recipe.fromTheKitchenOf' name='fromTheKitchenOf' placeholder='From the kitchen of' />
                <VTextField outlined v-model='recipe.description' name='description' placeholder='Description' />
                <VTextField outlined v-model='recipe.serves' name='serves' placeholder='Serves' />
                <VTextField outlined v-model='recipe.prepTime' name='prepTime' placeholder='Prep Time' />
                <VTextField outlined v-model='recipe.cookTime' name='cookTime' placeholder='Cook Time' />
                <VTextField outlined v-model='quantity' name='quantity' placeholder='Quantity' />
                <VTextField outlined v-model='ingredient' name='ingredient' placeholder='Ingredient' />
                <button v-on:click='handleAddIngredient'>
                    +
                </button>
                <draggable v-model='recipe.ingredients' name='draggableIngredients'>
                    <div v-for='(ingredient, index) in recipe.ingredients' :key='ingredient.name' style='background-color: #eee; padding: 10px;'>
                        {{ingredient.quantity}} {{ingredient.name}} <span v-on:click='handleDeleteIngredient(index)'>-</span>
                    </div>
                </draggable>
                <VTextField outlined v-model='recipe.directions' name='directions' placeholder='Directions' />
                <div>
                    <label>Upload Photo:</label><br />
                    <span className='fine-print'>
                        (.jpg, .gif, .png)<br />
                    </span>
                </div>
                <div>
                    <VFileInput v-model="photo" name='photo' /><br /><br />
                    <br /><br />
                </div>
                <div>
                    <VCheckbox v-model="recipe.isShared" />
                    <label>Publish?</label>
                </div>
                <button v-on:click='handleAddRecipe()'>
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import draggable from 'vuedraggable';
import { authHeader } from '../helpers/authHeader';
import Header from './Header';

export default {
    name: 'CreateRecipe',
    components: {
        Header: Header,
        draggable
    },
    data: function () {
        return {
            recipe: { 
                name: '',
                fromTheKitchenOf: '',
                description: '',
                serves: '',
                prepTime: '',
                cookTime: '',
                ingredients: [],
                directions: '',
                isShared: false
            },
            recipeId: '',
            quantity: '',
            ingredient: '',
            photo: []
        }
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
        handleAddRecipe() {
            let formData = new FormData();
            console.log(this.recipe)

            formData.append('recipe', JSON.stringify(this.recipe))
            formData.append('photo', this.photo)

            axios.post(`${process.env.VUE_APP_API_PROTOCOL}${process.env.VUE_APP_API_SERVER}:${process.env.VUE_APP_API_PORT}/api/v1/recipes`, formData, {
                headers: authHeader()
            }
            )
            .then(() => {
                this.$vToastify.success('You successfully added ' + this.recipeName + ' to the Recipe Box.')
                this.$router.push('/');
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

<style>
    button {
        font-size: 14pt;
        color: #fff;
        background-color: #00b300;
        width: 50%;
        height: 60px;
        border: 1px solid #81FF81;
        border-radius: 5px;
        margin-top: 10px;
        padding: 5px;
    }

    button:hover {
        background-color: #009800;
        cursor: pointer;
    }
</style>