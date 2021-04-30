import {
    ADD_INGREDIENT,
    EMPTY_BURGER, INGREDIENTS_LOADING,
    REMOVE_INGREDIENT, SET_INGREDIENTS,
    UPDATE_PRICE
} from "../actionTypes";
import axios from "../../../axios-orders";
import {getListFromObjectFromFirebase} from "../../../helpers";
import toast from "react-hot-toast";

export function addIngredient(payload) {
    return {
        type: ADD_INGREDIENT,
        payload
    }
}

export function removeIngredient(payload) {
    return {
        type: REMOVE_INGREDIENT,
        payload
    }
}

export function updatePrice(payload) {
    return {
        type: UPDATE_PRICE,
        payload
    }
}

export function reInitializeBurger() {
    return {
        type: EMPTY_BURGER,
    }
}

export function loadingIngredients() {
    return {
        type: INGREDIENTS_LOADING,
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: SET_INGREDIENTS,
        payload: {ingredients}
    }
}

const ingredients = [
    {
        name: 'salad',
        quantity: 0,
        price: 0.3,
        order: 1
    }, {
        name: 'meat',
        quantity: 0,
        price: 1.7,
        order: 4
    }, {
        name: 'cheese',
        quantity: 0,
        price: 0.8,
        order: 3
    }, {
        name: 'bacon',
        quantity: 0,
        price: 0.4,
        order: 2
    },
]
const createIngredients = () => {
    ingredients.forEach(ingredient => {
        axios.post('/ingredients.json', ingredient);
    })
}

export function initIngredients() {

    return (dispatch, getState) => {
        if (getState().burger.ingredients.length === 0) {
            axios.get('/ingredients.json')
                .then(res => {

                    if (res.data === null || res.data === undefined) {
                        createIngredients();
                        dispatch(setIngredients(ingredients))
                    } else {
                        dispatch(setIngredients(getListFromObjectFromFirebase(res.data)))
                    }
                })
                .catch(e => {
                    toast.error('An error has occurred while fetching data.');
                })
        }
        dispatch(loadingIngredients())
    }
}