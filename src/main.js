import './bootstrap'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { NLoadingBarProvider, NMessageProvider } from 'naive-ui'
import naive from 'naive-ui'
import VueCookies from 'vue-cookies'
import router from './router'
import './style.css'
import App from './App.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'

// Fix Naive UI + Tailwind CSS issue
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const app = createApp(
    h(NLoadingBarProvider, () =>
        h(NMessageProvider, () =>
            h(App))
    )
)

app.use(createPinia())
app.use(VueCookies, { expire: "7d" })
app.use(router)
app.use(naive)
app.component('Navbar', Navbar)
app.component('Sidebar', Sidebar)
app.mount('#app')
