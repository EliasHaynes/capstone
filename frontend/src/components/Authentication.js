import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

const Authentication = () => {
  console.log("1 Authentication componentn hit")
    const [userMetadata, setUserMetadata] = useState(null);

    const {
        loginWithRedirect,
        logout,
        user,
        isAuthenticated,
        getAccessTokenSilently,
      } = useAuth0();

      useEffect(() => {
        console.log("2 Authentication useEffect hit")
        const getUserMetadata = async () => {
          console.log("3 getUserMetadata hit")
          const domain = "dev-qxzngmucus86xphq.us.auth0.com";
      
          try {
            console.log("4 Auth try block hit");
            const accessToken = await getAccessTokenSilently({
              authorizationParams: {
                audience: `https://${domain}/api/v2/`,
                scope: "read:current_user",
              },
            });

            console.log("5 The Access Token:", accessToken)
      
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
            console.log("6 the user details by url hit")
            const metadataResponse = await fetch(userDetailsByIdUrl, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });

            console.log("7 The meta data response:", metadataResponse)
      
            const { user_metadata } = await metadataResponse.json();
      
            setUserMetadata(user_metadata);
            console.log("8 The user meta data:", user_metadata)

            const postData = {
                parcel: user?.sub,
              };

              console.log("9 postData", postData)

              fetch('http://localhost:5000/passUId', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
              });
              console.log("10 after fetch")
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