import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = ({ saveUserData }) => {
  let navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function getUserData(eventInfo) {
    //deep copy of user
    let myUser = { ...user };
    //update user by changing the value of every item through the name of the input
    myUser[eventInfo.target.name] = eventInfo.target.value;
    //add the new values in the setuser
    setUser(myUser);
    // console.log(myUser);
  }
  async function sendLoginDataToApi() {
    let { data } = await axios.post(
      "https://handsome-cummerbund-fawn.cyclic.app/auth/login",
      user, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(data.user);


    if (data.token) {
      // if (data.message == "success") {
      console.log(data);

      setIsLoading(false);
      localStorage.setItem('userToken', data.token);
      saveUserData();
      console.log("saveUserData()");

      navigate('/');
    } else {
      setIsLoading(false);
      setError(data.errorMessage)
      console.log(data.errorMessage);
    }

  }

  function submitLoginForm(e) {
    e.preventDefault();
    setIsLoading(true);


    let validation = validateLoginForm();
    if (validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details);


    } else {
      sendLoginDataToApi();
    }

  }

  function validateLoginForm() {
    let schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,6}/).min(3).max(10).required(),
    });
    console.log(schema.validate(user, { abortEarly: false }));
    return schema.validate(user, { abortEarly: false });

  }
  console.log(saveUserData.children)
  return (
    <>

      <div className="my-body  p-5">
        <form onSubmit={submitLoginForm}>

          <label htmlFor="email">email: </label>
          {errorList.filter((err) => err.context.label == 'email')[0] ?
            <div className="alert alert-danger  p-0 my-3">
              <p>{errorList.filter((err) => err.context.label == 'email')[0]?.message}</p>
            </div> : ''}
          <input
            onChange={getUserData}
            type="email"
            className="form-control .my-input my-2"
            name="email"
            id="email"
          />
          <label htmlFor="password">password: </label>
          {errorList.filter((err) => err.context.label == 'password')[0] ?
            <div className="alert alert-danger  p-0 my-3">
              <p>"Password" is invalid</p>
            </div> : ''}
          <input
            onChange={getUserData}
            type="password"
            className="form-control .my-input my-2"
            name="password"
            id="password"
          />


          <button type="submit" className="btn btn-info my-4">
            {isLoading === true ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
