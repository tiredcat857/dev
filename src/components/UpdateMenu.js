import { useState, useEffect } from "react";

export default function UpdateMenu(props) {
    const {order, setOrder, filter, allergy, menu, setMenu} = props;
    
    // helper to find if two arrays share any common element
    const findCommonElements = (arr1, arr2) => {
        return arr1.some(item => arr2.includes(item))
    }

    // use newArray to hold the updated menu.
    // default is the original menu to display all items if no filter is selected
    let newArray = menu; 

    useEffect(() => {

        // update based on filters selected
        if (filter.length > 0) {
            newArray = menu.filter(function (el) {
                return el.flavor.sort().toString() == filter.sort().toString() ||
                filter.every(val => el.flavor.includes(val)) 
            });
        }

        if (allergy.length > 0) {
            newArray = newArray.filter(function (el) {
                return el.allergy.sort().toString() == allergy.sort().toString() ||
                allergy.every(val => el.allergy.includes(val)) 
            });
        }

        // update based on order set
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
        
    }, [order, filter, allergy, menu]);
    
    return (<div className="menu">  
    </div>); // returns nothing because render is in a different function
}