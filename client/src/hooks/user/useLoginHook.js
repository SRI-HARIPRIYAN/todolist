import axios from "axios";
import { BACKEND_URL } from "../../constant.js";
import { useUserContext } from "../../context.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const useLoginHook = () => {
	const [loading, setLoading] = useState(false);
	const { setUser } = useUserContext();
	const navigate = useNavigate();
	const login = async (userName, password) => {
		try {
			setLoading(true);
			const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "Application/json" },
				body: JSON.stringify({ userName, password }),
				credentials: "include",
			});
			const data = await response.json();
			if (data.error) {
				throw new Error(data.error);
			}
			console.log("user data: ", data);
			setUser(data);
			navigate("/tasks/dashboard");
			toast.success("Logged in successfully");
		} catch (error) {
			toast.error(error?.message || error);
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	return { login, loading };
};

export default useLoginHook;
