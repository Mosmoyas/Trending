import React from 'react';
const Profile = ({ userData }) => {
    // console.log({ userData })
    // if (!userData) {
    //     return <p>No user data available.</p>;
    // }
    // else {
    let { first_name, last_name, email } = userData;
    return (<>
        {userData ? <>
            <h1>My Profile</h1>
            <p>First Name: {first_name}</p>
            <p>Last Name: {last_name}</p>
            <p>Email: {email}</p>
        </> : ""}


        {/* <p>Age: {age}</p> */}

    </>)


    // }
}

export default Profile

