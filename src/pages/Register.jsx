import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { json } from "react-router-dom/dist";

const Register = () => {
	const [fullname, setFullname] = useState("");
	const [school_id, setSchoolId] = useState("");
	const [custom_email, setCustomEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			let response = await fetch("http://127.0.0.1:8000/api/register", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fullname,
					school_id,
					custom_email,
					password,
				}),
			});

			const data = await response.json();
			console.log(data);

			if (response.ok) {
				const json = await response.json();
				toast.success("Registration successful");
				setTimeout(() => {
					navigate("/login");
				}, 3000);
			}
		} catch (error) {
			console.error("Registration failed:", error);
			toast.error("Registration failed");
		}
	};

	return (
		<>
			<Navbar />
			<div className="container my-3 py-3">
				<h1 className="text-center">Register</h1>
				<hr />
				<div className="row my-4 h-100">
					<div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
						<form>
							<div className="form my-3">
								<label>Full Name</label>
								<input
									value={fullname}
									onChange={(e) => setFullname(e.target.value)}
									type="text"
									className="form-control"
									id="fullname"
									placeholder="Enter Your Name"
									name="fullname"
								/>
							</div>
							<div className="form my-3">
								<label>School_id</label>
								<input
									value={school_id}
									onChange={(e) => setSchoolId(e.target.value)}
									type="text"
									className="form-control"
									id="school_id"
									placeholder="Enter Your School ID"
									name="school_id"
								/>
							</div>
							<div className="form my-3">
								<label>Email address</label>
								<input
									value={custom_email}
									onChange={(e) => setCustomEmail(e.target.value)}
									type="email"
									className="form-control"
									id="custom_email"
									placeholder="name@carsu.edu.ph"
									name="custom_email"
								/>
							</div>
							<div className="form  my-3">
								<label>Password</label>
								<input
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									type="password"
									className="form-control"
									id="Password"
									placeholder="Password"
									name="password"
								/>
							</div>
							<div className="text-center">
								<button
									onClick={handleSubmit}
									className="my-2 mx-auto btn btn-dark"
									type="submit">
									Register
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Footer />
			<ToastContainer />
		</>
	);
};

export default Register;
