// 변수초기화
function initState() {
    return{
        productsInCart: [],
        totalQuantity: 0,
    }
}

const cart = {
    // 상태초기화
    state:initState,
    // 값을 변경하는 메서드
    // mutation은 컴포넌트에서 직접 호출되기 보다는, actions를 통해 mutation을 호출.
    // 그 이유는 여러 mutation의 조합을 actions에서 정의할 수 있기 때문.
    mutations:{
        addCart(state, product) {
            state.productsInCart.push(product)
            state.totalQuantity += product.productCount;
        }
    },
    actions:{
        addCart(context, product) {
            context.commit('addCart', product)
        }
    },
    // 값을 가져가기위한 메서드
    getters:{
        getTotalQauntity: state => state.totalQuantity,
        getProductsInCart: state => state.productsInCart
    }
}
export default cart