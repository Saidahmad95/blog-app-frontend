import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import User from "./Components/User/User";
import NavBar from "./Components/NavBar/NavBar";
import PostForm from "./Components/Post/PostForm";



function App() {
  return (
    <div className="App">
   
      <BrowserRouter>
      <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/users/:usersId" element={<User/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
