import {Component} from "react";
import Button from '../../../components/ui/Button/Button'
import classes from './Contact.module.css'
import axios from '../../../axios-orders'
import toast from 'react-hot-toast';
import Loader from '../../../components/ui/Loader/Loader'
import Input from "../../../components/ui/Input/Input";

class Contact extends Component {
    state = {

        orderForm: {
            name: {
                label: 'Name : ',
                inputType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                rules: {
                    required: {
                        message: 'The name must not be empty'
                    }
                },
                errors: []
            },
            email: {
                label: 'Email : ',
                inputType: 'input',
                config: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                rules: {
                    required: true
                }
                ,
                errors: []
            },
            street: {
                label: 'Street : ',
                inputType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                rules: {
                    required: {
                        message: 'The street field must not be empty'
                    }
                },
                errors: []
            },
            postalCode: {
                label: 'Postal Code : ',
                inputType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                rules: {
                    required: {
                        message: 'The postal code must not be empty'
                    },
                    maxLength: {
                        max: 5,
                        message: 'The postal Code must have at most 5 numbers in it'
                    },
                    minLength: {
                        min: 4,
                        message: 'The postal Code must have at least 4 numbers in it'
                    }
                },
                errors: []
            },
            city: {
                label: 'City : ',
                inputType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                rules: {
                    required: {
                        message: 'The city field must not be empty'
                    }
                },
                errors: []
            },
            country: {
                label: 'Country : ',
                inputType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                rules: {
                    required: true
                }
                ,
                errors: []
            },
            deliveryMethod: {
                label: 'Delivery Method : ',
                inputType: 'select',
                config: {
                    options: [
                        {
                            value: 'glovo',
                            display: 'Glovo'
                        },
                        {
                            value: 'jumia-food',
                            display: 'Jumia'
                        },
                        {
                            value: 'nji-ndih',
                            display: 'Nji ndeh'
                        }
                    ],
                    selected: 'jumia-food'
                },
                value: 'jumia-food'
            }
        },
        loading: false
    }

    render() {
        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    Object.entries(this.state.orderForm).map(entry => {
                        return <Input key={entry[0]} value={entry[1].value}
                                      onChange={(e) => this.changedInputValueHandler(e.target.value, entry[0])}
                                      inputtype={entry[1].inputType}
                                      errors={entry[1].errors}
                                      label={entry[1].label}
                                      {...entry[1].config}
                        />
                    })
                }
                <Button btnType={'Danger'} clicked={this.goBackHandler}>Cancel</Button>
                <Button btnType={'Success'} type={'submit'} clicked={() => {
                }}>ORDER</Button>
            </form>
        );

        return (
            <div className={classes.Contact}>
                <h4>Enter your contact data : </h4>
                {this.state.loading ? <Loader/> : form}
            </div>
        )
    }

    changedInputValueHandler = (value, field) => {
        let newOrderForm = {...this.state.orderForm}
        newOrderForm[field].value = value;
        const rules = this.state.orderForm[field].rules;
        let validationResult = this.validate(rules, value);
        if (!validationResult.valid) {
            newOrderForm[field].errors = [validationResult.message];
            this.setState({orderForm: newOrderForm});
        } else {
            newOrderForm[field].errors = []
            this.setState({orderForm: newOrderForm});
        }
    }

    validate(rules, value) {
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

    orderHandler = (event) => {
        event.preventDefault();
        let validation = []
        let orderForm = {...this.state.orderForm}
        Object.entries(this.state.orderForm).forEach(
            entry => {
                let validationResult = this.validate(entry[1].rules, entry[1].value);
                orderForm[entry[0]].errors = [validationResult.message]
                return validation.push(validationResult);
            }
        )
        if (validation.filter(v => !v.valid).length > 0) {
            toast.error('Please check the form, There are some fields that are not valid')
            this.setState({
                orderForm: orderForm
            })
            return;
        }
        this.setState({
            loading: true
        })
        const customer = {
            name: this.state.orderForm.name.value,
            email: this.state.orderForm.email.value,
            address: {
                street: this.state.orderForm.street.value,
                postalCode: this.state.orderForm.postalCode.value,
                city: this.state.orderForm.city.value,
                country: this.state.orderForm.country.value
            }
        }
        let deliveryMethod = {
            valueId: this.state.orderForm.deliveryMethod.value,
            display: this.getDisplay(this.state.orderForm.deliveryMethod.value)
        }
        let order = {
            status: '0',
            ingredients: JSON.parse(localStorage.getItem('burger')),
            price: localStorage.getItem('price'),
            customer: customer,
            deliveryMethod: deliveryMethod,
            createdAt: new Date()
        };
        axios.post('/orders.json', order)
            .then(response => {
                if (response.status !== 200 && response.status !== 201) {
                    toast.error('An error has occurred while fetching data');
                } else {
                    this.setState({
                        loading: false
                    })
                    toast.success("Your Order was successfully created !")
                    localStorage.clear();
                    this.props.history.push('/orders')
                }
            })
            .catch(e => {
                this.setState({
                    loading: false
                })
                toast.error('An error has occurred while fetching data');
            });
    }

    goBackHandler = (e) => {
        e.preventDefault()
        this.props.history.goBack()
    }

    getDisplay(value) {
        return this.state.orderForm.deliveryMethod.config.options.filter(op => op.value === value)[0].display
    }
}

export default Contact;