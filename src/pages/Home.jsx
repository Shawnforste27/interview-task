import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories } from "../redux/features/productSlice";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

const Home = () => {
    const dispatch = useDispatch();
    const { products, categories, total, loading } = useSelector(
        (state) => state.products
    );

    const [page, setPage] = useState(1);
    const [category, setCategory] = useState("all");

    const limit = 8;
    const skip = (page - 1) * limit;

    useEffect(() => {
        dispatch(fetchProducts({ limit, skip, category }));
    }, [dispatch, limit, skip, category]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const totalPages = Math.ceil(total / limit);

    return (
        <>
            <Navbar />

            <div className="p-6">
                <select
                    className="border px-3 py-2 mb-4"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setPage(1);
                    }}
                >
                    <option value="all">All</option>
                    {categories.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="grid grid-cols-4 gap-4">
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}

                <div className="flex gap-2 mt-6">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-3 py-1 border ${page === i + 1 ? "bg-blue-500 text-white" : ""
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
