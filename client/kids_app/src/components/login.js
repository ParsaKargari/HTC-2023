// Login.js
import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = "970353632939-2r4cgunv0n32n1jhl3mi5e3ttdsfgs1n.apps.googleusercontent.com";

function Login() {

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    // Uncomment the following line if you want to show an alert
    // alert(`Logged in successfully, welcome ${res.profileObj.name} 😍.`);
  }

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    // Uncomment the following line if you want to show an alert
    // alert(`Failed to login. 😢`);
  }

  return (
    <div id="signinButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        // Uncomment the following line if you want to apply custom styles
        // style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;


//login info: 
// client id: 970353632939-2r4cgunv0n32n1jhl3mi5e3ttdsfgs1n.apps.googleusercontent.com
// client secret: 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