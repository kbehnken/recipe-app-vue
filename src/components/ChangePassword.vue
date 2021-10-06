<template>
    <div>
        <Header />
        <div class="outer-content-container">
            <p style="text-align: center;">
                Fill out the form below and click the Save button to change your recipe box password.<br /><br />
            </p>
            <div class="inner-content-container">
                <div v-if="showOldPassword === false">
                    <VTextField outlined type="password" v-model="oldPassword" name="oldPassword" placeholder="Enter Old Password" autocomplete="off" autofocus>
                        <template v-slot:append>
                            <v-icon medium v-on:click="toggleOldPasswordVisibility()" color="#00b300">
                                mdi-eye
                            </v-icon>
                        </template>
                    </VTextField>
                </div>
                <div v-else>
                    <VTextField outlined type="text" v-model="oldPassword" name="oldPassword" placeholder="Enter Old Password" autocomplete="off">
                        <template v-slot:append>
                            <v-icon medium v-on:click="toggleOldPasswordVisibility()" color="#00b300">
                                mdi-eye-off
                            </v-icon>
                        </template>
                    </VTextField>
                </div>
                <div v-if="showNewPassword === false">
                    <VTextField outlined type="password" v-model="newPassword" name="newPassword" placeholder="Enter New Password" autocomplete="off">
                        <template v-slot:append>
                            <v-icon medium v-on:click="toggleNewPasswordVisibility" color="#00b300">
                                mdi-eye
                            </v-icon>
                        </template>
                    </VTextField>
                </div>
                <div v-else>
                    <VTextField outlined type="text" v-model="newPassword" name="newPassword" placeholder="Enter New Password" autocomplete="off">
                        <template v-slot:append>
                            <v-icon medium v-on:click="toggleNewPasswordVisibility" color="#00b300">
                                mdi-eye-off
                            </v-icon>
                        </template>
                    </VTextField>
                </div>
                <div v-if="showConfirmPassword === false">
                    <VTextField outlined type="password" v-model="confirmPassword" name="confirmPassword" placeholder="Enter Confirm Password" autocomplete="off">
                        <template v-slot:append>
                            <v-icon medium v-on:click="toggleConfirmPasswordVisibility" color="#00b300">
                                mdi-eye
                            </v-icon>
                        </template>
                    </VTextField>
                </div>
                <div v-else>
                    <VTextField outlined type="text" v-model="confirmPassword" name="confirmPassword" placeholder="Enter Confirm Password" autocomplete="off">
                        <template v-slot:append>
                            <v-icon medium v-on:click="toggleConfirmPasswordVisibility" color="#00b300">
                                mdi-eye-off
                            </v-icon>
                        </template>
                    </VTextField>
                </div>
                <button v-on:click="handleChangePassword()" class="form-button">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { getUserInfo } from '../helpers/getUserInfo';
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
            const userName = getUserInfo().email;
            if (userName === 'guest@recipe-box.com') {
                return this.$vToastify.error('The Guest user is not allowed to change their password.');
            }
            if (this.newPassword.length < 12) {
                return this.$vToastify.error('Password must be a minimum of 12 characters');
            }
            if (this.newPassword === this.confirmPassword) {
                axios.put(`${process.env.VUE_APP_API_PROTOCOL}${process.env.VUE_APP_API_SERVER}:${process.env.VUE_APP_API_PORT}/api/v1/change-password`, {
                    oldPassword: this.oldPassword,
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
        },
        toggleOldPasswordVisibility() {
            return this.showOldPassword = !this.showOldPassword;
        },
        toggleNewPasswordVisibility() {
            return this.showNewPassword = !this.showNewPassword;
        },
        toggleConfirmPasswordVisibility() {
            return this.showConfirmPassword = !this.showConfirmPassword;
        }
    }
}
</script>