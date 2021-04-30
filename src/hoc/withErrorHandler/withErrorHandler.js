
import Modal from "../../components/ui/Modal/Modal";
import Wrapper from '../../hoc/Wrapper/Wrapper'
import React,{Component} from "react";
const withErrorHandler = (WrappedComponent,axios)=>{
    return class extends Component{
        state = {
            error : null
        }

        componentWillUnmount() {
            this.reqInterceptor = axios.interceptors.request.use(
                req => {
                    this.setState({error:null});
                    return req;
                }
            )
            this.resInterceptor = axios.interceptors.response.use(
                res=>res,error => {
                    this.setState({error:error});
                    return Promise.reject(error)
                }
            )
        }

        componentWillMount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }
        backdropClickedHandler=()=>{
            this.setState({error :null})
        }

        render() {
            return (
                <Wrapper>
                    <Modal show={this.state.error}
                           closeModal={this.backdropClickedHandler}
                    >
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Wrapper>
            )
        }


    };
}

export default withErrorHandler;