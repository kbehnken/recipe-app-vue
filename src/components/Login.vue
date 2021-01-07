<template>
    <div id='outer-login-container'>
        <div id='login-container'>
            <div>
                <img src='/assets/broccoli.png' alt='broccoli' />
            </div>
            <div>
                <input v-model='email' type='email' name='email' label='Email Address' required autofocus/>
            </div>
            <div>
                <input v-model='password' type='password' name='password' label='Password' required />
            </div>
            <div>
                <button v-on:click='handleLogin'>
                    Login
                </button>
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
            password: ''
        }
    },
    methods: {
        handleLogin() {
            axios.post('http://localhost:3030/api/v1/login', {email: this.email, password: this.password})
            .then(result => {
                console.log(result);
                localStorage.setItem('accessToken', JSON.stringify(result.data.accessToken));
                this.$router.push('/');
            })
            .catch(err => {
                console.log(err);
                this.$vToastify.error('Login Failed.');
            })
        }
    }
}
</script>

<style>
    #outer-login-container {
        width: 60%;
        height: 100vh;
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
</style>