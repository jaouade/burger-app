import React,{ Component } from "react";
import classes from './Modal.module.css'
import Wrapper from '../../../hoc/Wrapper/Wrapper'
import Backdrop from '../Backdrop/Backdrop'
class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    render() {
      return (
          <Wrapper>
              <Backdrop clicked={this.props.closeModal} show={this.props.show}/>
              <div className={classes.Modal}
                   style={{
                       'transform' : this.props.show ? 'translateY(-10vh)' : 'translateY(-1000vh)',
                       'opacity' : this.props.show ? 1 : 0
                   }}
              >
                  {this.props.children}
              </div>
          </Wrapper>

      );
    }
}


export default Modal;