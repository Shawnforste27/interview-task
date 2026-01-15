import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../redux/features/cartSlice";
import Navbar from "../components/Navbar";

const Checkout = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <>
            <Navbar />

            <div className="p-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Checkout</h2>

                {cartItems.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                    <>

                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between border p-4 rounded"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div>
                                            <h3 className="font-semibold">{item.title}</h3>
                                            <p className="text-sm text-gray-600">
                                                ${item.price} × {item.quantity}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <p className="font-semibold">
                                            ${item.price * item.quantity}
                                        </p>
                                        <button
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="text-red-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className="mt-6 border-t pt-4 flex justify-between items-center">
                            <h3 className="text-xl font-bold">Total</h3>
                            <h3 className="text-xl font-bold">
                                ${totalPrice.toFixed(2)}
                            </h3>
                        </div>


                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={() => dispatch(clearCart())}
                                className="px-4 py-2 border rounded"
                            >
                                Clear Cart
                            </button>

                            <button
                                className="px-6 py-2 bg-green-600 text-white rounded"
                                onClick={() => alert("Order placed successfully!")}
                            >
                                Place Order
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Checkout;
