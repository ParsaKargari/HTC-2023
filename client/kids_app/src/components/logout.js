// Logout.js
import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = "970353632939-2r4cgunv0n32n1jhl3mi5e3ttdsfgs1n.apps.googleusercontent.com";

function Logout() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
  };

  return (
    <div id='logoutButton'>
      <GoogleLogout
        clientId={clientId}
        buttonText={'Logout'}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;
