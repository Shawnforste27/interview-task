import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
    const cartItems = useSelector((state) => state.cart.items);

    const totalCount = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (
        <div className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
            <Link to="/dashboard" className="text-xl font-bold">
                MyStore
            </Link>

            <Link to="/checkout" className="relative">
                🛒 Cart
                <span className="ml-2 bg-red-500 px-2 py-1 rounded-full text-sm">
                    {totalCount}
                </span>
            </Link>
        </div>
    );
};

export default Navbar;
