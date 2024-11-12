import { useState } from "react";
import { BACKEND_URL } from "../../constant.js";
import { useUserContext } from "../../context.jsx";
import { toast } from "react-toastify";

const useSignUpHook = () => {
	const [loading, setLoading] = useState(false);
	const { setUser } = useUserContext();

	const signUp = async (userName, email, password) => {
		setLoading(true);
		try {
			const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
				method: "POST",
				headers: { "Content-Type": "Application/json" },
				body: JSON.stringify({ userName, email, password }),
				credentials: "include",
			});
			const data = await response.json();
			console.log("user data: ", data);
			setUser(data);
			setLoading(false);
		} catch (error) {
			toast.error(error?.message || error);
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	return { signUp, loading };
};

export default useSignUpHook;
