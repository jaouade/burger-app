import React from "react";
import classes from './Burger.module.css'
import Ingredient from "./Ingredients/Ingredient";

const burger = (props) => {
    let ingredients = Object.entries(props.ingredients)
        .map((e) => [...Array(e[1])].map((_, i) => {
            return (<Ingredient key={e[0] + i} type={e[0]}/>)
        })).reduce((arr,el)=>{
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