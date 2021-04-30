import {Component} from "react";

import Order from '../../components/Order/Order/Order'
import Loader from '../../components/ui/Loader/Loader'
import {isNull} from "../../helpers";
import moment from "moment";
import {connect} from "react-redux";
import {initOrders} from "../../store/actions";

class Orders extends Component {
    componentDidMount() {
        if (!this.props.fetched)
            this.props.onInitOrders(this.props.token,this.props.userId)

    }

    render() {
        const orders = this.props.orders.filter(o => o.ingredients instanceof Array).sort((a, b) => {
            a = moment(a.createdAt).format("x")
            b = moment(b.createdAt).format("x")
            return +b - (+a);
        })
            .map(o => isNull(o.createdAt) ? {...o, createdAt: new Date()} : o)
            .map((order, i) => <Order key={order.id} order={order}/>)
        return (
            <div>
                {this.props.loading ? <Loader/> : this.props.error ?
                    <p style={{marginTop: '100px', textAlign: 'center'}}>Can not fetch your orders now. Please try again
                        later</p> : orders}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error,
        fetched: state.order.fetched,
        token: state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitOrders: (token,userId) => dispatch(initOrders(token,userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);