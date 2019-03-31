
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');


window.Vue = require('vue');

//import Vue from 'vue'
//import Vue from 'vue';
import VueRouter from 'vue-router'


/* v-form */
import { Form, HasError, AlertError } from 'vform'

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

/* end-form */

/* pagination */
Vue.component('pagination', require('laravel-vue-pagination'));
/* end pagination */

/*Register Gate*/
import Gate from "./Gate";
Vue.prototype.$gate = new Gate(window.user);
/*End register Gate*/


/* momentjs */
import moment from 'moment';
/* end momentjs */


/* VueProgressBar */
import VueProgressBar from 'vue-progressbar'

const options = {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px',
    thickness: '2px',
    transition: {
        speed: '1s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
}

Vue.use(VueProgressBar, options)

/* End VueProgressBar */

/*sweetalert2 */
import swal from 'sweetalert2'
window.swal = swal;

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
window.toast = toast
/*end sweetalert2 */


/* Toastr */

/* filter */
Vue.filter('upText', function (value) {
    //return text.toUpperCase();
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})
/* end filter */

/* register moment js */
Vue.filter('myDate', (arg) => {
    return moment(arg).format("YYYY-MM-DD - HH:mm:ss");
})
/* end register moment js */



/*load data after created user */
// let Fire = new Vue();
// window.Fire = Fire;
window.Fire = new Vue();
/* end load data after created user */




Vue.use(VueRouter)

const routes = [
    { path: '/home', component: require('./components/Dashboard.vue').default },
    { path: '/dashboard', component: require('./components/Dashboard.vue').default },
    { path: '/developer', component: require('./components/Developer.vue').default },
    { path: '/profile', component: require('./components/Profile.vue').default },
    { path: '/users', component: require('./components/Users.vue').default },
    { path: '*', component: require('./components/NotFound.vue').default },
]



const router = new VueRouter({
    routes, // short for `routes: routes`
    mode: "history"
})
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

//Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

/* Passport */
Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);

Vue.component(
    'not-found',
    require('./components/NotFound.vue').default
);


/* End Passport */

const app = new Vue({
    router,
    data : {
        search : ""
    },
    // methods: {
    //     searchit(){
    //         //console.log("Ok");
    //         // send event to Users.vue
    //         Fire.$emit('searching');
    //     }
    // },
    
    // using lodash for search
    methods:{
        searchit: _.debounce(() => {
            Fire.$emit('searching');
        },800),

        printme() {
            window.print();
        }
    }
}).$mount('#app')
