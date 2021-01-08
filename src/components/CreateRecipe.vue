<template>
    <div>
        <Header />
        <div class='outer-content-container'>
            <p style='text-align: center;'>
                Fill out the form below and click the Add button to add a new recipe to the recipe box.<br /><br />
            </p>
            <div class='form-container'>  
                <VTextField outlined v-model='recipeName' name='recipeName' placeholder='Recipe Name' />
                <VTextField outlined v-model='fromTheKitchenOf' name='fromTheKitchenOf' placeholder='From the kitchen of' />
                <VTextField outlined v-model='description' name='description' placeholder='Description' />
                <VTextField outlined v-model='serves' name='serves' placeholder='Serves' />
                <VTextField outlined v-model='prepTime' name='prepTime' placeholder='Prep Time' />
                <VTextField outlined v-model='cookTime' name='cookTime' placeholder='Cook Time' />
                <VTextField outlined v-model='quantity' name='quantity' placeholder='Quantity' />
                <VTextField outlined v-model='ingredient' name='ingredient' placeholder='Ingredient' />
                <button v-on:click='handleAddIngredient'>
                    +
                </button>
                <draggable v-model='ingredients' name='draggableIngredients'>
                    <div v-for='ingredient in ingredients' :key='ingredient.name' style='background-color: #eee; padding: 10px;'>
                        {{ingredient.quantity}} {{ingredient.name}} <span v-on:click='handleDeleteIngredient'>-</span>
                    </div>
                </draggable>
                <VTextField outlined v-model='directions' name='directions' placeholder='Directions' />
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
            recipeName: '',
            fromTheKitchenOf: '',
            description: '',
            serves: '',
            prepTime: '',
            cookTime: '',
            ingredients: [],
            quantity: '',
            ingredient: '',
            directions: '',
            isShared: false
        }
    },
    methods: {
        handleAddIngredient() {
            this.ingredients.push({
                quantity: this.quantity,
                name: this.ingredient
            })
            this.quantity = ''
            this.ingredient = ''
        },
        handleDeleteIngredient() {
            this.ingredients.splice(this.ingredient, 1)
        },
        handleAddRecipe() {
            axios.post('http://localhost:3030/api/v1/recipes', {
                name: this.recipeName,
                fromTheKitchenOf: this.fromTheKitchenOf,
                description: this.description,
                serves: this.serves,
                prepTime: this.prepTime,
                cookTime: this.cookTime,
                ingredients: this.ingredients,
                directions: this.directions,
                isShared: this.isShared
            },
            {
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