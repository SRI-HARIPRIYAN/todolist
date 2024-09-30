import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SignIn from "./SignIn.jsx";
const Header = () => {
	const { user } = useSelector((state) => state.user);
	const [isSignup, setIsSignUp] = useState(false);
	return (
		<div className=" h-20 bg-slate-200 text-black  flex justify-around items-center">
			{isSignup && <SignIn setIsSignUp={setIsSignUp} />}
			<h2>Welcome user</h2>
			<button>Logout</button>
			<button onClick={() => setIsSignUp(true)}>Signin</button>
			<p>user:{user?._id} </p>
		</div>
	);
};

export default Header;
