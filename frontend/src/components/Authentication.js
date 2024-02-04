import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

const Authentication = () => {

    const [userMetadata, setUserMetadata] = useState(null);

    const {
        loginWithRedirect,
        logout,
        user,
        isAuthenticated,
        getAccessTokenSilently,
      } = useAuth0();

      useEffect(() => {
        const getUserMetadata = async () => {
          const domain = "dev-qxzngmucus86xphq.us.auth0.com";
      
          try {
            const accessToken = await getAccessTokenSilently({
              authorizationParams: {
                audience: `https://${domain}/api/v2/`,
                scope: "read:current_user",
              },
            });
      
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
            const metadataResponse = await fetch(userDetailsByIdUrl, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });


      
            const { user_metadata } = await metadataResponse.json();
      
            setUserMetadata(user_metadata);


            const postData = {
                parcel: user?.sub,
              };



              fetch('http://localhost:5000/passUId', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
              });

          } catch (e) {
            console.log(e.message);
          }
        };
      
        getUserMetadata();
      }, [getAccessTokenSilently, user?.sub]);
       


    return (
        <>
            {
                isAuthenticated ? <button onClick={logout}>Log Out</button> : <button onClick={loginWithRedirect}>Log In</button>
            }
        </>
    )
}

export default Authentication;