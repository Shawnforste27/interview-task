import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <div className="border p-4 rounded shadow">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="h-40 w-full object-cover mb-2"
            />
            <h3 className="font-semibold">{product.title}</h3>
            <p className="mb-2">${product.price}</p>

            <button
                onClick={handleAddToCart}
                className="bg-green-500 text-white px-3 py-1 rounded"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
