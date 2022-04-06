import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import InstantSearch from 'vue-instantsearch/vue3/es';


const app = createApp(App)
app.use(InstantSearch);
app.mount('#app')
