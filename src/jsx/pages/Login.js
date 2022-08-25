import React, { Component, Fragment, useState } from "react";
import ReactDOM from 'react-dom';
import { Link, useHistory } from "react-router-dom";
import firebase from './Firebase';
import { baseURL } from '../../config'

const Login = (props) => {

	const history = useHistory();
	const [loginData, setLoginData] = useState({
		"email": "",
		"pwd": ""
	});
	const [errors, setErrors] = useState({});
	const [err, setErr] = useState('');
	const [passwordShown, setPasswordShown] = useState(false);

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	  };

	const handleBlur = (e) => {
		const newLoginData = { ...loginData };
		newLoginData[e.target.name] = e.target.value;
		setLoginData(newLoginData);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (validate()) {
			const { email, pwd } = loginData;
			const ref = firebase.firestore().collection('restaurant').where("restaurant_email", "==", email).where("pwd", "==", pwd);
			ref.get().then((querySnapshot) => {
				if (querySnapshot.docs.length > 0) {
					querySnapshot.forEach((doc) => {
						localStorage.setItem('KF_ID', doc.id);
						localStorage.setItem('KF_EMAIL', doc.data().restaurant_email);
						localStorage.setItem('KF_USER', doc.data().restaurant_name);
						localStorage.setItem('KF_SITE', doc.data().restaurant_sites_count);
						history.push(`/owner-dashboard`)
					});
				} else {
					setErr('Your Email Id and Password does not match.');
				}
			}).catch((error) => {
				console.log("Error getting documents: ", error);
			});
		}
	};

	const validate = () => {

		let input = loginData;
		let errors = {};
		let isValid = true;
		if (!input["email"]) {
			isValid = false;
			errors["email_err"] = "Please Enter Your Email.";
		}else if(typeof input["email"] !== "undefined"){
			let lastAtPos = input["email"].lastIndexOf('@');
			let lastDotPos = input["email"].lastIndexOf('.');

			if (!(lastAtPos < lastDotPos && lastAtPos > 0 && input["email"].indexOf('@@') == -1 && lastDotPos > 2 && (input["email"].length - lastDotPos) > 2)) {
				isValid = false;
			   errors["email_err"] = "Email is not valid";
			 }
		}
		if (!input["pwd"]) {
			isValid = false;
			errors["pwd_err"] = "Please Enter Your Password.";
		}
		setErrors(errors);
		return isValid;
	}
	return (
		<Fragment>
			<div id="login" className="sem_padding">
				<div className="row bg-color m-0">
					<div className="col-lg-7 p-0">
						<div className="bg-images">
							<div className="absolutetext">
								<div className="logo">
									<img src="images/logo.png" className="img-fluid" />
								</div>
								<h3>GET YOUR</h3>
								<h2>FLOW</h2>
								<h4>RIGHT</h4>
							</div>
						</div>
					</div>
					<div className="col-lg-5 p-0">
						<div className="login-form">
							<h4>Enter Account</h4>
							<h6>to start working</h6>
							<p>enter your registered mail id and password you have created to login into your account</p>
							<form className="email-form" onSubmit={(e) => submitHandler(e)}>
								<div className="form-group">
									<label >Email</label>
									<input className="email form-padding form-control" type="text" onChange={handleBlur} id="email" name="email" placeholder="name@gmail.com" autoComplete="off" />
									<div className="text-danger">{errors.email_err}</div>
								</div>
								<div className="form-group">
									<label >Password</label>
									<input className="lock form-control" type={passwordShown ? "text" : "password"} id="pwd" onChange={handleBlur} name="pwd" placeholder="Password" autoComplete="off" />
									<div className="text-danger">{errors.pwd_err}</div>
									<button type="button" id="btnToggle" className="toggle"><i id="eyeIcon" className={passwordShown ? "fa fa-eye fa-eye-slash" : "fa fa-eye"} onClick={togglePasswordVisiblity}></i>
									</button>
								</div>
								<div className="text-danger">{err}</div>
								<input className="submit_btn" type="submit" value="continue" />
								<a className="Forgot" onClick={() => history.push(`/otp`)}><h5>Forgot Password ?</h5></a>
							</form>
						</div>
					</div>
				</div>
			</div>

		</Fragment>
	)
}

export default Login
