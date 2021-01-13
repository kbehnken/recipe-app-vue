<template>
    
        <div class='recipe-tile'>
            <router-link :to="{path: '/recipe-card/' + recipe._id}" style="color: #424242;">
            <div>
                <router-link :to="{path: '/recipe-card/' + recipe._id}">
                    <img v-bind:src="src" style="height: 215px; maxWidth: 100%;" />
                    <h1>
                        {{truncatedRecipeName}}
                    </h1>
                </router-link>
                {{truncatedDescription}}
            </div>
            </router-link>
        </div>
    
</template>

<script>
import { authHeader } from '../helpers/authHeader';

export default {
    name: 'RecipeTile',
    props: {recipe: Object},
    data: function () {
        return {
            src: ''
        }
    },
    mounted() {
        const url=`${process.env.VUE_APP_API_PROTOCOL}${process.env.VUE_APP_API_SERVER}:${process.env.VUE_APP_API_PORT}/api/v1/recipes/photos/${this.recipe._id}`;
        
        fetch(url, {headers: authHeader()})
        .then(async res => {
            if (res.status === 200) {
                this.src = URL.createObjectURL(await res.blob());
                console.log(this.src)
            } else {
                console.log(res.status)
            }
        })
        .catch(err => {
            console.log(err);
        });  
    },
    computed: {
        truncatedRecipeName() {
            const { name } = this.recipe
            if (name.length <= 20) {
                return name;
            }
            return name.slice(0, 20) + '...';
        },
        truncatedDescription() {
            const { description } = this.recipe
            if (description.length <= 20) {
                return description;
            }
            return description.slice(0, 90) + '...';
        },
        imgSrc() {
            return this.src;
        }
    }
}
</script>