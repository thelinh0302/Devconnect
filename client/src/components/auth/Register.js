import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [ formData, setFomData ] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});
	const { name, email, password, password2 } = formData;

	const onChange = (e) =>
		setFomData({
			...formData,
			[e.target.name]: e.target.value
		});
	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			console.log('password do not match');
			setAlert('Passwords do not match', 'danger');
		} else {
			register({ name, email, password });
		}
	};
	//redirect if login in
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<Fragment>
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead">
				<i className="fas fa-user" /> Create Your Account
			</p>
			<form onSubmit={(e) => onSubmit(e)} className="form" action="create-profile.html">
				<div className="form-group">
					<input type="text" placeholder="Name" onChange={(e) => onChange(e)} value={name} name="name" />
				</div>
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
				<div className="form-group">
					<input
						type="password"
						onChange={(e) => onChange(e)}
						value={password2}
						placeholder="Confirm Password"
						name="password2"
						minLength={6}
					/>
				</div>
				<input type="submit" className="btn btn-primary" defaultValue="Register" />
			</form>
			<p className="my-1">
				Already have an account? <Link to="/login">Sign In</Link>
			</p>
		</Fragment>
	);
};
Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
