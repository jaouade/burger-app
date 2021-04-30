import {ORDER_CREATED, ORDER_DELETED, ORDER_DRAFT, ORDER_FAILED, ORDER_INIT} from "../actionTypes";
import axios from "../../../axios-orders";
import toast from "react-hot-toast";
import {catchError, getListOrders} from "../../../helpers";


export const initOrdersSuccess = (payload) => {
    return {
        type: ORDER_INIT,
        payload,
        fetched: true
    }
}
export const purchaseBurgerSuccess = (order) => {
    return {
        type: ORDER_CREATED,
        payload: {
            order
        }
    }
}
export const saveDraft = (draft) => {
    return {
        type: ORDER_DRAFT,
        payload: {
            draft
        }
    }
}
export const purchaseBurgerFailed = (error) => {
    return {
        type: ORDER_FAILED,
        payload: {
            error
        }
    }
}
export const deleteOrder = (id) => {
    return {
        type: ORDER_DELETED,
        payload: {
            id
        }
    }
}
export const purchaseBurgerStartCreation = (orderData, token) => {
    return dispatch => {
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data))
                toast.success("Your Order was successfully created !")
            })
            .catch(e => {
                catchError(e, 'An error has occurred while creating you order please try again ')
                dispatch(saveDraft(orderData.customer))
                dispatch(purchaseBurgerFailed(e))

            });
    }
}
export const initOrders = (token, user) => {
    return dispatch => {
        const url = '/orders.json?auth=' + token + '&orderBy="userId"&equalTo="' + user+'"';
        axios.get(url)
            .then(res => {
                    dispatch(initOrdersSuccess({
                        orders: getListOrders(res.data),
                        loading: false,
                        error: false
                    }))
                }
            ).catch(e => {
            catchError(e, 'Could not load your orders for the moment, Please try again later ')
            dispatch(initOrdersSuccess({
                orders: [],
                loading: false,
                error: false
            }))
        })
    }
}