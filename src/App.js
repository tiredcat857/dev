import "./App.css";
import { useState, useEffect } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";
import UpdateMenu from "./components/UpdateMenu";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState(bakeryData);
  const [order, setOrder] = useState("default");
  const [filterList, setFilter] = useState([]);
  const [allergyList, setAllergy] = useState([]);

  let sum = 0;

  const flavorData = [
    { id: "1", value: "chocolate" },
    { id: "2", value: "fruity" },
    { id: "3", value: "coffee" },
    { id: "4", value: "something else" },
  ];

  const allergyData = [
    { id: "1", value: "gluten-free" },
    { id: "2", value: "nut-free" },
  ];

  const reset = () => {
    setCart([]);
  }

  

  const HandleOrder = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setOrder(value);
    }

    let newArray = menu; 
    // update based on order set
      if (value === "default") { 
        setMenu(newArray);
    } else if (value === "price") {
        newArray.sort((a,b) => a.price - b.price);
        setMenu(newArray);
    } else if (value === "name") {
        newArray.sort((a, b) => (a.name > b.name) ? 1 : -1);
        setMenu(newArray);
    } else {
        console.log("something wrong");
    }
  }

  // helper to find if two arrays share any common element
  const findCommonElements = (arr1, arr2) => {
    return arr1.some(item => arr2.includes(item))
  }

  // handle flavor filter
  const handleSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    let newList = filterList;

    if (isChecked) {
      //Add checked item into checkList
      newList = [...filterList, value]
      setFilter(newList); 
    } else {
      //Remove unchecked item from checkList
      newList = filterList.filter((item) => item !== value);
      setFilter(newList);
    }

    // use newArray to hold the updated menu.
    // default is the original menu to display all items if no filter is selected
    let newArray = menu; 
    
    // update based on filters selected
    if (newList.length > 0) {
      newArray = menu.filter(function (el) {
        return el.flavor.sort().toString() == newList.sort().toString() ||
        newList.every(val => el.flavor.includes(val))
      });
    }
    setMenu(newArray);
  }

  // handle allergy filter
  const handleSelect2 = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    let newList = allergyList;

    if (isChecked) {
      //Add checked item into checkList
      newList = [...allergyList, value]
      setAllergy(newList); 
    } else {
      //Remove unchecked item from checkList
      newList = allergyList.filter((item) => item !== value);
      setAllergy(newList);
    }

    // use newArray to hold the updated menu.
    // default is the original menu to display all items if no filter is selected
    let newArray = menu; 
    
    // update based on filters selected
    if (newList.length > 0) {
      newArray = menu.filter(function (el) {
        return el.allergy.sort().toString() == newList.sort().toString() ||
        newList.every(val => el.allergy.includes(val)) 
      });
    }
    setMenu(newArray);
  }


  return (
    <div className="App" id="wrapper">
      <div id="filters">
        <div id="filters-content">
        <p><b>Sort by</b></p>
        <input type="radio" value="price" name="sort" onChange={HandleOrder}/> Price
        <br></br>
        <input type="radio" value="name" name="sort" onChange={HandleOrder}/> Name

        <br></br>
        <br></br>
        <br></br>
        <p><b>Filter by flavor</b></p>
        {flavorData.map((item, index) => {
          return (
            <div key={item.id} className="checkbox-container">
              <input
                type="checkbox"
                name="flavor"
                value={item.value}
                onChange={handleSelect}
              />
              <label>{item.value}</label>
            </div>
          );
        })}

        <br></br>
        <br></br>
        <br></br>
        <p><b>Filter by allergy</b></p>
        
        {allergyData.map((item, index) => {
          return (
            <div key={item.id} className="checkbox-container">
              <input
                type="checkbox"
                name="allergy"
                value={item.value}
                onChange={handleSelect2}
              />
              <label>{item.value}</label>
            </div>
          );
        })}

      </div>
      </div>

      <div id="menu">
        <h1>Browse and mark your favorite cake slices <br></br>from <a href="https://pastichefinedesserts.com/"> Pastiche Fine Dessert </a></h1> 
        <div id="all-items">
        {<UpdateMenu order={order} setOrder={setOrder} filter={filterList} allergy={allergyList} menu={bakeryData} setMenu={setMenu}/>}
        {
          menu.map((item, index) => ( <div id="item-card"> <BakeryItem item={item} updateCart = {setCart} cart={cart}/> </div>))
        }
        </div>
      </div>
      

      <div id="cart">
        <div id="cart-content">
        <h2>Favorite</h2>
        {cart.length > 0
          ? cart.forEach(e => {sum+= e.price})
          : void(0)
        }
        {
          cart.length > 0
          ? cart.map(e => <p> {e.name}</p>)
          : void(0)
        }
        {/* {cart.forEach(e => {sum+= e.price})} */}
        <p>Total price: ${sum.toFixed(2)}</p>
        <button onClick={reset}>Reset favorite</button>
        </div>
      </div>
    </div>
  );
}

export default App;

