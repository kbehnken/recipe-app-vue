<template>
    <div>
        <nav>
            <router-link to="/">
                <v-icon medium color="#00b300">
                    mdi-home
                </v-icon>
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
                <v-icon medium v-on:click="toggleMenuVisibility()" color="#00b300">
                    mdi-account
                </v-icon>
                <div v-if="showMenu">
                    <menu>
                        <div v-on:click="permissionsCheck" class="menu-link">
                            Change Password
                        </div>
                        <div v-on:click="handleLogout" class="menu-link">
                            Logout
                        </div>
                    </menu>
                </div>
                <div v-else></div>
            </div>
        </nav>
        <div id="hamburger-nav">
            <div class="hamburger-icon" style="width: 18px">
                <v-icon medium v-on:click="toggleMenuVisibility()" color="#00b300">
                    mdi-menu
                </v-icon>
                <div v-if="showMenu">
                    <menu>
                        <div>
                            <router-link to="/">
                                Home
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
                        <div v-on:click="permissionsCheck" class="menu-link">
                            Change Password
                        </div>
                        <div v-on:click="handleLogout" class="menu-link">
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
import { getUserInfo } from '../helpers/getUserInfo';
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
        },
        permissionsCheck() {
            const userName = getUserInfo().email;
            if (userName === 'guest@recipe-box.com') {
                this.$vToastify.error('The Guest user is not allowed to change their password.');
            } else {
                this.$router.push('/change-password');
            }
        }
    },
}
</script>