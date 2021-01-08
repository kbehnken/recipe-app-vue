<template>
    <div>
        <Header />
        <div class='outer-content-container'>
            <p>
                Fill out the form below and click the Save button to change your recipe box password.
            </p>
            <div class='form-container'>
                <VTextField outlined v-model='oldPassword' name='oldPassword' placeholder='Old Password' />
                <VTextField outlined v-model='newPassword' name='newPassword' placeholder='New Password' />
                <VTextField outlined v-model='confirmPassword' name='confirmPassword' placeholder='Confirm Password' />
                <button v-on:click='handleChangePassword()'>
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { authHeader } from '../helpers/authHeader';
import Header from './Header';

export default {
    name: 'ChangePassword',
    components: {
        Header: Header
    },
    data: function () {
        return {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            showOldPassword: false,
            showNewPassword: false,
            showConfirmPassword: false
        }
    },
    methods: {
        handleChangePassword() {
            if (this.newPassword.length < 12) {
                return this.$vToastify.error('Password must be a minimum of 12 characters');
            }
            if (this.newPassword === this.confirmPassword) {
                axios.put('http://localhost:3030/api/v1/change-password', {
                    newPassword: this.newPassword
                },
                {
                    headers: authHeader()
                }
                )
                .then(() => {
                    this.$vToastify.success('You successfully changed your password.');
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
}
</script>