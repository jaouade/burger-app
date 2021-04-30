import {
    AUTH_FAIL, AUTH_START, LAST_PAGE_BEFORE_LOGIN, LOG_OUT, REFRESH_TOKEN, SIGN_IN_SUCCESS, SIGN_UP_SUCCESS
} from "../actions/actionTypes";
import {updateObject} from "../../helpers";

const initialState = {
    userId: null,
    token: null,
    loading: false,
    error: null,
    signedUp: false,
    lastPageBeforeLogin: '/'
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP_SUCCESS:
            return updateObject(state, {
                signedUp: true,
                loading: false
            })
        case LAST_PAGE_BEFORE_LOGIN:
            return updateObject(state, {
               lastPageBeforeLogin: action.payload.lastPageBeforeLogin
            })

        case SIGN_IN_SUCCESS:
            return updateObject(state, {
                userId: action.payload.userId,
                token: action.payload.idToken,
                loading: false,
                error: null,
                signedUp: false,
            })
        case REFRESH_TOKEN:
            return updateObject(state, {
                userId: action.payload.userId,
                token: action.payload.idToken,
                loading: false,
                error: null,
                signedUp: false,
            })
        case AUTH_START:
            return updateObject(state, {
                loading: true,
                error: null,
            })
        case AUTH_FAIL:
            return updateObject(state, {
                loading: false,
                error: action.payload.error
            })
        case LOG_OUT:
            return updateObject(state, {
                userId: null,
                token: null,
                loading: false,
                error: null,
                signedUp: false,
            })

        default:
            return state
    }

}
export default authReducer;