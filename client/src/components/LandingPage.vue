<template>
    <div>
        <div id="landing-page">
            
            <div v-if="register_login" id="register-page" style="text-align: center; padding: 20px 40px">
                <h5>Register New Account</h5>
                <form v-on:submit.prevent="user_register">
                    <div class="form-group">
                        <label>Username:</label>
                        <input type="text" class="form-control" v-model="inputUsername">
                    </div>
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" class="form-control" v-model="inputEmail">
                    </div>
                    <div class="form-group">
                        <label>Password:</label>
                        <input type="password" class="form-control" v-model="inputPassword">
                    </div>
                    <input class="btn btn-success mt-2 mb-5" type="submit" value="Sign Up">
                </form>

                <span>Already have an account?</span>
                <button v-on:click="regis_login_switch" class="btn btn-secondary">Go To Login</button>

            </div>

            <div v-if="!register_login" id="login-page" style="text-align: center; padding: 20px 40px">
                <h5>Sign-In Into Your Account</h5>
                <form v-on:submit.prevent="user_login">
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" class="form-control" v-model="inputEmail">
                    </div>
                    <div class="form-group">
                        <label>Password:</label>
                        <input type="password" class="form-control" v-model="inputPassword">
                    </div>
                    <input class="btn btn-success mt-2 mb-5" type="submit" value="Login">
                </form>
                <span>Don't have an account yet?</span>
                <button v-on:click="regis_login_switch" class="btn btn-secondary">Go To Register</button>
                <br><br>
                <span>Or try Google Sign-in:</span>
                <div class="container m-2" style="display:flex; justify-content: center;">
                    <div id="google-signin-button"></div>
                </div>
                
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
export default {
    props: ['base_url'],
    mounted() {
        gapi.signin2.render('google-signin-button', {
        onsuccess: this.onSignIn
        })
    },
    data: function () {
        return {
            register_login: false,
            //----- Register/Login Form -----//
            inputUsername: '',
            inputEmail: '',
            inputPassword: '',
        } 
    },
    methods: {
        regis_login_switch: function () {
            console.log('Switch regis-login')
            if (this.register_login) {
                this.register_login = false
            } else if (!this.register_login) {
                this.register_login = true
            }
        },
        user_register: function () {
            console.log('User register')
            console.log(
                this.inputUsername,
                this.inputEmail,
                this.inputPassword,
            )
            axios({
                method: 'POST',
                url: `${this.base_url}/register`,
                data: {
                    username: this.inputUsername,
                    email: this.inputEmail,
                    password: this.inputPassword,
                }
            })
            .then(result => {
                console.log(result)
                this.regis_login_switch()
            })
            .catch(err => {
                console.log(err.response)
                let message = err.response.data.error[0] || 'Register error!'
                this.$swal(message)
            })
        },
        user_login: function () {
            console.log('User Login')
            console.log(this.base_url)
            console.log(this.inputEmail, this.inputPassword)
            axios({
                method: 'POST',
                url: `${this.base_url}/login`,
                data: {
                    email: this.inputEmail,
                    password: this.inputPassword,
                }
            })
            .then(result => {
                console.log(result)
                localStorage.setItem('token', result.data.token)
                this.$emit('setToken', true)
            })
            .catch(err => {
                // console.log(err.response)
                let message = err.response.data.error[0].message || 'Login error!'
                this.$swal(message)
            })
        },
        onSignIn: function (user) {
            let id_token = user.getAuthResponse().id_token;
            axios({
                method: 'POST',
                url: `${this.base_url}/google-login`,
                data: {
                    token: id_token,
                }
            })
            .then(result => {
                // console.log(result)
                localStorage.setItem('token', result.data.token)
                this.$emit('setToken', true)
            })
            .catch(err => {
                console.log(err.response)
                // let message = err.response.data.error[0].message || 'Login error!'
                // this.$swal(message)
            })
        }
    }
}
</script>