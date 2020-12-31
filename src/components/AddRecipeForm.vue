<template>
    <div>
        <Header />
        <input v-model='recipeName' name='recipeName' placeholder='Recipe name' />
        <input v-model='prepTime' name='prepTime' placeholder='Prep Time' />
        <input v-model='cookTime' name='cookTime' placeholder='Cook Time' />
        <input v-model='directions' name='directions' placeholder='Directions' />
    </div>
</template>

<script>
import axios from 'axios';
import Header from './Header';
import { authHeader } from '../helpers/authHeader';

export default {
    name: 'AddRecipeForm',
    components: {
        Header: Header
    },
    data: function () {
        return {
            recipeName: '',
            prepTime: '',
            cookTime: '',
            directions: ''
        }
    },
    methods: {
        handleAddRecipe() {
            axios.post('http://localhost:3030/api/v1/recipes', {headers: authHeader}, {
                recipeName: this.recipeName,
                prepTime: this.prepTime,
                cookTime: this.cookTime,
                directions: this.directions
            })
            .then(() => {
                this.$vToastify.success('You successfully added ' + this.recipeName + ' to the Recipe Box.')
                this.$router.push('/');
            })
            .catch(err => {
                console.log(err);
                this.$vToastify.error('Something went wrong.');
            })
        }
    }
}
</script>