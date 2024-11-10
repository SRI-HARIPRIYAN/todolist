import { BACKEND_URL } from "../../constant.js";
import { useUserContext } from "../../context.jsx";
const useSignUpHook = () => {
	const { setUser } = useUserContext();
	const signUp = async (userName, email, password) => {
		try {
			const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
				method: "POST",
				headers: { "Content-Type": "Application/json" },
				body: JSON.stringify({ userName, email, password }),
			});
			const data = await response.json();
			console.log("user data: ", data);
			setUser(data);
		} catch (error) {
			console.log(error);
		}
	};
	return { signUp };
};

export default useSignUpHook;
