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

            const user_id = user?.sub.split('|')[1].toString()
            const postData = {
                parcel: user_id,
              };



              fetch('https://capstone-ten-lyart.vercel.app/passUId', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
              });

          } catch (e) {
            return "Error: " + e;
          }
        };
      
        getUserMetadata();
      }, [getAccessTokenSilently, user?.sub]);
       


    return (
        <>
            {
                isAuthenticated ? <button className="button-29" onClick={logout}>Log Out</button> : <button className="button-29" onClick={loginWithRedirect}>Log In</button>
            }
        </>
    )
}

export default Authentication;