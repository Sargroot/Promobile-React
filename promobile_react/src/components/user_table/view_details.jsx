import { useParams , useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../../services/api";
import Bread from "../Breadcrumbs/breadcrumbs";


function Viewdetails(){

  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { id } = useParams();
  const loc = window.location.href;

 useEffect(() => {

    if(!id) return;

    const fetchUser = async () => {
      try{
        const res = await getUserById(id)

        if(res.success){
          setData(res.data);
        }

      }catch(error){
        console.log("Error fetching user",error);
      }
    };

    fetchUser();

  },[id]);
    return(
        <>
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n    *{\n        margin: 0;\n        padding: 0;\n        font-family: Poppins;\n    }\n    nav{\n        position: fixed;\n       top: 0;\n        width: 100%;\n        padding: 18px 40px;\n        background: white;\n        font-size: 25px;\n        box-shadow: 0 2px 6px rgba(0,0,0,0.1);\n        z-index: 10;\n\n    }\n    .container_o{\n        width:35%;\n        height: 30%;\n        box-shadow: 0 2px 6px rgba(0,0,0,0.45);\n        margin: 150px 0px 0px 270px;\n        border-radius: 10px;\n        background-color: whitesmoke;\n        padding: 40px;      \n\n    }\n    .container_in{  \n    display: grid;\n    column-gap: 60px;\n    grid-template-columns: repeat(2,1fr);\n\n    }\n    .move{\n    background-color: transparent;\n    border: 2px solid #d8433c;\n    color: #d8433c;\n    border-radius: 10px;\n    width: 100px;\n    height: 40px;\n    font-weight: 900;\n    }\n    .a{\n        margin: 0;\n        color: rgb(128, 128, 128);\n        font-size: 14px;\n    }\n    .b{\n  color:black;\n      margin: 0;\n        font-size: 16px;\n    }\n\n\n\n"
    }}
  />
  <nav>
    <h4 style={{ textDecoration: "none", color: "black" ,fontWeight: "400"}}> <Bread/></h4>

  </nav>
  <main>
    <div className="container_o">
      <div className="container_in">
            <div>
              <p className="a">Status</p>
              <p className="b">{data.status === 1 ? "Active" : "Inactive"}</p><br />

              <p className="a">Mobile No</p>
              <p className="b">{data.phone}</p><br />

              <p className="a">Country</p>
              <p className="b">{data.country}</p><br />

              <p className="a">City / Village Name</p>
              <p className="b">{data.city}</p><br />

              <p className="a">Address No</p>
              <p className="b">{data.addressNo}</p><br />

              <p className="a">Created on</p>
              <p className="b">{new Date(data.createdAt).toLocaleString()}</p><br />

              <p className="a">Last Update on</p>
              <p className="b">  {data.updatedAt ? new Date(data.updatedAt).toLocaleString() : "-"}</p><br />
            </div>
            <div>
              <p className="a">Role</p>
              <p className="b">{data.role}</p><br />

              <p className="a">Email ID</p>
              <p className="b">{data.email}</p><br />

              <p className="a">State</p>
              <p className="b">{data.state}</p><br />

              <p className="a">Street Name</p>
              <p className="b">{data.streetName}</p><br />

              <p className="a">Pincode</p>
              <p className="b">{data.pincode}</p><br />

              <p className="a">Created By</p>
              <p className="b">{data.createdBy}</p><br />

              <p className="a">Last Update by</p>
              <p className="b">{data.updatedBy}</p><br />
            </div>
            
          </div>

      <div>
          <button
              className="move"
              onClick={() => navigate(-1)}>Back
            </button>
      </div>
    </div>
  </main>
</>

    );
}

export default Viewdetails; 