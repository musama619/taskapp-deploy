import { useState, useContext } from "react";
import { Signup } from "../api/Auth_API";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "./useAuth";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useContext(AuthContext);
    const { setAuth } = useAuth();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const data = {
            email: email,
            password: password,
        };

        try {
            const response = await Signup(data);
            localStorage.setItem("user", JSON.stringify(response.data));
            dispatch({ type: "LOGIN", payload: response.data });
            setIsLoading(false);
            setAuth(response.data.token);

        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    return { signup, error, isLoading };
};
