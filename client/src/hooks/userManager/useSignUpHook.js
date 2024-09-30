import { useDispatch } from "react-redux";
import { loginSuccess, setLoading } from "../../slices/userSlice";
const useSignUp = () => {
	const dispatch = useDispatch();
	const signUp = async (userName, password, confirmPassword) => {
		try {
			dispatch(setLoading(true));
			const res = await fetch("http://localhost:5000/api/users/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userName, password, confirmPassword }),
			});
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || "signup failed");
			}
			const user = await res.json();

			dispatch(loginSuccess(user));
		} catch (error) {
			console.log(error.message);
		} finally {
			dispatch(setLoading(false));
		}
	};
	return { signUp };
};

export default useSignUp;
