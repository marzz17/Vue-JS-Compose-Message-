// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import VuePapaParse from 'vue-papa-parse';
Vue.use(VuePapaParse);
Vue.config.productionTip = false;
import Helloworld from './components/Helloworld';
Vue.component('Helloworld', Helloworld);
/* eslint-disable no-new */
new Vue({
	el: '#app',
	components: { App },
	template: '<App/>'
});
