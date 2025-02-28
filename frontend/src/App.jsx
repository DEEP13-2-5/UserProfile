import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./Userprofile";
import Signup from "./SIgnup";
import Login from "./Login"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
