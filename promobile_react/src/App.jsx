import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Adduser from "./components/user_page/add_user";
import Tables from "./components/user_table/add_user_table";
import Viewdetails from "./components/user_table/view_details";
import Editdetails from "./components/user_page/edit_details";


function App() {
  const [users,setUsers] = useState([]);
  console.log(users);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adduser" element={<Adduser setUsers={setUsers}/>}/>
        <Route path="/addusertable" element={<Tables users={users}/>}/>
        <Route path="/viewdetails" element={<Viewdetails/>}/>
        <Route path="/editdetails" element={<Editdetails users={users} setUsers={setUsers}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;