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

  let sum = 0;

  const flavorData = [
    { id: "1", value: "chocolate" },
    { id: "2", value: "fruity" },
    { id: "3", value: "coffee" },
    { id: "4", value: "something else" },
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
  
  }


  const handleSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    let newList = filterList;

    if (isChecked) {
      //Add checked item into checkList
      filterList.push(value);
      setFilter(filterList); 
    } else {
      //Remove unchecked item from checkList
      newList = filterList.filter((item) => item !== value);
      setFilter(newList);
    }
  }


  return (
    <div className="App" id="wrapper">
      <div id="filters">
        <div id="filters-content">
        <p><b>Sort by</b></p>
        <input type="radio" value="price" name="sort" onChange={HandleOrder}/> Price
        <br></br>
        <input type="radio" value="name" name="sort" onChange={HandleOrder}/> Name

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

        <p><b>Filter by allergy</b></p>
        </div>
      </div>

      <div id="menu">
        <h1>Browse and mark your favorite cake slices <br></br>from <a href="https://pastichefinedesserts.com/"> Pastiche Fine Dessert </a></h1> 
        <div id="all-items">
        {/* {<UpdateMenu order={order} setOrder={setOrder} filter={filterList} menu={bakeryData} setMenu={setMenu}/>} */}
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
        <button onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;

