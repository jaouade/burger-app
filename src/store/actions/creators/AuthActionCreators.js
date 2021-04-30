import {AUTH_FAIL, AUTH_START, LAST_PAGE_BEFORE_LOGIN, LOG_OUT, SIGN_IN_SUCCESS, SIGN_UP_SUCCESS} from "../actionTypes";
import axios from "axios";
import {refreshTokenURL, signInURL, signUpURL} from "../../../helpers";
import toast from "react-hot-toast";
import moment from "moment";


export const authStart = () => {
    return {
        type: AUTH_START,
    }
}
export const signInSuccess = (data) => {
    return {
        type: SIGN_IN_SUCCESS,
        payload: {
            ...data,

        }
    }
}
export const signUpSuccess = (data) => {
    return {
        type: SIGN_UP_SUCCESS,
        payload: {
            ...data,
        }
    }
}
export const saveLastPage = (lastPageBeforeLogin) => {
    return {
        type: LAST_PAGE_BEFORE_LOGIN,
        payload: {
            lastPageBeforeLogin
        }
    }
}
export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        payload: {
            error
        }
    }
}
export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: LOG_OUT,
    }
}
export const tokenExpired = (time) => {
    return dispatch => {
        setTimeout(() => dispatch(logout()), time * 1000)
    }
}
export const signIn = (email, password) => {
    return dispatch => {
        dispatch(authStart())
        axios.post(signInURL, {
            password,
            email,
            returnSecureToken: true
        }).then(res => {
            localStorage.setItem('token', res.data.idToken)
            localStorage.setItem('refreshToken', res.data.refreshToken)
            localStorage.setItem('userId', res.data.localId)
            localStorage.setItem('expirationDate', new Date(new Date().getTime() + 1000 * res.data.expiresIn))
            dispatch(signInSuccess(res.data))
            toast.success("You successfully Logged In, Welcome back buddy  !")
        }).catch((error) => {
            //console.log(console.log(JSON.stringify(error)));
            dispatch(authFail('An error has occurred while signing you in. Please try again later'))

        })
    }
}
export const signUp = (email, password) => {
    return dispatch => {
        dispatch(authStart())
        axios.post(signUpURL, {
            password,
            email,
            returnSecureToken: true
        }).then(res => {
            dispatch(signUpSuccess(res.data))
        }).catch(error => {
            //console.log(console.log(JSON.stringify(error.response)));
            dispatch(authFail(error.response.data.error.errors[0].message))

        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {

            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            const now = moment(new Date());
            if (moment(expirationDate).isAfter(now)) {
                dispatch(signInSuccess({
                    idToken: token,
                    userId: localStorage.getItem('userId')
                }))
            } else {
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken){
                    axios.post(refreshTokenURL, {
                        grant_type : 'refresh_token',
                        refresh_token : refreshToken,
                    }).then(res => {
                        console.log(res)
                        const data = res.data;
                        const userId = data.user_id;
                        const token = data.id_token;
                        const expiresIn = data.expires_in;
                        const refreshTok = data.refresh_token;
                        localStorage.setItem('token', token)
                        localStorage.setItem('refreshToken', refreshTok)
                        localStorage.setItem('userId', userId)
                        localStorage.setItem('expirationDate', new Date(new Date().getTime() + 1000 * expiresIn))
                        dispatch(signInSuccess({
                            expiresIn : expiresIn,
                            refreshToken : refreshTok,
                            userId: userId,
                            token: token
                        }))
                    })
                }else dispatch(logout())
            }
        }
    }
}