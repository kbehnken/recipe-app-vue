<template>
    <div>
        <nav>
            <router-link to='/'>
                Dashboard
            </router-link>
            <router-link to='/all-recipes'>
                Browse All Recipes
            </router-link>
            <router-link to='/add-recipe'>
                Add a New Recipe
            </router-link>
            <router-link to='/my-recipes'>
                My Recipes
            </router-link>
            <div class='user-icon'>
                <div v-on:click='toggleMenuVisibility()' style='cursor: pointer;'>
                    User Menu
                </div>
                <div v-if='showMenu'>
                    <menu>
                        <div>
                            <router-link to='/change-password'>
                                Change Password
                            </router-link>
                        </div>
                        <div>
                            <router-link to='/logout'>
                                Logout
                            </router-link>
                        </div>
                    </menu>
                </div>
                <div v-else></div>
            </div>
        </nav>
        <div id='hamburger-nav'>
            <div class='hamburger-icon' style='width: 18px'>
                <div v-on:click='toggleMenuVisibility()' style='cursor: pointer;'>
                    Hamburger Menu 
                </div>
                    <div v-if='showMenu'>
                        <menu>
                            <div>
                                <router-link to='/'>
                                    Dashboard
                                </router-link>
                            </div>
                            <div>
                                <router-link to='/all-recipes'>
                                    Browse All Recipes
                                </router-link>
                            </div>
                            <div>
                                <router-link to='/add-recipe'>
                                    Add a New Recipe
                                </router-link>
                            </div>
                            <div>
                                <router-link to='/my-recipes'>
                                    My Recipes
                                </router-link>
                            </div>
                            <div>
                                <router-link to='/change-password'>
                                    Change Password
                                </router-link>
                            </div>
                            <div>
                                <router-link to='/logout'>
                                    Logout
                                </router-link>
                            </div>
                        </menu>
                    </div>
                    <div v-else></div>
                </div>
            </div>
        </div>
</template>

<script>

export default {
    name: 'Nav',
    data: function () {
        return {
            showMenu: false
        }
    },
    methods: {
        toggleMenuVisibility () {
            return this.showMenu = !this.showMenu;
        }
    }
}
</script>

<style>
    a {
        color: #00b300;
        text-decoration: none;
    }

    a:hover {
        color: #009800;
    }

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

    nav {
        width: 100%;
        height: 75px;
        background-color: #fff;
        -webkit-box-shadow: 0px 0px 10px #888;
        -moz-box-shadow: 0px 0px 10px #888;
        box-shadow: 0px 0px 10px #888;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        z-index: 1000;
        position: fixed;
        top: 0px;
    }
    
    menu {
        min-width: 160px;
        background-color: #fff;
        display: none;
        position: absolute;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 900;
    }

    menu a {
        color: #fff;
        background-color: #00b300;
        display: block;
        padding: 10px 15px;
    }

    menu div a:hover {
        color: #fff;
        background-color: #009800;
    }

    .user-icon, .hamburger-icon {
        color: #00b300;
        overflow: hidden;
    }

    .user-icon:hover, .hamburger-icon:hover {
        color: #009800;
    }

    .hamburger-icon {
        display: none;
    }

    .user-icon:hover menu, .hamburger-icon:hover menu {
        display: block;
    }

    #hamburger-nav {
        width: 80%;
        height: 75px;
        background-color: #fff;
        margin: auto;
        padding: 25px 25px 0px;
    }

    @media (max-width: 800px) {
        .hamburger-icon {
            display: block;
        }
        nav {
            display: none;
        }
    }
</style>