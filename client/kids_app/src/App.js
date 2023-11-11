// import logo from './logo.svg';
import './App.css';
// import React, { Component } from 'react';
import React, { useEffect, useState } from 'react';
import { jwtDecode as decode } from "jwt-decode";

const clientId = "970353632939-3d743a1i9uu5q2l0esequd3uluqgtt7p.apps.googleusercontent.com";
// const clientSec = "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";


function App() {
  const [user, setUser] = useState({});

  function handleCallBacklResponse(response) {
    // console.log("encoded jwt id token: " + response.credential.id_token);  original coded message
    var userInfo = decode(response.credential);
    // console.log('hellooooo')
    console.log(userInfo);
    setUser(userInfo);
  }


  useEffect(() => {

    /*global google */
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCallBacklResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("SignInDiv"), 
      {theme: "outline", size:"large"}
    );
  },[] );


  
  return (
    <div className="App">
      <div id='SignInDiv'></div>
     {user &&
        <div>
          <h2>{user.email}</h2>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          
        </div>
     }
    </div>
  );
}

export default App;
