import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityView from '../views/CityView.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            // I need some parameters here which are "State" and "City" in that order......Since we're talking of individual weather details based on the selected state and city....just to get the weather details of a particular City.
            path: '/weather/:state/:city',
            name: 'CityView',
            component: CityView
        }
    ]
})

export default router