<template>
    <div id="outer-login-container">
        <div id="login-container">
            <div>
                <img src="../assets/broccoli.png" alt="broccoli" style="width: 150px;
        margin-bottom: 10px;" />
            </div>
            <div>
                <VTextField outlined type="email" v-model="email" name="email" placeholder="Enter Email Address" autofocus hide-details />
            </div>
            <div v-if="showPassword === false">
                <VTextField outlined type="password" v-model="password" name="password" placeholder="Enter Password" hide-details>
                    <template v-slot:append>
                        <v-icon medium v-on:click="togglePasswordVisibility" color="#00b300">
                            mdi-eye
                        </v-icon>
                    </template>
                </VTextField>
            </div>
            <div v-else>
                <VTextField outlined type="text" v-model="password" name="password" placeholder="Enter Password" hide-details>
                    <template v-slot:append>
                        <v-icon medium v-on:click="togglePasswordVisibility" color="#00b300">
                            mdi-eye-off
                        </v-icon>
                    </template>
                </VTextField>
            </div>
            <div>
                <button v-on:click="handleLogin" class="form-button">
                    Login
                </button>
            </div>
            <div v-if="demo" class="disclaimer">
                <p>
                    HEADS UP! This app is intended for demo purposes only. Any changes you make will be lost during scheduled site refresh. 
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',
    data: function () {
        return {
            users: {},
            email: '',
            password: '',
            showPassword: false,
            demo: false
        }
    },
    mounted() {
        this.demo = process.env.VUE_APP_DEMO;
        if (this.demo) {
            this.email = 'guest@recipe-box.com';
            this.password = 'demo12345678';
        }
    },
    methods: {
        handleLogin() {
            axios.post(`${process.env.VUE_APP_API_PROTOCOL}${process.env.VUE_APP_API_SERVER}:${process.env.VUE_APP_API_PORT}/api/v1/login`, {email: this.email, password: this.password})
            .then(result => {
                localStorage.setItem('accessToken', JSON.stringify(result.data.accessToken));
                this.$router.push('/');
            })
            .catch(err => {
                console.log(err);
                this.$vToastify.error('Login Failed.');
            })
        },
        togglePasswordVisibility() {
            return this.showPassword = !this.showPassword;
        },
    }
}
</script>

<style>
    #outer-login-container {
        width: 60%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
    }

    #login-container {
        background-color: #fff;
        width: 80%;
        text-align: center;
        border: 2px solid #00b300;
        border-radius: 5px;
        padding: 25px;
    }

    #login-container div {
        margin: 0px 0px 10px;
    }

    .disclaimer {
        font-size: small;
        color: tomato;
        background-color: #eee;
        padding: 5px;
    }

    @media only screen and (min-width: 1064px) {
        #outer-content-container {
            width: 925px;
        }
    }

    @media only screen and (max-width: 695px) {
        #outer-content-container {
            width: 90%;
        }
    }

    @media only screen and (max-width: 411px) {
        #outer-login-container {
            width: 100%;
        }
        #login-container {
            width: 90%;
            height: 90%;
        }
    }
</style>