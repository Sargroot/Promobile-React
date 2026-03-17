import { useState,useEffect } from "react";
import styles from "./add_user_s.module.css";
import { useNavigate } from "react-router-dom";
import { getRoles,getCountries,getStates ,addUser} from "../../services/api";

function Adduser(){
  
  const [roles, setRoles] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {

  fetchRoles();
  fetchCountries();

}, []);

const fetchRoles = async () => {
  try {
    const data = await getRoles();
    setRoles(data);
  } catch (err) {
    console.log(err);
  }
};

const fetchCountries = async () => {
  try {
    const data = await getCountries();
    setCountries(data);
  } catch (err) {
    console.log(err);
  }
};

const fetchStates = async (countryId) => {
  try {
    const data = await getStates(countryId);
    setStates(data);
  } catch (err) {
    console.log(err);
  }
};

  const [error,setError] = useState({
    username: "",
    mobile: "",
    address: "",
    city: "",
    role: "",
    email: "",
    street: "",
    country: "",
    state: "",
    pincode: ""
  });

  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    address: "",
    city: "",
    role: "",
    email: "",
    street: "",
    country: "",
    state: "",
    pincode: ""
  });

const handleChange = (e) => {

  const { name, value } = e.target;

  if(name === "country"){

    const selectedCountry = countries.find(c => c.name === value);

    if(selectedCountry){
      fetchStates(selectedCountry.id);
    }

    setFormData(prev => ({
      ...prev,
      country: value,
      state: ""
    }));

  }else{

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  }

  setError(prev => ({
    ...prev,
    [name]: validateField(name, value)
  }));

};


const usernameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^\d{10}$/;

const validateField = (name, value) => {
  switch (name) {
    case "username":
      if (!value) return "Enter the username";
      if (!usernameRegex.test(value)) return "Enter a valid username";
      return "";

    case "email":
      if (!value) return "Enter the email";
      if (!emailRegex.test(value)) return "Enter a valid email";
      return "";

    case "mobile":
      if (!value) return "Enter the mobile number";
      if (!mobileRegex.test(value)) return "Enter a valid 10 digit mobile number";
      return "";
      
    default:
      return !value ? `Enter the ${name}` : "";
  }
};

