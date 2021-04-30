import {Component} from "react";
import {Button, Container, Form, Grid, Icon, Message} from "semantic-ui-react";
import Input from "../../../components/ui/Input/Input";
import {connect} from "react-redux";
import {saveLastPage, signIn} from "../../../store/actions";
import MyButton from '../../../components/ui/Button/Button'
import {isNotNull} from "../../../helpers";

class SignIn extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.token) {
            this.props.history.replace(this.props.lastPageBeforeLogin)
        }
    }
    componentDidMount() {
        if (this.props.building){
            this.props.onSaveLastPage('/checkout');
        }
    }

    state = {
        form: {
            email: {
                label: 'Email : ',
                inputType: 'input',
                config: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                rules: {
                    isEmail: {
                        message: 'This should be a valid email.'
                    }
                },
                errors: []
            },
            password: {
                label: 'Password : ',
                inputType: 'input',
                config: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                rules: {
                    required: {
                        message: 'The password must not be empty'
                    },
                    minLength: {
                        min: 6,
                        message: 'The password must have at least 6 numbers in it'
                    }
                },
                errors: []
            },
        },
    }
    validate = (rules, value) => {
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
        if (rules.isEmail && valid) {
            valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
            message = rules.isEmail.message;

        }

        return {
            valid: valid,
            message: message
        };
    }
    allInputsValid = () => {
        let validation = []
        let orderForm = {...this.state.form}
        Object.entries(this.state.form).forEach(
            entry => {
                let validationResult = this.validate(entry[1].rules, entry[1].value);
                if (!validationResult.valid) {
                    orderForm[entry[0]].errors = [validationResult.message]
                }
                return validation.push(validationResult);
            }
        )
        return validation.filter(v => !v.valid).length === 0;
    }
    toggleSignInHandler = () => {
        this.props.history.push('/sign-up')
    }
    changedInputValueHandler = (value, field) => {
        let newOrderForm = {...this.state.form}
        newOrderForm[field].value = value;
        const rules = this.state.form[field].rules;
        let validationResult = this.validate(rules, value);
        if (!validationResult.valid) {
            newOrderForm[field].errors = [validationResult.message];
            this.setState({form: newOrderForm});
        } else {
            newOrderForm[field].errors = []
            this.setState({form: newOrderForm});
        }
    }

    render() {
        const logoutParam = new URLSearchParams(this.props.location.search).get("logout");
        return (
            <Container>
                {logoutParam ?
                    <Message attached info>
                        <Icon name='info circle'/>
                        You signed out successfully
                    </Message> : null}
                    {this.props.signedUp ?
                    <Message attached success>
                        <Icon name='info circle'/>
                        You have created your account successfully , Please log in
                    </Message> : null}

                <Form className={'attached fluid segment'} error={isNotNull(this.props.error)}
                      loading={this.props.loading} onSubmit={this.handleAuth}>
                    {Object.entries(this.state.form).map(entry => {
                        return <Form.Field key={entry[0]}
                                           error={entry[1].errors.length > 0}
                        >
                            <Input key={entry[0]} value={entry[1].value}
                                   onChange={(e) => this.changedInputValueHandler(e.target.value, entry[0])}
                                   inputtype={entry[1].inputType}
                                   errors={entry[1].errors}
                                   label={entry[1].label}
                                   {...entry[1].config}
                            />
                        </Form.Field>
                    })
                    }
                    <Message
                        error
                        header='An error occurred'
                        content={this.props.error}
                    />
                    <Button color={'blue'} disabled={!this.allInputsValid()}
                            type='submit'>SIGN IN</Button>
                    <div>

                    </div>
                </Form>

                <Message attached='bottom' warning>
                    <Icon name='help'/>
                    Don't have an account ? <MyButton btntype={'Danger'} clicked={this.toggleSignInHandler}>SIGN UP
                    HERE</MyButton>
                </Message>


            </Container>

        )
    }

    handleAuth = (e) => {
        e.preventDefault()
        this.props.onSignIn(this.state.form.email.value, this.state.form.password.value)

    }
}

const dispatchToProps = (dispatch) => {
    return {
        onSignIn: (email, password) => dispatch(signIn(email, password)),
        onSaveLastPage: (path) => dispatch(saveLastPage(path))
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token,
        signedUp: state.auth.signedUp,
        lastPageBeforeLogin: state.auth.lastPageBeforeLogin,
        building: state.burger.building
    }
}
export default connect(mapStateToProps, dispatchToProps)(SignIn);