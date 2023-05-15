import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Home from "./components/Home";
import Navigation from "./components/Navigation";

function App() {
  return (
    <BrowserRouter> 
    <Navigation/>
      <Router />
     
    </BrowserRouter>
  );
}

export default App;