const validate = () => {
  const newErrors = {};
 
  Object.keys(formData).forEach((a) => {
    newErrors[a] = validateField(a, formData[a]);
  });

  setError(newErrors);

  return !Object.values(newErrors).some(err => err !== "");
};
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  const payload = {
    name: formData.username,
    email: formData.email,
    phone: formData.mobile,
    role: formData.role,
    addressNo: formData.address,
    streetName: formData.street,
    city: formData.city,
    state: formData.state,
    country: formData.country,
    pincode: formData.pincode
  };

  try {
const res = await addUser(payload);

if(res.success){
  alert(res.message);
  navigate("/addusertable");
}

  } catch (error) {

    if(error.response){
      alert(error.response.data.message);
    }else{
      alert("Server error");
    }

  }
};

    return(
        <>
  <div className={styles.form__outer}>

    <div className={styles.nav}><p style={{color:"black",fontWeight:"400"}}>Add User</p></div>

    <div className={styles.form__container}>
    

    <form id="myform" onSubmit={handleSubmit} className={styles.formRow}>
            <div className={styles.pad1}>
          <label className={styles.labell} htmlFor="username">
            User name
          </label>
          <br />
          <input className={styles.inputt}
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Promobile Star Plus"
             
          />
        {error.username ? (<p style={{ color: "#d8433c", fontSize: 15,marginBottom:"8px" }}>{error.username}</p>):(<p style={{height:"31px" }}></p>)}
          <label className={styles.labell} htmlFor="mobile">
            Mobile Number
          </label>
          <br />
          <input className={styles.inputt}
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter Mobile Number"
             
          /> 
          <br />

        {error.mobile ? (<p style={{ color: "#d8433c", fontSize: 15,marginBottom:"8px" }}>{error.mobile}</p>):(<p style={{height:"31px" }}></p>)}

          <label className={styles.labell} htmlFor="address">
            Address No
          </label>
          <br />
          <input className={styles.inputt}
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter House / Apartment number"
             
          />

        {error.address ? (<p style={{ color: "#d8433c", fontSize: 15,marginBottom:"8px" }}>{error.address}</p>):(<p style={{height:"31px" }}></p>)}

          <label className={styles.labell} htmlFor="city">
            City / Village Name
          </label>
          <br />
          <input className={styles.inputt}
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter City / village name"
             
          />
          
        {error.city ? (<p style={{ color: "#d8433c", fontSize: 15,marginBottom:"8px" }}>{error.city}</p>):(<p style={{height:"31px" }}></p>)}

          <label className={styles.labell} htmlFor="country">
            Country
          </label>
          <br />
          <select
           className={styles.selectt}
            name="country"
            value={formData.country}
            onChange={handleChange}
             >
            <option value="">Enter Country Name</option>
            {countries.map((c) => (
            <option key={c.id} value={c.name}>
            {c.name}
            </option>
            ))}
            
            </select>

        {error.country ? (<p style={{ color: "#d8433c", fontSize: 15,marginBottom:"8px" }}>{error.country}</p>):(<p style={{height:"31px" }}></p>)}

            <div><button className={styles.move} type="reset">Cancel</button></div>
      </div>

      
      <div className={styles.pad}>
        <label className={styles.labell} htmlFor="role">
          Role
        </label>
        <br />
        <select className={styles.selectt} id="role" name="role" value={formData.role} onChange={handleChange}  >
          <option
            value=""
            style={{ color: "grey" }}>
            Select Role
          </option>
          {roles.map((r) => (
          <option key={r.id} value={r.name}>
          {r.name}
          </option>
          ))}
        </select>

        {error.role ? (<p style={{ color: "#d8433c", fontSize: 15,marginBottom:"8px" }}>{error.role}</p>):(<p style={{height:"31px" }}></p>)}

        <label className={styles.labell} htmlFor="email">
          Email Address
        </label>
        <br />
        <input className={styles.inputt}
          type="email"
          id="email"
          name="email"
            value={formData.email}
            onChange={handleChange}
          placeholder="Enter Email Address"
           
        />
        
        {error.email ? (<p style={{ color: "#d8433c", fontSize: 15,marginBottom:"8px" }}>{error.email}</p>):(<p style={{height:"31px" }}></p>)}

        <label className={styles.labell} htmlFor="street">
          Street Name
        </label>
        <br />
        <input className={styles.inputt}
          type="text"
          id="street"
          name="street"
            value={formData.street}
            onChange={handleChange}
          placeholder="Enter Street Name"
           
        />

        {error.street ? (<p style={{ color: "#d8433c", fontSize: 15,marginBottom:"8px" }}>{error.street}</p>):(<p style={{height:"31px" }}></p>)}

        <label className={styles.labell} htmlFor="state">
          State
        </label>
        <br />
        <select
        className={styles.selectt}
        name="state"
        value={formData.state}
        onChange={handleChange}
         
        disabled={!formData.country}>
        <option value="">Enter State Name</option>
        {states.map((s) => (
        <option key={s.id} value={s.name}>
        {s.name}
        </option>
        ))}
        </select>

        {error.state ? (<p style={{ color: "#d8433c", fontSize: 15,marginBottom:"8px" }}>{error.state}</p>):(<p style={{height:"31px" }}></p>)}

        <label className={styles.labell} htmlFor="pincode">
          Pincode
        </label>
        <br />
        <input className={styles.inputt}
          type="text"
          id="pincode"
          name="pincode"
            value={formData.pincode}
            onChange={handleChange}
          placeholder="Enter pincode"
        />
        {error.pincode ? (<p style={{ color: "#d8433c", fontSize: 15,marginBottom:"8px" }}>{error.pincode}</p>):(<p style={{height:"31px" }}></p>)}

              <div><button className={styles.move2} type="submit">Submit</button></div>

      </div>

    </form>
    </div>
    </div>
 </>
);
}

export default Adduser;