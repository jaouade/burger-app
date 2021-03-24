import React,{Component} from 'react'
import classes from './Ingredient.module.css'
import PropTypes from 'prop-types'
class Ingredient extends Component{

    render() {
        let ingredient = null;
        switch (this.props.type) {
            case 'breadBottom':
                ingredient = <div className={classes.BreadBottom}/>;
                break;
            case 'breadTop':
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}/>
                        <div className={classes.Seeds2}/>
                    </div>
                )
                break;
            case 'meat':
                ingredient = <div className={classes.Meat}/>
                break;
            case 'bacon':
                ingredient = <div className={classes.Bacon}/>
                break;
            case 'cheese':
                ingredient = <div className={classes.Cheese}/>
                break;
            case 'salad':
                ingredient = <div className={classes.Salad}/>
                break;
            default: ingredient=null;


        }
        return ingredient;
    }


}
Ingredient.propTypes = {
    type : PropTypes.string.isRequired
}
export default Ingredient;
