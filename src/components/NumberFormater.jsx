import React from "react";


const NumberFormat = ({number}) =>{
    
        const formattedNumber = new Intl.NumberFormat('en-US').format(number);
    return <span>{formattedNumber}</span>
};

export default NumberFormat;