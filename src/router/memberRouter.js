import MemberCreate from "@/views/MemberCreate.vue";
import MemberList from "@/views/MemberList.vue";
import MemberLogin from "@/views/MemberLogin.vue";

export const memberRouter = [
  {
    path: '/member/login',
    name: 'MemberLogin',
    component: MemberLogin
  },
  {
    path: '/member/create',
    name: 'MemberCreate',
    component: MemberCreate
  },
  {
    path: '/member/list',
    name: 'MemberList',
    component: MemberList
  },
]