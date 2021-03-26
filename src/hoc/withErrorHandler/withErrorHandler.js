
import Modal from "../../components/ui/Modal/Modal";
import Wrapper from '../../hoc/Wrapper/Wrapper'
import React,{Component} from "react";
const withErrorHandler = (WrappedComponent,axios)=>{
    return class extends Component{
        state = {
            error : null
        }
        componentDidMount() {
            axios.interceptors.request.use(
                req => {
                    this.setState({error:null});
                    return req;
                }
            )
            axios.interceptors.response.use(
                res=>res,error => {
                    this.setState({error:error});
                }
            )

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