import '../styles/reset.css';
import '../styles/main.scss';
import 'babel-polyfill';
import Vue from 'vue';
import recipes from './components/recipes.vue';

if (document.querySelector('.recipe-vue')) {
  new Vue({
    el: '.recipe-vue',
    render: (h) => h(recipes),
  });
}
