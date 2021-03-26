import React from "react";
import classes from './Controls.module.css'
import Control from './Control/Control'
import NumberFormat from 'react-number-format'
const controllers=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'}
];
const controls = (props) => (
     <div className={classes.Controls}>
        <NumberFormat value={parseFloat(props.price).toPrecision(4)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        {controllers.map(
            ctrl=> <Control loading={props.loading} disabled={props.disabled[ctrl.type]} key={ctrl.label} label={ctrl.label} added = {()=>props.ingredientAdded(ctrl.type)} removed = {()=>props.ingredientRemoved(ctrl.type)}/>
        )}
        <button disabled={!props.purchasable || props.loading} onClick={props.ordered} className={classes.OrderButton} >ORDER NOW!</button>
    </div>
);

export default controls;