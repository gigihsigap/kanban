<template>
    <div id="app">

        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand ml-2 mr-5" href="#">Kanban</a>
            <!-- <div v-if="!isLogin" class="collapse navbar-collapse pr-auto" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#" v-on:click="f">Register</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" v-on:click="f">Login</a>
                </li>
                </ul>
            </div> -->
            <div v-if="isLogin" class="collapse navbar-collapse pr-auto" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <!-- <a class="nav-link" href="#">Add New Task</a> -->
                </li>
                </ul>
            </div>
            <div v-if="isLogin" class="navbar-nav">
                <!-- <a class="nav-link" href="#">Logout</a> -->
            </div>
        </nav>

        <div class="container">
            <LandingPage v-if="!isLogin" v-bind:base_url="BASE_URL" @setToken="changeIsLogin">
            </LandingPage>
            
            <KanbanPage v-if="isLogin" v-bind:base_url="BASE_URL" v-bind:rt_data="RT_DATA" @setToken="changeIsLogin">
                
            </KanbanPage>
        </div> 

    </div>
</template>

<script>
// import io from 'socket.io-client';
import KanbanPage from './components/KanbanPage.vue'
import LandingPage from './components/LandingPage.vue'

export default {
    name: 'App',
    components: {
        LandingPage,
        KanbanPage,
    },
    data: function () {
        return {
            BASE_URL: 'http://127.0.0.1:3000',
            RT_DATA: '',
            isLogin: localStorage.getItem('token') ? true : false,
        }
    },
    methods: {
        changeIsLogin: function (payload) {
            if (!payload) {
                localStorage.removeItem('token')
                let auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut()
                .then(() => {
                    // console.log('User signed out.', auth2);
                    this.isLogin = false
                })
                .catch(() => {
                    
                })
                this.isLogin = false
            }
            if (payload) this.isLogin = payload
        }
    },
    created: function () {
        // let socket = io(`${this.BASE_URL}`)
        let socket = io(`http://localhost:3000`)
        socket.on('realtime-data', receiveData => {
            this.RT_DATA = receiveData
            console.log('This is the received data:', this.RT_DATA)
        })
    }
}
</script>
