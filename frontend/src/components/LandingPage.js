import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../index.css";
import Dashboard from "./Dashboard";

function LandingPage() {
  const navigate = useNavigate();

  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  // const saveUser = () =>  {
  //   axios.post('/passUId', )
  // }
  return (
    <div>
      <div className="desktop">
        {/* If user is autheticated substitue Hero content for Dashboard */}

      </div>
    </div>
  );
}

export default LandingPage;
