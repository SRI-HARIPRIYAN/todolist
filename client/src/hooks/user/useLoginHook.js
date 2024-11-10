import axios from "axios";
import { BACKEND_URL } from "../../constant.js";
import { useUserContext } from "../../context.jsx";
const useLoginHook = () => {
	const { setUser } = useUserContext();
	const login = async (userName, password) => {
		try {
			const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "Application/json" },
				body: JSON.stringify({ userName, password }),
			});
			const data = await response.json();
			console.log("user data: ", data);
			setUser(data);
		} catch (error) {
			console.log(error);
		}
	};
	return { login };
};

export default useLoginHook;
