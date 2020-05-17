import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
const Login = () => {
	const [ formData, setFomData ] = useState({
		email: '',
		password: ''
	});
	const { email, password } = formData;

	const onChange = (e) =>
		setFomData({
			...formData,
			[e.target.name]: e.target.value
		});
	const onSubmit = async (e) => {
		e.preventDefault();

		console.log('success');
	};
	return (
		<Fragment>
			<h1 className="large text-primary">Sigb Up</h1>
			<p className="lead">
				<i className="fas fa-user" /> Sign Into Your Account
			</p>
			<form onSubmit={(e) => onSubmit(e)} className="form">
				<div className="form-group">
					<input
						type="email"
						onChange={(e) => onChange(e)}
						value={email}
						placeholder="Email Address"
						name="email"
					/>
					<small className="form-text">
						This site uses Gravatar so if you want a profile image, use a Gravatar email
					</small>
				</div>
				<div className="form-group">
					<input
						type="password"
						onChange={(e) => onChange(e)}
						value={password}
						placeholder="Password"
						name="password"
						minLength={6}
					/>
				</div>
				<input type="submit" className="btn btn-primary" defaultValue="Login" />
			</form>
			<p className="my-1">
				Don't have an account? <Link to="/register">Register</Link>
			</p>
		</Fragment>
	);
};

export default Login;
