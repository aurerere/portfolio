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
    faBars, faXmark, faTerminal, faHeart, faListUl, faCheck, faCode, faDatabase
} from '@fortawesome/free-solid-svg-icons';
import {faFigma, faGithub, faLinkedin, faNodeJs, faVuejs} from "@fortawesome/free-brands-svg-icons";

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
library.add(faXmark);
library.add(faTerminal);
library.add(faHeart);
library.add(faListUl);
library.add(faNodeJs);
library.add(faVuejs);
library.add(faFigma);
library.add(faCheck);
library.add(faCode);
library.add(faDatabase);


app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
