import { useState, useEffect } from "react";

export default function DisplayMenu(props) {
    const {order, setOrder, filter, menu, setMenu} = props;
    
    // helper to find if two arrays share any common element
    const findCommonElements = (arr1, arr2) => {
        return arr1.some(item => arr2.includes(item))
    }

    let newArray = menu; //display all if no filter is selected

    useEffect(() => {
        if (filter.length > 0) {
            newArray = menu.filter(function (el) {
                return findCommonElements(el.flavor, filter)
            });
        }


        if (order === "default") { 
            setMenu(newArray);
        } else if (order === "price") {
            newArray.sort((a,b) => a.price - b.price);
            setMenu(newArray);
        } else if (order === "name") {
            newArray.sort((a, b) => (a.name > b.name) ? 1 : -1);
            setMenu(newArray);
        } else {
            console.log("something wrong");
        }
        
    }, [order, filter]);
    
    return (<div classname="menu">  
    </div>);
}