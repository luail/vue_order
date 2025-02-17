<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-center text-h5">
                        주문목록
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                        :headers="tableHeaders"
                        :items="orderList"
                        >
                            
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return{
            tableHeaders:[{title:"ID", key:'id', align:'start'},
                        {title:"회원EAMIL", key:'memberEmail', align:'start'},
                        {title:"주문상태", key:'orderStatus', align:'start'},
                        {title:"ACTION", key:'actions', align:'start'}
            ],
            orderList:[],
        }
    },
    async created(){
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/ordering/list`);
        this.orderList = response.data;
    },
    methods:{

    }
}
</script>
