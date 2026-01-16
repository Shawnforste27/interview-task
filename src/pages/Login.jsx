import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, resetStatus } from "../redux/features/authSlice";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, status } = useSelector((state) => state.auth);

    
    useEffect(() => {
        dispatch(resetStatus());
    }, [dispatch]);

    
    useEffect(() => {
        if (status === "success") {
            navigate("/dashboard", { replace: true });
        }
    }, [status, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-sm p-6 rounded-lg shadow-md"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Login
                </h2>

                <input
                    className="w-full mb-3 px-3 py-2 border rounded"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    className="w-full mb-3 px-3 py-2 border rounded"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && (
                    <p className="text-red-500 text-sm mb-3 text-center">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

             
                <p className="text-xs text-gray-500 mt-4 text-center">
                    Test user: <b>emilys</b> / <b>emilyspass</b>
                </p>
            </form>
        </div>
    );
};

export default Login;
