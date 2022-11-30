import "./App.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  
  const [cart, setCart] = useState([]);
  let sum = 0;
  return (
    <div className="App" id="wrapper">
      <div id="w70">
        <h1>My Bakery</h1> 
        {bakeryData.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
            <BakeryItem item={item} updateCart = {setCart} cart={cart}/>
            // <p> item.price </p>
          //  <p>Bakery Item {index}</p> // replace with BakeryItem component
        ))}
      </div>
      

      <div id="w30">
        <h2>Cart</h2>
        {cart.map(e => <p> {e.name}</p>)}
        {cart.forEach(e => {sum+= e.price})}
        <p>Total: ${sum}</p>
      </div>
    </div>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
