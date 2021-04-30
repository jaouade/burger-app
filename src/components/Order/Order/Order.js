import classes from './Order.module.css'
import {isNotNull} from "../../../helpers";
import NumberFormat from 'react-number-format'
import Moment from "react-moment";
import moment from "moment";
import "semantic-ui-css/semantic.min.css";

import {Popup} from "semantic-ui-react";
import axios from "../../../axios-orders";
import toast from "react-hot-toast";
import {Component} from "react";
import {connect} from "react-redux";
import {deleteOrder} from "../../../store/actions";
import Button from '../../ui/Button/Button'
class Order extends Component {
    render() {
        let time = <small data-tip="" data-for="registerTip">
            <code>
                Created {' '} <Moment fromNow>{this.props.order.createdAt}</Moment>
            </code>
        </small>
        const ingredients = isNotNull(this.props.order.ingredients) ? this.props.order.ingredients.map((ingr, i) =>
            <span style={
                {
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '5px',
                    backgroundColor: 'yellow'
                }
            }
                  key={i}> {ingr.name + ': ' + ingr.quantity}</span>) : null;
        return (
            <div className={classes.Order}>
                <p>
                    Ingredients : {ingredients}
                </p>
                <Button style={{'float':'right'}} btntype={'Danger'} clicked={()=>this.props.onOrderDeleted(this.props.order.id)}>DELETE</Button>
                <p>Price : <strong><NumberFormat value={parseFloat(this.props.order.price).toPrecision(4)}
                                                 displayType={'text'}
                                                 thousandSeparator={true} prefix={'$'}/></strong></p>

                <span
                    style={{
                        backgroundColor: 'black',
                        width: 'fit-content',
                        color: this.getStatusColor(),
                        display: 'block',
                        borderRadius: '4px'
                    }}>
                {this.getStatus()}
            </span>
                <Popup
                    trigger={time}
                    position="right center"
                >
                    {moment(this.props.order.createdAt).format('d MMMM YYYY h:mm:ss a')}
                </Popup>
            </div>
        )
    }


    cancelOrder = () => {

        let order = this.props.order;
        order.status = '-1'
        axios.post('/orders.json', order)
            .then(response => {
                if (response.status !== 200 && response.status !== 201) {
                    toast.error('An error has occurred while fetching data');
                } else {
                    this.setState({
                        loading: false
                    })
                    toast.success("Your Order was canceled successfully !")
                    this.this.props.history.replace('/orders')
                }
            })
            .catch(e => {
                this.setState({
                    loading: false
                })
                toast.error('An error has occurred while fetching data');
            });
    }
    getStatus = () => {
        switch (this.props.order.status) {
            case "-1":
                return 'Canceled'
            case '0' :
                return 'Created'
            case '1' :
                return 'Preparing'
            case '2' :
                return 'On its way to you'
            case '3' :
                return 'Delivered'
            default :
                return 'Created'
        }
    }
    getStatusColor = () => {
        switch (this.props.order.status) {
            case "-1":
                return 'white'
            case '0' :
                return 'yellow'
            case '1' :
                return 'orange'
            case '2' :
                return 'teal'
            case '3' :
                return 'green'
            default :
                return 'yellow'
        }
    }


}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderDeleted: (id) => dispatch(deleteOrder(id))
    }
}
export default connect(null, mapDispatchToProps)(Order);