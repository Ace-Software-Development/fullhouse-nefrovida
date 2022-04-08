import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Manejo de Session con Auth0
export const Session = () => {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  if (error) {
    return (
        <div>Oops... {error.message}</div>
    );
  }

  if (isAuthenticated) {
    return (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>

        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log out
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={loginWithRedirect}>Log in</button>
      </div>
    );
  }
};