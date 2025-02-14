<template>
    <h1>store componentA</h1>
    <p>일반변수값 count : {{ count }}</p>
    <v-btn @click="increamentCount">count값 증가</v-btn>
</template>
<script>
export default {
    data() {
        return{
            count:0
        }
    },methods: {
        increamentCount() {
            this.count++;
        }
    }
}
</script>