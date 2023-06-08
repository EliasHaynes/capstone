import React, { useState } from "react";
import cookie from 'cookie'
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
//   const navigate = useNavigate();

//   const [vin, setVin] = useState('')
//   const [mileage,setMileage] = useState('')


//   // const handleTextChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setState((prevState) => {
//   //     return {
//   //       ...prevState,
//   //       [name]: value,
//   //     };
//   //   });
//   // };

//   const login = (e) => {
//     e.preventDefault();
//     document.cookie = "loggedIn=true;Max-Age=1800";
//     navigate("/");
//   };

//   return (
//     <div className="App">
//       <Container maxWidth="sm">
//         <form className="login-form" onSubmit={login}>
//           <TextField
//             required
//           onChange={(e) => {
//             setVin(e.target.value)
//             console.log(vin)
//           }}
//             name="vin"
//             label="vin"
//             type="text"
//           />
//           <TextField
//             required
//             onChange={(e) => {
//                 setMileage(e.target.value)
//               console.log(mileage)
//             }}
//             name="mileage"
//             label="mileage"
//           />
//           <Button
//             type="submit"
//             className="login-button"
//             variant="contained"
//             color="primary"
//           >
//             Submit Info
//           </Button>
//         </form>
//       </Container>
//     </div>
//   );
};

export default Login;

// function Login() {
// //   const {
// //     loginWithRedirect, 
// //     logout, 
// //     user, 
// //     isAuthenticated,
// //     getAccessTokenSilently
// //   } = useAuth0()


// //   function callApi() {
// //     axios.get('http://localhost:3000/')
// //     .then(response => console.log(response.data))
// //     .catch(error => console.log(error))
// //   }

// //   async function callProtectedApi() {
// //     const token = await getAccessTokenSilently
// //     console.log(token)
// //   }

// //   console.log(isAuthenticated)
// //   return (
// //     <div>
// //       <h1>{isAuthenticated ? "Logged in" : "Logged Out"}</h1>
// //       <ul>
// //         <button onClick={loginWithRedirect}>Login</button>
// //         <button onClick={logout}>Logout</button>
// //       </ul>
// //       <button onClick={callProtectedApi}>Call Protected Api</button>
// //       {isAuthenticated && (
// //         <pre>{JSON.stringify(user,null,2)}</pre>
// //       )}
// //     </div>
// //   )
// }

// export default Login;