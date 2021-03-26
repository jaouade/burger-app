import React from "react";
import classes from './Burger.module.css'
import Ingredient from "./Ingredients/Ingredient";

const burger = (props) => {
    let ingredients = props.ingredients.map(ingr => {
            return (<Ingredient key={ingr.name} type={ingr.name}/>)
        }).reduce((arr,el)=>{
           return arr.concat(el)
        },[]);
    if (ingredients.length===0){
        ingredients = <p>Please Start adding ingredients...</p>
    }
    return (
        <div className={classes.Burger}>
            <Ingredient type='breadTop'> </Ingredient>
            {ingredients}
            <Ingredient type='breadBottom'> </Ingredient>
        </div>
    );
}
export default burger;