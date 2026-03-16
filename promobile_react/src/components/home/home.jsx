import styles from "./style.module.css";
import { Link } from "react-router-dom";
import Mbegtemi from "../../assets/Mbegtemi.png";
import appstoreicon from "../../assets/app store icon.png";
import connect from "../../assets/connect.png";
import playstoreicon from "../../assets/playstore icon.png";
import promobilelogo from "../../assets/promobilelogo.png";
function Home(){
    return(
        <>
  
  <title>Pro Mobile</title>
  <header>
    <nav className={styles.navbar}>
      <div className={styles.navdiv}>
        <ul>
          <li className={styles.small}>Individuals</li>
              <li className={`${styles.small} ${styles.dropdown}`}>
            <a>Business ▾</a>
                <ul className={styles.dropmenu}>
                  <li className={styles.small1}>
                  <a>Pro Plans</a>
                  </li>
            <li className={styles.small1}>
                  <a>Bulk SMS offer</a>
              </li>
            </ul>
          </li>
        </ul>

        <ul className={styles.small}>
          <li className={styles.small}>FR</li>
          <li
            className={styles.small}
            style={{ backgroundColor: "red", color: "white" }}
          >
            EN
          </li>
          <li className={styles.small}>
            <i className="fa-solid fa-cart-shopping" />
            Cart
          </li>
          <li>
            <img
              src={Mbegtemi}
              style={{ height: 30, width: "97.08px" }}
            />
          </li>
        </ul>
      </div>
    </nav>
    <nav className={styles.navbar1}>
      <div className={styles.navdiv1}>
        <ul>
          <li>
            <img
              src={promobilelogo}
              style={{ height: 40, width: 150 }}
            />
          </li>
        </ul>
        <ul>
          <li className={`${styles.small} ${styles.dropdown}`}>
            <a>Mobile Plans ▾</a>
            <ul className={styles.dropmenu}>
              <li  className={styles.small1}>
                <a>Voice &amp; SMS</a>
              </li>
              <li  className={styles.small1}>
                <a>Internet offer</a>
              </li>
              <li  className={styles.small1}>
                <a>Mix offer</a>
              </li>
              <li  className={styles.small1}>
                <a>Bonus &amp; Internet</a>
              </li>
            </ul>
          </li>
          <li className={`${styles.small} ${styles.dropdown}`}>
            <a>Shop ▾</a>
            <ul className={styles.dropmenu}>
              <li className={styles.small1}>
                <a>Phones</a>
              </li>
              <li className={styles.small1}>
                <a>Tablets</a>
              </li>
              <li className={styles.small1}>
                <a>Modems and Routers</a>
              </li>
              <li className={styles.small1}>
                <a>Accesories</a>
              </li>
            </ul>
          </li>
          <li className={styles.small}>Our Agencies</li>
          <li className={styles.small}>Contact us</li>
          <li className={styles.small}>
            {/* <a style={{ textDecoration: "none" }} href="/html/add_user.html">
              Add User
            </a> */}
            <Link style={{ textDecoration: "none" }} to="/adduser">Add User</Link>
          </li>
        </ul>
        <ul>
          <li className={`${styles.small} ${styles.dropdown}`}>
            <a>
              <i className="fa-solid fa-circle-user" />
              Account ▾
            </a>
            <ul className={styles.dropmenu}>
              <li className={styles.small1}>
      <Link to="/login" style={{ textDecoration: "none" }} >Log in</Link>
              </li>
              <li className={styles.small1}>
                <a>Sign up</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <main>
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div>
          <img
            src={connect}
            alt="connect with us"
            style={{ width: 1040, padding: 10, height: 600, borderRadius: 20 }}
          />
        </div>
        <div>
          <p
            style={{
              color: "red",
              fontSize: 28,
              fontFamily: '"Poppins"',
              fontWeight: 600
            }}
          >
            {" "}
            Need Help?
          </p>
          <b
            style={{
              color: "black",
              fontSize: 30,
              fontFamily: '"Poppins"',
              fontWeight: 900
            }}
          >
            {" "}
            Need help?,Reach our Support team
          </b>
          <p style={{ fontSize: 16, color: "black", fontFamily: '"Poppins"' }}>
            {" "}
            If you have any questions, please contact us,we always open for you!
          </p>
        </div>
      </div>
    </div>
    <section>
      <p>
        <b style={{ color: "black", paddingLeft: 300, fontSize: 25 }}>
          Have A Question? Need Assistance? We Can Help You
        </b>
      </p>
      <div className={styles.sdiv}>
        <div className={styles.box1}>
          <b style={{ color: "black", fontSize: 20 }}>
            Have A Question? Need Assistance? We Can Help You
          </b>
          <br />
          <br />
          <p style={{ fontSize: 20 }}>
            Browse the most frequently asked questions about Promobile products
            and services. You might find the answer to yours Questions.
          </p>
          <br />
          <br />
          <br/>
          <u style={{ color: "red", fontSize: 20 }}>Access the FAQs</u>
        </div>
        <div className={styles.box1}>
          <b style={{ color: "black", fontSize: 20 }}>
            Chat with us on WhatsApp
          </b>
          <br />
          <br />
          <p style={{ fontSize: 20 }}>
            Get answers to your questions via WhatsApp:
          </p>
          <div style={{ paddingLeft: 30 }}>
            <li>Monday to Friday: 8:00 a.m. to 5:00 p.m.</li>
            <li>
              Saturday*, Sunday and Public Holidays: 10:00 a.m. to 5:00 p.m.
            </li>
          </div>
          <p />
          <br />
          <br />
          <u style={{ color: "red", fontSize: 20 }}>Ask a question</u>
        </div>
        <div className={styles.box2}>
          <b style={{ color: "black", fontSize: 20 }}>
            Book Appointment at the agency
          </b>
          <br />
          <br />
          <p style={{ fontSize: 20 }}>
            Use our locator tool to go to one of our nearest branches.
          </p>
          <br /><br/>
          <u style={{ color: "red", fontSize: 20 }}>Find an agency</u>
        </div>
        <div className={styles.box2}>
          <b style={{ color: "black", fontSize: 20 }}>Call us</b>
          <br />
          <br />
          <p style={{ fontSize: 20 }}>
            For technical assistance or other specific needs, please call our
            24/7 customer service.
          </p>
          <br />
          <u style={{ color: "red", fontSize: 20 }}>Call Customer Service</u>
        </div>
      </div>
    </section>
    <section>
      <div className={styles.card}>
        <div className={styles.card__text}>
          <p style={{ fontFamily: '"Poppins"', fontSize: 80, color: "black" }}>
            Contact us now!
          </p>
          <br />
          <p>
            Please feel free to call us, email us, or visit one of our branches.
            <br />
            We look forward to connecting with you and exploring how our team
            can help.
          </p>
        </div>
        <div  className={styles.card__form}>
          <form>
            <center
              style={{ fontSize: 35, fontFamily: '"Poppins"', color: "black" }}
            >
              FILL UP THE FORM
            </center>
            <br />
            <p style={{ fontFamily: '"Poppins"' }}>
              Your email address will not be published. Required fields are
              marked *
            </p>
            <br />
            <label htmlFor="name" />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="First Name & Last Name*"
              required=""
            />
            <br />
            <br />
            <label htmlFor="email" />
            <input type="email" name="email" id="email" placeholder="Email" />
            <br />
            <br />
            <label htmlFor="phone" />
            <input
              type="number"
              name="phone"
              id="phone"
              placeholder="Phone *"
              required=""
            />
            <br />
            <br />
            <label htmlFor="message" />
            <textarea
              id="message"
              name="message"
              rows={5}
              cols={30}
              placeholder="How can we help you ?"
              defaultValue={""}
            />
            <button style={{ fontSize: "medium" }} type="submit">
              Get in Touch
            </button>
          </form>
        </div>
      </div>
    </section>
  </main>
  <footer className={styles.footer}>
    <div className={styles["footer-container"]}>
      <div className={styles["footer-col"]}>
        <img
          src={promobilelogo}
          alt="Promobile"
         className={styles["footer-logo"]}
        />
        <p>
          1 MVNO from Senegal and
          <br />
          West Africa
        </p>
        <div className={styles["app-links"]}>
          Download the app
          <img src={playstoreicon} alt="Google Play" />
          <img src={appstoreicon} alt="App Store" />
        </div>
      </div>
      <div className={styles["footer-col"]}>
        <h4>Promobile Senegal</h4>
        <ul>
          <li>About Us</li>
          <li>Offers Catalog</li>
          <li>Blogs</li>
          <li>FAQ</li>
          <li>Career</li>
        </ul>
      </div>
      <div className={styles["footer-col"]}>
        <h4>Legal Notices</h4>
        <ul>
          <li>Personal data policy</li>
          <li>General Conditions of Use</li>
          <li>General Conditions of Sale</li>
          <li>Shipping and Return Policy</li>
        </ul>
      </div>
      <div className={styles["footer-col"]}>
        <h4>Head office:</h4>
        <p>
          Sacré Coeur 3 VDN - Villa N° 9345
          <br />
          BP: 403RP
          <br />
          Dakar - Sénégal
        </p>
        <p className="link">Contact Us</p>
      </div>
      <div className={styles["footer-col"]}>
        <h4>Social Media</h4>
        <div  className={styles["social-icons"]}>
          <i className="fab fa-facebook-f" />
          <i className="fab fa-instagram" />
          <i className="fab fa-linkedin-in" />
          <i className="fab fa-x-twitter" />
          <i className="fab fa-youtube" />
          <i className="fab fa-tiktok" />
        </div>
        <h4  className={styles["contact-title"]}>Contact</h4>
        <p className={styles.phone}>
          📞 <span>1675</span>
        </p>
        <p className={styles.email}>✉ contact@promobile.sn</p>
      </div>
    </div>
    <div className={styles["footer-bottom"]}>
      © 2026 Sirius Telecoms Africa SAU. All rights reserved.
    </div>
  </footer>
</>

    );
}

export default Home;