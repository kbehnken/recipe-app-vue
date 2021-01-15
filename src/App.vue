<template>
  <v-main>
    <router-view :key="$route.fullPath" />
  </v-main>
</template>

<script>
import './styles/main.css'
 
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
