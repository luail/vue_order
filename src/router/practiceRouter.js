import VuetifyComponent from "@/components/practice/VuetifyComponent.vue";
import ModelingComponent from "@/components/practice/ModelingComponent.vue"
import HookComponent from "@/components/practice/HookComponent.vue";
import ConditionalAxiosComponent from "@/components/practice/ConditionalAxiosComponent.vue";
import StoreTestComponent from "@/components/practice/StoreTestComponent.vue";

export const practiceRouter = [
    {
        path: '/practice/vuetify',
          name: 'vuetifyComponent',
        component: VuetifyComponent
    },
    {
        path: '/practice/modeling',
          name: 'ModelingComponent',
        component: ModelingComponent
    },
    {
      path: '/practice/hooks',
        name: 'HookComponent',
      component: HookComponent
    },
    {
      path: '/practice/conditional',
        name: 'ConditionalAxiosComponent',
      component: ConditionalAxiosComponent
    },
    {
      path: '/practice/storetest',
        name: 'StoreTestComponent',
      component: StoreTestComponent
    },
]