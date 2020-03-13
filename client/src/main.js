"use strict"

import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(VModal)
Vue.use(VueSweetalert2);

new Vue ({
    el: '#app',
    render: createElement => createElement(App)
})