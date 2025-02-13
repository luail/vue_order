<template>
    <v-container>
    <v-row class="d-flex justify-content-between mt-5">
        <!-- 검색용 v-col -->
        <v-col>
        
        </v-col>
        <v-col cols="auto">
            <v-btn @click="addCart()" color="secondary" class="mr-2">장바구니</v-btn>
            <v-btn @click="createOrder()" color="success">주문하기</v-btn>
        </v-col>
    </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-center text-h5">
                        상품목록
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>제품사진</th>
                                    <th>제품명</th>
                                    <th>가격</th>
                                    <th>재고수량</th>
                                    <th>주문수량</th>
                                    <th>주문선택</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in productList" :key="product.id">
                                    <td>
                                        <v-img :src="product.imagePath" style="height: 100px; width:auto"></v-img>
                                    </td>
                                    <td>{{ product.name }}</td>
                                    <td>{{ product.price }}</td>
                                    <td>{{ product.stockQuantity }}</td>
                                    <td>
                                        <v-text-field
                                        v-model.number="product.productCount"
                                        type="number"
                                        style="width: 70px;"
                                        />
                                    </td>
                                    <td class="text-center">
                                        <input type="checkbox" v-model="selected[product.id]">
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return{
            //예시 : {1:ture, 2:false, 3:ture}
            selected:{},
            productList:[],
            pageSize: 7,
            currentPage: 0,
            isLoding:false,
            isLastPage:false
        }
    },
    async created() {
        this.loadData();
        window.addEventListener('scroll', this.scrollPagenation)
    },
    methods: {
        async loadData() {
            try{
                this.isLoding=true
                // params라는 키워드를 사용하면 아래 데이터가 ?size=xxx&page=yyy 형태의 파라미터 형식으로 전송
            let params ={
                size: this.pageSize,
                page: this.currentPage
            }
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/product/list`, {params})
            const additonalData = response.data.content.map(p => ({...p, productCount:0}))
            if(additonalData.length == 0) {
                this.isLastPage=true
                return
            }
            // 기존의 productList에 additionalData가 추가 되는 형식 그냥 =을 쓰면 덮어씌워지게 된다.
            this.productList = [...this.productList, ...additonalData]
            this.currentPage++;
            this.isLoding=false
        } catch(e) {
            console.log(e)
        }
        },
        scrollPagenation() {
            // 화면높이 + 스크롤로 이동한 거리 > 전체화면 - n(내가 원하는 길이)가 성립되면 추가 데이터 로드
            const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
            if(isBottom && !this.isLoding && !this.isLastPage) {
                this.loadData();
            }

        },
        addCart(){

        },
        async createOrder() {
            // selected된 product만 필터링.
            // 예시 [{productId:1, productCount:3},{productId:2, productCount:1} ...]
            const orderProductList = Object.keys(this.selected).filter(key=>this.selected[key]===true)
                                    .map(key => {
                                        const product = this.productList.filter(p=>p.productCount>0).find(p=>p.id==key)
                                        if(product) {
                                            return{productId:product.id, productCount:product.productCount};
                                        }else{
                                            return null;
                                        }
                                    }).filter(p=> p != null)
                                    ;
            console.log(orderProductList)
            if(orderProductList.length<1) {
                alert("주문선택하신 물건이 없습니다.")
                return;
            }
            const totalCount = orderProductList.reduce((sum, p) => sum+p.productCount, 0)
            const yesOrNo = confirm(`${totalCount}개의 상품을 주문하시겠습니까?`)
            if(!yesOrNo) {
                console.log("주문이 철회 되었습니다.")
                return
            }
            try{
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/ordering/create`, orderProductList)
                alert("주문이 정상완료 되었습니다.")
                window.location.reload();
            }catch(e){
                console.log(e);
                alert("주문이 실패되었습니다.")
                window.location.reload();
            }
            
        }
    }
}
</script>