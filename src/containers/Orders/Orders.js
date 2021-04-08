import {Component} from "react";

import Order from '../../components/Order/Order/Order'
import axios from "../../axios-orders";
import toast from "react-hot-toast";
import Loader from '../../components/ui/Loader/Loader'
import {getListOrders, isNull} from "../../helpers";
import moment from "moment";


class Orders extends Component {
    state = {
        orders: [],
        loading: true,
        error: false
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(
                res => {
                    this.setState({
                        orders: getListOrders(res.data),
                        loading: false,
                        error: false
                    })
                }
            ).catch(e => {
            toast.error("Can not fetch your orders now. Please try again later")
            this.setState({
                orders: [],
                error: true,
                loading: false
            })
        })
    }

    render() {
        const orders = this.state.orders.filter(o => o.ingredients instanceof Array).sort((a, b) => {
            a= moment(a.createdAt).format("x")
            b= moment(b.createdAt).format("x")
            return +b - (+a);
        })
            .map(o => isNull(o.createdAt) ? {...o, createdAt: new Date()} : o)
            .map((order, i) => <Order key={order.id} order={order}/>)
        return (
            <div>
                {this.state.loading ? <Loader/> : this.state.error ?
                    <p style={{marginTop: '100px', textAlign: 'center'}}>Can not fetch your orders now. Please try again
                        later</p> : orders}
            </div>
        )
    }
}

export default Orders;