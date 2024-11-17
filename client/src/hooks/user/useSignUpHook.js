import { useState } from "react";
import { BACKEND_URL } from "../../constant.js";
import { useUserContext } from "../../context.jsx";
import { toast } from "react-toastify";
const useSignUpHook = () => {
	const [loading, setLoading] = useState(false);
	const { setUser } = useUserContext();
	const signUp = async (userName, email, password) => {
		if (!userName || !email || !password) {
			toast.error("Please fill all the fields");
			return;
		}
		setLoading(true);
		try {
			const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
				method: "POST",
				headers: { "Content-Type": "Application/json" },
				body: JSON.stringify({ userName, email, password }),
				credentials: "include",
			});
			const data = await response.json();
			if (data["error"]) {
				throw new Error(data.error || "Please fill all the data");
			}
			console.log("user data: ", data);
			setUser(data);
			navigate("/tasks/dashboard");
			toast.success("Signed in successfully");
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
