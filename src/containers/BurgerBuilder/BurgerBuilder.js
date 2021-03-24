import React, {Component} from 'react';

import Wrapper from '../../hoc/Wrapper/Wrapper'
import Burger from '../../components/Burger/Burger'
import Controls from '../../components/Burger/Controls/Controls'
import Modal from '../../components/ui/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1,
        },
        totalPrice: 4,
        purchasable: true,
        purchasing: false
    }

    render() {
        const disabled = {
            ...this.state.ingredients
        }
        for (let key in disabled){
            disabled[key] = disabled[key] <=0;
        }
        return (
            <Wrapper>
                <Modal closeModal={this.purchaseCancelHandler}  show={this.state.purchasing} >
                    <OrderSummary purchaseContinued={this.purchaseContinueHandler} purchaseCanceled={this.purchaseCancelHandler}  ingredients={this.state.ingredients} price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <Controls price={this.state.totalPrice} disabled = {disabled} purchasable={this.state.purchasable} ordered={this.purchasingHandler} ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler}/>
            </Wrapper>
        );
    }

    addIngredientHandler = (type) => {
        let count = this.state.ingredients[type];
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = count + 1;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;
        this.setState(
            {
                totalPrice: newPrice,
                ingredients: updateIngredients
            }
        )
        this.updatePurchaseState(updateIngredients);
    }
    removeIngredientHandler = (type) => {
        let count = this.state.ingredients[type];
        const updateIngredients = {
            ...this.state.ingredients
        };
        if (count - 1 < 0) return;
        updateIngredients[type] = count - 1;
        const priceSub = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceSub;
        this.setState(
            {
                totalPrice: newPrice,
                ingredients: updateIngredients
            }
        )
        this.updatePurchaseState(updateIngredients);
    }
    purchasingHandler = () => {
        this.setState(
            {
                purchasing : true
            }
        )
    }
    purchaseCancelHandler = () => {
        this.setState(
            {
                purchasing : false
            }
        )
    }
    purchaseContinueHandler = () => {
        alert('You did well!! 👏')
    }
    updatePurchaseState(ingredients){
        const sum = Object.values(ingredients).reduce((sum,el)=>sum+el,0);
        this.setState(
            {
                purchasable:sum>0
            }
        )
    }

}

export default BurgerBuilder;