import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

			if (response.ok) {
				const data = await response.json();
				console.log(data);
				toast.success("Login successful");
        setTimeout(() => {
          navigator('/')
        }, 3000);
			} else {
				console.log("Wrong credentials");
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Navbar />
			<div className="container my-3 py-3">
				<h1 className="text-center">Login</h1>
				<hr />
				<div class="row my-4 h-100">
					<div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
						<form>
							<div class="my-3">
								<label for="display-4">School-ID</label>
								<input
									value={school_id}
									onChange={(e) => setSchoolId(e.target.value)}
									type="text"
									class="form-control"
									id="school_id"
									placeholder="123-0123"
								/>
							</div>
							<div class="my-3">
								<label for="floatingPassword display-4">Password</label>
								<input
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									type="password"
									class="form-control"
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
									class="my-2 mx-auto btn btn-dark"
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
