import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: [],
    totalPrice: 4,
    loading: false,
    building : false,
}
const getPrice = (data) => {
    return this.props.totalPrice + data.reduce((sum, el) => {
        return sum + el.price * el.quantity
    }, 0.0);
}
const burgerBuilderReducer = (state = initialState, action) => {


    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action.payload)
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action.payload)
        case actionTypes.UPDATE_PRICE:
            return {
                ...state,
                totalPrice: action.payload.price
            }
        case actionTypes.INGREDIENTS_LOADING:
            return {
                ...state,
                loading: !state.loading
            }
        case actionTypes.SET_INGREDIENTS :
            return {
                ...state,
                ingredients: action.payload.ingredients,
                totalPrice: 4,
                building: false
            }
        case actionTypes.EMPTY_BURGER :
            return {
                ...state,
                ingredients: [
                    {
                        name: 'salad',
                        quantity: 0,
                        price: 0.3
                    }, {
                        name: 'meat',
                        quantity: 0,
                        price: 1.7
                    }, {
                        name: 'cheese',
                        quantity: 0,
                        price: 0.8
                    }, {
                        name: 'bacon',
                        quantity: 0,
                        price: 0.4
                    },
                ],
                totalPrice: 4,
                building: false
            }
        default:
            return state
    }

}

const addIngredient = (state, payload) => {
    let filterElement = state.ingredients.filter(i => i.name === payload.type)[0];
    let others = state.ingredients.filter(i => i.name !== payload.type);

    filterElement.quantity = filterElement.quantity + 1;
    const updateIngredients = [
        ...others, filterElement
    ];
    const newPrice = state.totalPrice + filterElement.price;

    return {
        ...state,
        totalPrice: newPrice,
        ingredients: updateIngredients,
        building: true
    }

}
const removeIngredient = (state, payload) => {
    let filterElement = state.ingredients.filter(i => i.name === payload.type)[0];
    let quantity = filterElement.quantity;
    let others = state.ingredients.filter(i => i.name !== payload.type);

    if (quantity - 1 < 0) return state;
    filterElement.quantity = quantity - 1;
    const updateIngredients = [
        ...others, filterElement
    ];
    const newPrice = state.totalPrice - filterElement.price;
    return {
        ...state,
        totalPrice: newPrice,
        ingredients: updateIngredients,
        building: true
    }

}


export default burgerBuilderReducer;