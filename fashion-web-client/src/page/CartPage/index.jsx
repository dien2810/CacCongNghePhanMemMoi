import { useEffect, useState } from "react";
import "../../assets/css/CartPage.css";
import Header from "../../components/Header";
import Logo from "../../components/Logo";
import Footer from "../../components/Footer";
import Total from "./total";
import Item from "./item";
import Category from "./category";
import axios from "axios";

function CartPage() {
	const [itemsInCart, setItemsInCart] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalItems, setTotalItems] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchCartData = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get("http://localhost:3000/cart", {
			params: { userId: "userId123" },
			});
			setItemsInCart(response.data.data);
			setTotalPrice(response.data.totalPrice);
			setTotalItems(response.data.totalItems);
		} catch (error) {
			console.error("Failed to fetch cart data:", error);
		} finally {
			setIsLoading(false);
		}
		};

		fetchCartData();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div style={{ backgroundColor: "var(--gray-color)" }}>
		<Header user={{ userId: "userId123" }} />
		<Logo location="Giỏ hàng" />
		<div style={{ minHeight: "calc(100vh - 450px)" }}>
			<section className="container-1056" style={{ flexDirection: "column" }}>
			<Category />
			{itemsInCart.map((item) => (
				<Item key={item.itemId} item={item} />
			))}
			</section>
			<Total totalPrice={totalPrice} totalItems={totalItems} />
		</div>
		<Footer />
		</div>
	);
}

export default CartPage;
