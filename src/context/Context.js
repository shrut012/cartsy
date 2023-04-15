import { createContext, useContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { cartReducer } from "./Reducers";
import { productReducer } from "./Reducers";

const Cart = createContext("");
faker.seed(40);

const Context = ({ children }) => {
	const products = [...Array(20)].map(() => ({
		id: faker.datatype.uuid(),
		name: faker.commerce.productName(),
		price: faker.commerce.price(),
		image: `${faker.image.nature()}?random=${Math.round(Math.random() * 1000)}`,
		// image: faker.image.image(),
		inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
		fastDelivery: faker.datatype.boolean(),
		ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
	}));

	// console.log(products);

	const [state, dispatch] = useReducer(cartReducer, {
		products: products,
		cart: [],
	});

	const [productState, productDispatch] = useReducer(productReducer, {
		byStock: false,
		byFastDelivery: false,
		byRating: 0,
		searchQuery: "",
	});

	// return <Cart.Provider value={{ products }}>{children}</Cart.Provider>;
	return (
		<Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
			{children}
		</Cart.Provider>
	);
};

export default Context;

export const CartState = () => {
	return useContext(Cart);
};