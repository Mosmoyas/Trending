import axios from "axios";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const Register = () => {
  //steps
  //-- create userstate to user and function getuserdata
  //--set api with axios in the function sendRegisterDataToApi and call to in submit
  //-- create submitRegisterform and  call it in the form onSubmit action
  //-create usestate function to handle the error when the submit returns error
  let navigate = useNavigate();

  const [errorList, setErrorList] = useState([]);

  //
  const [isLoading, setIsLoading] = useState(false)
  //set errors
  const [error, setError] = useState('');
  // the code initializes a user state object using the useState hook, with default values for first_name, last_name, email, password, and age
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: 0,
  });
  //defines a function getUserData that updates the user state object whenever an input element's value changes by making a deep copy of the user object and updating the property corresponding to the input's name attribute.
  function getUserData(eventInfo) {
    //deep copy of user
    let myUser = { ...user };
    //update user by changing the value of every item through the name of the input
    myUser[eventInfo.target.name] = eventInfo.target.value;
    //add the new values in the setuser
    setUser(myUser);
    console.log(myUser);
  }
  //--set The sendRegisterDataToApi function uses the axios library to send an HTTP POST request to a specified API endpoint URL with the user object as the request body.
  //   async function sendRegisterDataToApi() {
  //     setIsLoading(false)

  //     try {
  //       let { data } = await axios.post(
  //         "https://handsome-cummerbund-fawn.cyclic.app/auth/register",
  //         user, {
  //         headers: { 'Content-Type': 'application/json' }
  //       });

  //       if (data.message === "User Created Successfully") {
  //         setIsLoading(false)

  //         //login||Home
  //         console.log('directed')
  //       } else {
  //         setIsLoading(false)

  // console.log(error.response.data)      }
  //     } catch (error) {
  //       setError("An error occurred while registering. Please try again later.");
  //     }
  //   }

  //The submitRegisterForm function is used as a callback for the form's onSubmit event. It calls the preventDefault method to prevent the default form submission behavior and then calls the sendRegisterDataToApi function to send the user data to the API endpoint.

  async function sendRegisterDataToApi() {
    try {
    let { data } = await axios.post(
      "https://handsome-cummerbund-fawn.cyclic.app/auth/register",
      user, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (data.message === "User Created Successfully") {
      setIsLoading(false)

      //login||Home
      navigate('/login')
      console.log('directed');
    } else {
      setIsLoading(false);
      // handle other responses
      console.log(data.errorMessage)
       setError(data.errorMessage) 
     
    }
      } catch (error) {
        setIsLoading(false);
      setError(error.response.data.errorMessage);
      console.log(error.response.data.errorMessage)

      }
  }

  function submitRegisterForm(e) {
    e.preventDefault();
    setIsLoading(true);


    let validation = validateRegisterForm();
    if (validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details);


    } else {
      sendRegisterDataToApi();
    }

  }

  function validateRegisterForm() {
    let schema = Joi.object({
      first_name: Joi.string().pattern(/^[A-Z]/).min(3).max(10).required(),
      last_name: Joi.string().min(3).max(10).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,6}/).min(3).max(10).required(),
      age: Joi.number().min(16).max(80).required(),
    });
    console.log(schema.validate(user, { abortEarly: false }));
    return schema.validate(user, { abortEarly: false });

  }
  return (
    <>
      <div className="my-body  p-5">
        {error ? <p className="alert alert-danger">{error}</p>:""
}
        <form onSubmit={submitRegisterForm}>
          <label htmlFor="first_name">first_name: </label>
          {errorList.filter((err) => err.context.label == 'first_name')[0] ?
            <div className="alert alert-danger  p-0 my-3">
              <p>{errorList.filter((err) => err.context.label == 'first_name')[0]?.message}</p>
            </div> : ''}
          <input
            onChange={getUserData}
            type="text"
            className="form-control .my-input my-2"
            name="first_name"
            id="first_name"
          />

          <label htmlFor="last_name">last_name: </label>
          {errorList.filter((err) => err.context.label == 'last_name')[0] ?
            <div className="alert alert-danger  p-0 my-3">
              <p>{errorList.filter((err) => err.context.label == 'last_name')[0]?.message}</p>
            </div> : ''}
          <input
            onChange={getUserData}
            type="text"
            className="form-control .my-input my-2"
            name="last_name"
            id="last_name"
          />
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
              {/* <p>{errorList.filter((err) => err.context.label == 'password')[0]?.message}</p> */}
              <p>"Password" is invalid</p>
            </div> : ''}
          <input
            onChange={getUserData}
            type="password"
            className="form-control .my-input my-2"
            name="password"
            id="password"
          />
          <label htmlFor="age">age: </label>
          {errorList.filter((err) => err.context.label == 'age')[0] ?
            <div className="alert alert-danger  p-0 my-3">
              <p>{errorList.filter((err) => err.context.label == 'age')[0]?.message}</p>
            </div> : ''}
          <input
            onChange={getUserData}
            type="number"
            className="form-control .my-input my-2"
            name="age"
            id="age"
          />

          <button type="submit" className="btn btn-info my-4">
            {isLoading === true ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
