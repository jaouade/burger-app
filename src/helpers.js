import toast from "react-hot-toast";
import {string} from "prop-types";

export const isNotNull = (obj) => obj !== undefined && obj !== null
export const isNull = (obj) => !isNotNull(obj)

export const getListFromObjectFromFirebase = (obj) => {
    return Object.entries(obj).map((e) => (e[1]));
}
export const getListOrders = (obj) => {
    return Object.entries(obj).map((e) => {
        return {
            ...e[1], id: e[0]
        }
    });
}
export const isArrayNotEmpty = (arr) => {
    return arr !== undefined && arr !== null && arr.length !== 0;
}
export const capitalizeFirstLetter = ([first, ...rest], locale = navigator.language) =>
    first.toLocaleUpperCase(locale) + rest.join('')

export const catchError = (error, msg) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //console.log(error.response.data);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        toast.error(msg + error.response);
    } else if (error.request) {
        // The request was made but no response was received
        // http.ClientRequest in node.js
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //console.log(error.request);
        toast.error(msg + error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        //console.log('Error', error.message);
        toast.error(msg + error.message);
    }
    //console.log(error.config);

}
export const sort = (list, prop, direction) => {
    switch (direction) {
        case 'desc':
            if (list[0] !== undefined && list[0][prop] instanceof String) {
                return list.sort((a, b) => ('' + b).localeCompare(a))
            }
            return list.sort((i1, i2) => i2[prop] - i1[prop]);
        case 'asc':
        case null:
        default:
            if (list[0] !== undefined && list[0][prop] instanceof String) {
                return list.sort((a, b) => ('' + a).localeCompare(b))
            }
            return list.sort((i1, i2) => i1[prop] - i2[prop]);

    }

}

export const allInputsValid = (form) => {
    let validation = []
    let newForm = {...form}
    Object.entries(form).forEach(
        entry => {
            let validationResult = validate(entry[1].rules, entry[1].value);
            if (!validationResult.valid) {
                newForm[entry[0]].errors = [validationResult.message]
            }
            return validation.push(validationResult);
        }
    )
    return validation.filter(v => !v.valid).length === 0;
}
export const validate = (rules, value) => {
    let valid = true;
    let message;
    if (rules === undefined) rules = {};
    if (value === undefined) value = '';
    if (rules.required) {
        valid = value.trim() !== '' && valid;
        if (!valid) message = rules.required.message;
    }
    if (rules.minLength && valid) {
        valid = value.trim().length >= rules.minLength.min;
        message = rules.minLength.message;

    }
    if (rules.maxLength && valid) {
        valid = value.trim().length <= rules.maxLength.max;
        message = rules.maxLength.message;

    }

    return {
        valid: valid,
        message: message
    };
}
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};
export const projectKey = 'AIzaSyBoBN_hmtOEaLT64gJCB_xb_rpuIFgruj4'
export const signUpURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={key}'.replace('{key}',projectKey)
export const signInURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={key}'.replace('{key}',projectKey)
export const refreshTokenURL = 'https://securetoken.googleapis.com/v1/token?key={key}'.replace('{key}',projectKey)


