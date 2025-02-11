// import TestVue1 from '@/views/TestVue1.vue';
import {createRouter, createWebHistory} from 'vue-router';
import { practiceRouter } from './practiceRouter';

const routes = [
    // {
    //     path: '/test1',
    //     name: 'TestVue1',
    //     component: TestVue1
    // },
    ...practiceRouter,
]

const router = createRouter({
    // vue router는 내부적으로 두가지 방식의 히스토리 관리를 제공
    //  1)createWebHistory : /home, 2)createHashHistory: /#/home
    history: createWebHistory(),
    routes
});

export default router;