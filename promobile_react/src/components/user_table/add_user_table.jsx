import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { getTable, updateStatus, userDelete  } from "../../api/masterapi";


function Tables() {

  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [openMenu, setOpenMenu] = useState(null);
const [pagination, setPagination] = useState({
  totalItems: 0,
  totalPages: 1
});  const navigate = useNavigate();
console.log(user , "hewr");
useEffect(() => {
  fetchUsers();
}, [currentPage, rowsPerPage,sortConfig]);

const fetchUsers = async () => {
  try {
    const res = await getTable({
       page: currentPage,
        limit: rowsPerPage,
        sortBy: sortConfig.key,
       sortOrder: sortConfig.direction
      })

    if (res.success) {
      setUser(res.data);
      setPagination(res.pagination);
    }

  } catch (error) {
    console.log("Error fetching users", error);
  }
};
const sortBy = (key, direction) => {

  if (sortConfig.key === key && sortConfig.direction === direction) {
    setSortConfig({ key: null, direction: null });
    setCurrentPage(1);
    return;
  }

  setSortConfig({ key, direction });
  setCurrentPage(1);

};

const pageUsers = user.filter(u =>
  (u.name || "").toLowerCase().includes(search.toLowerCase())
);
const toggleStatus = async (index) => {

  const selectedUser = user[index];

  const newStatus = selectedUser.status === 1 ? 0 : 1;
console.log(selectedUser.name);

  try {

    // await axios.post(
    //   "http://localhost:3001/api/users/update-status",
    //   {
    //     id: selectedUser.id,
    //     status: newStatus,
    //   }
    // );

    await updateStatus({
      id:selectedUser.id,
      status:newStatus,
      updatedBy:selectedUser.name
    })
    fetchUsers();

  } catch (error) {
    console.log(error);
  }

};

const deleteUser = async (index) => {

  const selectedUser = user[index];

  try {

    // await axios.delete(
    //   `http://localhost:3001/api/users/${selectedUser.id}`
    // );

    await userDelete(selectedUser.id);

    fetchUsers();

  } catch (error) {
    console.log(error);
  }

};

const edit = (id) => {
  navigate("/editdetails", { state: { id } });
};

const views = (index) => {
  navigate("/viewdetails", {
    state: user[index]
  });
};
const start = (currentPage - 1) * rowsPerPage;
const totalPages = pagination.totalPages || 1;
  return (
<>
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        * {\n    color:black;\n        margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n            font-family: Poppins;\n        }\n\n        body {\n            background: #fff;\n        }\n\n        .nav {\n            position: fixed;\n            top: 0;\n            width: 100%;\n            padding: 18px 40px;\n            background: white;\n            font-size: 22px;\n            box-shadow: 0 2px 6px rgba(0,0,0,0.1);\n            z-index: 10;\n        }\n\n        .container {\n            margin: 0px 150px 0px 150px;\n                        border-radius: 10px;\n            box-shadow: 0 4px 8px rgba(0,0,0,0.15);\n        }\n\n        table {\n            width: 100%;\n    margin-top:10px;\n        border-collapse: collapse;\n        }\n\n        thead {\n            background: #d8433c;\n            border-radius: 10px 0px 0px 0px ;\n\n        }\n\n        th {\n            color: white;\n            padding: 12px;\n            text-align: center;\n            font-weight: 500;            \n        }\n\n        td {\n            padding: 10px;\n            text-align: center;\n\n        }\n\n        tbody tr:nth-child(even) {\n            background: #fff4f4;\n        }\n\n        .active {\n            color: green;\n            font-weight: 600;\n        }\n\n        .inactive {\n            color: red;\n            font-weight: 600;\n        }\n\n        .action-cell {\n            position: relative;\n        }\n\n        .dots {\n            cursor: pointer;\n            font-size: 18px;\n            user-select: none;\n        }\n\n        .menu {\n            display: none;\n            position: absolute;\n            right: 20px;\n            top: 30px;\n            width: 150px;\n            background: white;\n            border: 1px solid #ddd;\n            box-shadow: 0 4px 10px rgba(0,0,0,0.15);\n            border-radius: 4px;\n            z-index: 5;\n        }\n\n        .menu div {\n            padding: 10px;\n            cursor: pointer;\n            font-size: 14px;\n        }\n\n        .menu div:hover {\n            background: #f5f5f5;\n        }\n\n        .menu .danger {\n            color: red;\n        }\n        .myInput{\n            margin-top: 80px;\n            margin-left: 10px;\n            background-color: #d8433c;\n            padding: 8px;\n            color: white;\n            border: 0.1px solid grey ;\n            border-radius: 5px;\n            width:110px\n            \n        }\n        .mybtn{\n            margin-top: 80px;\n            margin-left: 80.5%;\n             margin-bottom: 10px;\n            background-color: white;\n            padding: 8px;\n            border: 0.1px solid grey ;\n            border-radius: 5px;\n        }\n        .one{\n            border-radius: 10px 0px 0px 0px ;\n        }\n        .two{\n            border-radius: 0px 10px 0px 0px ;\n        }\n\n        tr:last-child td:first-child {\n            border-radius: 0px 0px 0px 10px;       \n        }\n        tr:last-child td:last-child {\n            border-radius: 0px 0px 10px 0px;       \n        }\n        .sort-icons {\n            display: inline-flex;\n            flex-direction: column;       \n            line-height: 0.9;\n        }\n\n        .sort-icons span {\n            cursor: pointer;\n            font-size: 10px;\n        }\n\n    "
    }}
  />


  <div className="nav">
    <a style={{ textDecoration: "none", color: "black" }}>Users</a>
  </div>

<Link style={{ textDecoration: "none" }} to="/adduser" className="mybtn">+ Add User</Link>
    

<input
  type="text"
  placeholder="Filter"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="myInput"
/>
  <div className="container">
    <table>
      <thead>
        <tr>
          <th className="one">
            User Name
            <sup>
              <span className="sort-icons">
                <span onClick={() => sortBy("name", "asc")} style={{color:sortConfig.key === "name"? sortConfig.direction === "asc"? "white": " #d8433c": "white"}}>▲</span>
                <span onClick={() => sortBy("name", "desc")} style={{color:sortConfig.key === "name"? sortConfig.direction === "desc"? "white": "#d8433c": "white"}}>▼</span>
              </span>
            </sup>
          </th>
          <th>
            Role
            <sup>
              <span className="sort-icons">
                <span onClick={() => sortBy("role", "asc")}style={{color:sortConfig.key === "role"? sortConfig.direction === "asc"? "white": "#d8433c": "white"}}>▲</span>
                <span onClick={() => sortBy("role", "desc")}style={{color:sortConfig.key === "role"? sortConfig.direction === "desc"? "white": "#d8433c": "white"}}>▼</span>
              </span>
            </sup>
          </th>
          <th>
            Mobile No
            <sup>
              <span className="sort-icons">
                <span onClick={() => sortBy("phone", "asc")}style={{color:sortConfig.key === "phone"? sortConfig.direction === "asc"? "white": "#d8433c": "white"}}>▲</span>
                <span onClick={() => sortBy("phone", "desc")}style={{color:sortConfig.key === "phone"? sortConfig.direction === "desc"? "white": "#d8433c": "white"}}>▼</span>
              </span>
            </sup>
          </th>
          <th>
            Email ID
            <sup>
              <span className="sort-icons">
                <span onClick={() => sortBy("email", "asc")}style={{color:sortConfig.key === "email"? sortConfig.direction === "asc"? "white": "#d8433c": "white"}}>▲</span>
                <span onClick={() => sortBy("email", "desc")}style={{color:sortConfig.key === "email"? sortConfig.direction === "desc"? "white": "#d8433c": "white"}}>▼</span>
              </span>
            </sup>
          </th>
          <th>
            User Status
            <sup>
              <span className="sort-icons">
                <span onClick={() => sortBy("status", "desc")}style={{color:sortConfig.key === "status"? sortConfig.direction === "desc"? "white": "#d8433c": "white"}}>▲</span>
                <span onClick={() => sortBy("status", "asc")}style={{color:sortConfig.key === "status"? sortConfig.direction === "asc"? "white": "#d8433c": "white"}}>▼</span>
              </span>
            </sup>
          </th>
          <th className="two">Action</th>
        </tr>
      </thead>
<tbody>
  {pageUsers.length === 0 ? (
    <tr>
      <td colSpan="6" align="center">No users found</td>
    </tr>
  ) : (
    pageUsers.map((user, index) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.role}</td>
        <td>{user.phone}</td>
        <td>{user.email}</td>
        <td className={user.status === 1 ? "active" : "inactive"}>
          {user.status === 1 ? "Active" : "Inactive"}
        </td>
        <td className="action-cell">
        <span
        className="dots"
        onClick={() =>
        setOpenMenu(openMenu === index ? null : index)}>⋮</span>
                     <div className="menu" style={{ display: openMenu === index ? "block" : "none" }}>
                    <div onClick={() => {edit(user.id);setOpenMenu(null); }}>Edit</div>
                    <div onClick={() => {views(index);setOpenMenu(null); }}>View</div>
                    <div onClick={() => {toggleStatus(index);setOpenMenu(null); }}>Update Status</div>
                    <div  onClick={() => {deleteUser(index);setOpenMenu(null); }}>Delete</div>
                </div>
            </td>
      </tr>
    ))
  )}
