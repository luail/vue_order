<template>
    <h1>store componentB</h1>
    <p>일반변수값 count : {{ count }}</p>
    <p>store변수값 count : {{ getStoreCount }}</p>
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
    }
}
</script>