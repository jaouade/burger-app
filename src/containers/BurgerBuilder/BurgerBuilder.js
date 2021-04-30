import React, {Component} from 'react';

import Wrapper from '../../hoc/Wrapper/Wrapper'
import Burger from '../../components/Burger/Burger'
import Controls from '../../components/Burger/Controls/Controls'
import Modal from '../../components/ui/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from "../../axios-orders";
import Loader from '../../components/ui/Loader/Loader'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'

import {
    addIngredient,
    removeIngredient,
    initIngredients,
    loadingIngredients,
    saveLastPage
} from "../../store/actions/index";
import {capitalizeFirstLetter, sort} from "../../helpers";

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    render() {
        let {ingredients, loading, totalPrice} = this.props
        ingredients = sort(ingredients, 'order')
        let controllers = ingredients.map(i => {
            return {label: capitalizeFirstLetter(i.name), type: i.name}
        });
        let {onIngredientRemoved, onIngredientAdded} = this.props

        const disabled = {}
        ingredients.forEach(ing => disabled[ing.name] = ing.quantity <= 0)
        let orderSummary = ingredients ? <OrderSummary purchaseContinued={this.purchaseContinueHandler}
                                                       purchaseCanceled={this.purchaseCancelHandler}
                                                       ingredients={ingredients}
                                                       isAuth={this.props.isAuth}
                                                       price={totalPrice}/> : <Loader/>;
        if (loading) {
            orderSummary = <Loader/>
        }
        return (
            <Wrapper>
                <Modal closeModal={this.purchaseCancelHandler} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {ingredients ? <Burger ingredients={ingredients}/> : <Loader/>}
                <Controls controllers={controllers} loading={loading}
                          price={totalPrice} disabled={disabled}
                          purchasable={() => ingredients.reduce((sum, el) => sum + el.quantity, 0) > 0}
                          ordered={this.purchasingHandler} ingredientAdded={onIngredientAdded}
                          ingredientRemoved={onIngredientRemoved}/>
            </Wrapper>
        );
    }


    purchasingHandler = () => {
        this.setState(
            {
                purchasing: true
            }
        )
    }
    purchaseCancelHandler = () => {
        this.setState(
            {
                purchasing: false
            }
        )
    }
    purchaseContinueHandler = () => {
        if (this.props.isAuth) {
            this.props.history.push('/checkout')
        } else {
            this.props.onSaveLastPage('/checkout')
            this.props.history.push('/login')
        }
    }

    componentDidMount() {
        this.props.onLoadingIngredients()
        this.props.onInitIngredients()
    }


    /*   getPrice(data) {
           return this.props.totalPrice + data.reduce((sum, el) => {
               return sum + el.price * el.quantity
           }, 0.0);
       }*/


}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (type) => dispatch(addIngredient({type})),
        onIngredientRemoved: (type) => dispatch(removeIngredient({type})),
        onInitIngredients: () => dispatch(initIngredients()),
        onLoadingIngredients: () => dispatch(loadingIngredients()),
        onSaveLastPage: (path) => dispatch(saveLastPage(path))
    }
}
const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        loading: state.burger.loading,
        isAuth: state.auth.token !== null
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));