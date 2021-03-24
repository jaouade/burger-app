import React,{Component} from 'react'
import Wrapper from '../Wrapper/Wrapper'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
class Layout extends Component{
    state= {
        showSideDrawer : false
    }
    sideDrawerClosedHandler=()=>{
        this.setState({
            showSideDrawer:false
        })
    }
    sideDrawerOpenedHandler=()=>{
        this.setState((prevSte)=>{
           return {showSideDrawer:!prevSte.showSideDrawer}
        })
    }
   render() {
     return (
         <Wrapper>
             <div>
                 <Toolbar clicked={this.sideDrawerOpenedHandler}/>
                 <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
             </div>
             <main className={classes.content}>
                 {this.props.children}
             </main>

         </Wrapper>
     );
   }
}


export default Layout;