</tbody>    
</table>
  </div>
  <br />
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "10px 250px 0 250px"
    }}
  >
    <span>
      Items per page
    <select
        value={rowsPerPage}
        onChange={(e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
        }}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>
    </span>
   <div>
  <span style={{ marginRight: 10 }}>
    Items {pagination.totalItems === 0 ? 0 : start + 1} -  {Math.min(start + rowsPerPage, pagination.totalItems)} of {pagination.totalItems}
  </span>

  <span
    onClick={() => setCurrentPage(1)}
    style={{ marginLeft: 10, cursor: "pointer" }}
  >
    I&lt;
  </span>

  <span
    onClick={() =>
      setCurrentPage((prev) => Math.max(prev - 1, 1))
    }
    style={{ marginLeft: 10, cursor: "pointer" }}
  >
    &lt;
  </span>

  <span
    onClick={() =>
      setCurrentPage((prev) =>
        Math.min(prev + 1, totalPages)
      )
    }
    style={{ marginLeft: 10, cursor: "pointer" }}
  >
    &gt;
  </span>

  <span
    onClick={() => setCurrentPage(totalPages)}
    style={{ marginLeft: 10, cursor: "pointer" }}
  >
    &gt;I
  </span>
</div>
  </div>
</>

  );
}

export default Tables;