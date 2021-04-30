//FOR BURGER BUILDING
export let UPDATE_PRICE = "Burger/updatePrice";
export let INGREDIENTS_LOADING = "Burger/ingredientsLoading";
export const ADD_INGREDIENT = 'Burger/addIngredient'
export const REMOVE_INGREDIENT = 'Burger/removeIngredient'
export const EMPTY_BURGER = 'Burger/initialBurger'
export const SET_INGREDIENTS = 'Burger/setIngredients'
export const INIT_INGREDIENTS = 'Burger/initIngredients'

//FOR ORDER HANDLING
export const ORDER_INIT = 'Order/initOrders'
export const ORDER_CREATED = 'Order/created'
export const ORDER_DRAFT = 'Order/draft'
export const ORDER_FAILED = 'Order/failed'
export const ORDER_DELETED = 'Order/deleted'
export const ORDER_UPDATED = 'Order/updated'

//FOR USER STATE
export const AUTH_START = 'Auth/authStart'
export const SIGN_UP_SUCCESS = 'Auth/signUpSuccess'
export const LAST_PAGE_BEFORE_LOGIN = 'Auth/lastPageBeforeLogin'
export const SIGN_IN_SUCCESS = 'Auth/signInSuccess'
export const REFRESH_TOKEN = 'Auth/refreshToken'
export const AUTH_FAIL = 'Auth/authFail'
export const LOG_OUT = 'Auth/logout'