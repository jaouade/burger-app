import React, {Component} from 'react';

import Wrapper from '../../hoc/Wrapper/Wrapper'
import Burger from '../../components/Burger/Burger'
import Controls from '../../components/Burger/Controls/Controls'
import Modal from '../../components/ui/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from "../../axios-orders";
import Loader from '../../components/ui/Loader/Loader'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import toast from 'react-hot-toast';
import {getListFromObjectFromFirebase, isNotNull} from "../../helpers";

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: true,
        purchasing: false,
        loading: false
    }

    render() {
        const disabled = {
            ...this.state.ingredients
        }
        for (let ingr in disabled) {
            disabled[ingr.name] = ingr.quantity <= 0;
        }
        let orderSummary = this.state.ingredients ? <OrderSummary purchaseContinued={this.purchaseContinueHandler}
                                                                  purchaseCanceled={this.purchaseCancelHandler}
                                                                  ingredients={this.state.ingredients}
                                                                  price={this.state.totalPrice}/> : <Loader/>;
        if (this.state.loading) {
            orderSummary = <Loader/>
        }
        return (
            <Wrapper>
                <Modal closeModal={this.purchaseCancelHandler} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {this.state.ingredients ? <Burger ingredients={this.state.ingredients}/> : <Loader/>}
                <Controls loading={this.state.ingredients === null || this.state.ingredients === undefined}
                          price={this.state.totalPrice} disabled={disabled} purchasable={this.state.purchasable}
                          ordered={this.purchasingHandler} ingredientAdded={this.addIngredientHandler}
                          ingredientRemoved={this.removeIngredientHandler}/>
            </Wrapper>
        );
    }

    addIngredientHandler = (type) => {
        let filterElement = this.state.ingredients.filter(i => i.name === type)[0];
        let others = this.state.ingredients.filter(i => i.name !== type);

        filterElement.quantity = filterElement.quantity + 1;
        const updateIngredients = [
            ...others, filterElement
        ];
        const newPrice = this.state.totalPrice + filterElement.price;
        this.setState(
            {
                totalPrice: newPrice,
                ingredients: updateIngredients
            }
        )
        this.updatePurchaseState(updateIngredients);
    }
    removeIngredientHandler = (type) => {
        let filterElement = this.state.ingredients.filter(i => i.name === type)[0];
        let quantity = filterElement.quantity;
        let others = this.state.ingredients.filter(i => i.name !== type);

        if (quantity - 1 < 0) return;
        filterElement.quantity = quantity - 1;
        const updateIngredients = [
            ...others, filterElement
        ];
        const newPrice = this.state.totalPrice - filterElement.price;
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
        localStorage.setItem('burger', JSON.stringify(this.state.ingredients))
        localStorage.setItem('price', this.state.totalPrice)
        this.props.history.push('/checkout')
    }

    updatePurchaseState(ingredients) {
        const sum = ingredients.reduce((sum, el) => sum + el.quantity, 0);
        this.setState(
            {
                purchasable: sum > 0
            }
        )
    }

    createIngredients = () => {
        this.setState({
            loading: true
        })
        let ingredients = [
            {
                name: 'salad',
                quantity: 2,
                price: 0.3
            }, {
                name: 'meat',
                quantity: 1,
                price: 1.7
            }, {
                name: 'cheese',
                quantity: 1,
                price: 0.8
            }, {
                name: 'bacon',
                quantity: 3,
                price: 0.4
            },
        ]

        ingredients.forEach(ingredient => {
            axios.post('/ingredients.json', ingredient)
                .then(response => {
                    if (response.status < 200 || response.status > 200) {
                        //toast.error('An error has occurred while fetching data');
                    } else {
                        this.setState({
                            loading: false, purchasing: false
                        })

                    }
                })
                .catch(error => {
                    this.setState({
                        loading: true, purchasing: false
                    })
                });
        })

    }

    componentDidMount() {
        setTimeout(() => this.prepareIngredients(), 2000);
    }

    prepareIngredients() {
        let burger = localStorage.getItem('burger');
        if (isNotNull(burger)) {
            let ingredients = JSON.parse(burger);
            this.setState(
                {
                    ingredients: ingredients,
                    totalPrice: this.getPrice(ingredients)
                }
            )
        } else if (this.state.ingredients === null || this.state.ingredients === undefined) {
            axios.get('/ingredients.json')
                .then(res => {
                    if (res.data === null || res.data === undefined) {
                        this.createIngredients();
                    }
                    let data = getListFromObjectFromFirebase(res.data);
                    let price = this.getPrice(data);
                    this.setState(
                        {
                            ingredients: data,
                            totalPrice: price
                        }
                    )
                })
                .catch(e => {
                    toast.error('An error has occurred while fetching data.');
                })
        }
    }

    getPrice(data) {
        return this.state.totalPrice + data.reduce((sum, el) => {
            return sum + el.price * el.quantity
        }, 0.0);
    }



}

export default withErrorHandler(BurgerBuilder, axios);