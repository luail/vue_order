// 변수초기화
function initState() {
    return{
        productsInCart: JSON.parse(localStorage.getItem('productsInCart')) || [],
        totalQuantity: localStorage.getItem('totalQuantity') || 0,
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
            const existProduct = state.productsInCart.find(p => p.productId===product.productId);
            if(existProduct) {
                existProduct.productCount += product.productCount
            } else {
                state.productsInCart.push(product)
            }

            state.totalQuantity = parseInt(state.totalQuantity) + product.productCount;
            
            localStorage.setItem("productsInCart", JSON.stringify(state.productsInCart))
            localStorage.setItem("totalQuantity", state.totalQuantity)

        },
        clearCart(state) {
            state.productsInCart = [],
            state.totalQuantity = 0,
            localStorage.removeItem('productsInCart')
            localStorage.removeItem('totalQuantity')
        }
    },
    actions:{
        addCart(context, product) {
            context.commit('addCart', product)
        },
        clearCart(context){
            context.commit('clearCart')
        }
    },
    // 값을 가져가기위한 메서드
    getters:{
        getTotalQauntity: state => state.totalQuantity,
        getProductsInCart: state => state.productsInCart
    }
}
export default cart