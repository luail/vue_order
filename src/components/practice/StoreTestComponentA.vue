<template>
    <h1>store componentA</h1>
    <p>일반변수값 count : {{ count }}</p>
    <v-btn @click="incrementCount">count값 증가</v-btn>
    <p>store변수값 count : {{ getStoreCount }}</p>
    <v-btn @click="increamentStoreCount">store count값 증가</v-btn>
</template>
<script>
export default {
    data() {
        return{
            count:0
        }
    },
    computed:{
        getStoreCount(){
            return this.$store.getters.getCount;
        }
    },
    methods: {
        incrementCount() {
            this.count++;
        },
        increamentStoreCount() {
            // vuex에서 action를 호출할 때는 dispatch를 사용
            this.$store.dispatch('increament')
        }
    }
}
</script>