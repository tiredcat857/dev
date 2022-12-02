export default function BakeryItem(props) {
    const {item, updateCart, cart} = props;
    // const item = props.item;
    // const updateCart = props.updateCart;
    // const cart = props.cart;
    const handleClick = () => {
        const index = cart.indexOf(item);
        if (index > -1) { // only splice array when item is found
            alert("already in Favorite")
        }
        else {
            cart.push(item);
        }
        updateCart([...cart]);
    }

    const handleClick2 = (item) => {
        const index = cart.indexOf(item);
        if (index > -1) { // only splice array when item is found
            cart.splice(index, 1);// 2nd parameter means remove one item only
        }
        else {
            alert("nothing to remove")
        }
        updateCart([...cart]);
    }

    return (
        <div className="item-card">
            <img src = {item.image} />
            <br></br>
            <b> {item.name}  ${item.price} </b>
            <p align="left"> {item.description} </p>
            <p> <b>Flavor:</b> {item.flavor.join(", ")} </p>
            {
                item.allergy.length > 0
                ? <p> <b>Allergy:</b> {item.allergy.join(", ")} </p>
                : <p> <b>Allergy:</b> contains nuts and gluten </p>
            }
            <button onClick={handleClick}>Add to favorite</button>
            <button onClick={() => handleClick2(item)}>Remove from favorite</button>
        </div>	
    );
	
}