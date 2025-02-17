<template>
    <v-app-bar app-dark>
        <v-container>
            <v-row>
                <v-col class="d-flex justify-start">
                    <div v-if="userRole==='ADMIN'">
                        <v-btn :to="{path:'/member/list'}">회원관리</v-btn>
                        <v-btn :to="{path:'/product/manage'}">상품관리</v-btn>
                        <v-btn :to="{path:'/order/list'}">실시간주문건수</v-btn>
                    </div>
                </v-col>
                <v-col class="text-center">
                    <v-btn :to="{path:'/'}">java shop</v-btn>
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-btn v-if="isLogin" :to="{path:'/order/cart'}">장바구니 {{ getTotalQauntity }}</v-btn>
                    <v-btn :to="{path:'/product/list'}">상품목록</v-btn>
                    <v-btn v-if="isLogin" :to="{path:'/member/mypage'}">MyPage</v-btn>
                    <v-btn v-if="!isLogin" :to="{path:'/member/create'}">회원가입</v-btn>
                    <v-btn v-if="!isLogin" :to="{path:'/member/login'}">로그인</v-btn>
                    <v-btn v-if="isLogin" @click="doLogout()">로그아웃</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>
<script>
import { jwtDecode } from 'jwt-decode';

export default{
    data(){
        return{
            userRole:null,
            isLogin:false,
        }
    },
    computed:{
        getTotalQauntity(){
            return this.$store.getters.getTotalQauntity;
        },
    },
    created() {
        const token = localStorage.getItem("token")
        if(token) {
            const payload = jwtDecode(token)
            this.userRole = payload.role
            this.isLogin = true
        }

    },
    methods: {
        doLogout() {
            localStorage.clear()
            window.location.href='/'
        }
    }

}
</script>