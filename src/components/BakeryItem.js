// TODO: create a component that displays a single bakery item
// const [count, setCount] = useState(0);


export default function BakeryItem(props) {
    const {item, updateCart, cart} = props;
    // const item = props.item;
    // const updateCart = props.updateCart;
    // const cart = props.cart;
    const handleClick = () => {
        updateCart([...cart, item]);
    }
	return (
        <div className="item">
            <img src = {item.image} />
            <p> {item.name}  ${item.price} </p>
            <p> {item.description} </p>
            <p> {item.flavor} </p>
            <p> {item.allergy} </p>
            <button onClick={handleClick}>Add to cart</button>
        </div>	
	);
}