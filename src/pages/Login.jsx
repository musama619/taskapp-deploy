import { useState, useContext } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoading, error } = useLogin();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);
            navigate("/");
        } catch (error) {}
    };
    return (
        <div>
            <div class="px-6 h-full text-gray-800">
                <div class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                    <div class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            class="w-full"
                            alt="Sample image"
                        />
                    </div>
                    <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                        <form>
                            <div class="mb-6">
                                <input
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                                    id="exampleFormControlInput2"
                                    placeholder="Email address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div class="mb-6">
                                <input
                                    type="password"
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                                    id="exampleFormControlInput2"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            <div class="text-center lg:text-left">
                                <button
                                    class="inline-block px-7 py-3 bg-orange-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out"
                                    disabled={isLoading}
                                    onClick={handleSubmit}
                                >
                                    Login
                                </button>
                                {error && <div>{error}</div>}

                                <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                                    Don't have an account?
                                    <button
                                        class="text-red-600 mx-2 hover:text-red-700 outline-none border-none cursor-pointer focus:text-red-700 transition duration-200 ease-in-out"
                                        onClick={() => navigate("/signup")}
                                    >
                                        Register
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
