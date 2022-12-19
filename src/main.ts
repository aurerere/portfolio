import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store";

import './assets/main.css';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
    faFileCode,
    faAddressCard,
    faFaceGrinTears,
    faEnvelope,
    faUserCheck,
    faFile,
    faBars
} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";

const app = createApp(App);

app.use(router);
app.use(store);

library.add(faFileCode);
library.add(faAddressCard);
library.add(faFaceGrinTears);
library.add(faEnvelope);
library.add(faUserCheck);
library.add(faFile);
library.add(faLinkedin);
library.add(faGithub);
library.add(faBars);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
