<template>
    <div>
        <nav>
            <router-link to="/">
                Dashboard
            </router-link>
            <router-link to="/all-recipes">
                Browse All Recipes
            </router-link>
            <router-link to="/add-recipe">
                Add a New Recipe
            </router-link>
            <router-link to="/my-recipes">
                My Recipes
            </router-link>
            <div class="user-icon">
                <v-icon medium v-on:click="toggleMenuVisibility()">
                    mdi-account
                </v-icon>
                <div v-if="showMenu">
                    <menu>
                        <div>
                            <router-link to="/change-password">
                                Change Password
                            </router-link>
                        </div>
                        <div v-on:click="handleLogout" class="logout">
                            Logout
                        </div>
                    </menu>
                </div>
                <div v-else></div>
            </div>
        </nav>
        <div id="hamburger-nav">
            <div class="hamburger-icon" style="width: 18px">
                <div v-on:click="toggleMenuVisibility()" style="cursor: pointer;">
                    Hamburger Menu 
                </div>
                <div v-if="showMenu">
                    <menu>
                        <div>
                            <router-link to="/">
                                Dashboard
                            </router-link>
                        </div>
                        <div>
                            <router-link to="/all-recipes">
                                Browse All Recipes
                            </router-link>
                        </div>
                        <div>
                            <router-link to="/add-recipe">
                                Add a New Recipe
                            </router-link>
                        </div>
                        <div>
                            <router-link to="/my-recipes">
                                My Recipes
                            </router-link>
                        </div>
                        <div>
                            <router-link to="/change-password">
                                Change Password
                            </router-link>
                        </div>
                        <div v-on:click="handleLogout" class="logout">
                            Logout
                        </div>
                    </menu>
                </div>
                <div v-else></div>
            </div>
        </div>
    </div>
</template>

<script>
import logout from '../helpers/logout';
import '../styles/nav.css';

export default {
    name: 'Nav',
    data: function () {
        return {
            showMenu: false,
        }
    },
    methods: {
        toggleMenuVisibility () {
            return this.showMenu = !this.showMenu;
        },
        handleLogout () {
            logout()
        }
    },
}
</script>