import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const Login = () => {
	const [school_id, setSchoolId] = useState("");
	const [password, setPassword] = useState("");

	const navigator = useNavigate();

	const hanldeLogin = async (e) => {
		e.preventDefault();
		try {
			let response = await fetch("http://127.0.0.1:8000/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "applicatin/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					school_id,
					password,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				localStorage.setItem("full_name", data.user?.fullname);
				localStorage.setItem("custom_email", data.user?.custom_email);
				localStorage.setItem("token", data.token);
				localStorage.setItem("school_id", data.user?.school_id);
				toast.success("Login successful");
				setTimeout(() => {
					navigator("/");
				}, 3000);
			} else {
				toast.error(data.message);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Navbar />
			<ToastContainer />
			<div className="container my-3 py-3 w-full">
				<h1 className="text-center">Login</h1>
				<hr />
				<div className="row my-4 h-100">
					<div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
						<form>
							<div className="my-3">
								<label htmlFor="display-4">School-ID</label>
								<input
									value={school_id}
									onChange={(e) => setSchoolId(e.target.value)}
									type="text"
									className="form-control"
									id="school_id"
									placeholder="123-0123"
								/>
							</div>
							<div className="my-3">
								<label htmlFor="floatingPassword display-4">Password</label>
								<input
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									type="password"
									className="form-control"
									id="floatingPassword"
									placeholder="Password"
								/>
							</div>
							<div className="my-3">
								<p>
									New Here?{" "}
									<Link to="/register" className="text-decoration-underline text-info">
										Register
									</Link>{" "}
								</p>
							</div>
							<div className="text-center">
								<button
									onClick={hanldeLogin}
									className="my-2 mx-auto btn btn-dark"
									type="submit">
									Login
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Login;
