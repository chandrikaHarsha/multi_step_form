import { Route,Routes } from "react-router-dom";
import Home from "./Home";
import RegistrationForm from "./Forms/RegistrationForm";

function App() {
  return (
    <Routes>
      <Route path="" element={<Home/>}/>
      <Route path="/register" element={<RegistrationForm/>}/>
    </Routes>
  );
}

export default App;
