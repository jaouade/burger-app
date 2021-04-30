import {
    ORDER_CREATED,
    ORDER_DELETED,
    ORDER_DRAFT,
    ORDER_FAILED,
    ORDER_INIT,
    ORDER_UPDATED
} from "../actions/actionTypes";

const initialState = {
    orders: [],
    error: false,
    loading: true,
    fetched: false,
    draft: null,
    ordered: false
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_CREATED:
            return {
                ...state,
                orders: [...state.orders, action.payload.order],
                ordered: true,
                draft: null,
            }
        case ORDER_DRAFT:
            return {
                ...state,
                draft: action.payload.draft
            }
        case ORDER_INIT:
            return {
                ...state,
                ...action.payload
            }
        case ORDER_FAILED:
            return {
                ...state,
                error: action.payload.error
            }

        case ORDER_UPDATED:
            return {
                ...state,
                orders: state.orders.map(o => o.i === action.payload.order.id ? action.payload.order : o)
            }
        case ORDER_DELETED:
            return {
                ...state,
                orders: state.orders.filter(o => o.id !== action.payload.id)
            }
        default:
            return state
    }

}
export default orderReducer;