////styles
import "./styles.scss";
import { Link } from "react-router-dom";
import { plus18 } from "../../assets";
const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-top">
          <div className="footer-links"></div>
          <div className="support-detail">
            <h2>24X7 Support</h2>
            <p></p>
          </div>
          <div className="social-icons-box">
            <div className="social-icon">
              <Link
                to="/"
                target="_blank"
              >
                <img
                  src="https://g1ver.sprintstaticdata.com/v22/static/front/img/social-icons/facebook.png"
                  alt="Facebook"
                />
              </Link>
            </div>
            <div className="social-icon">
              <Link to="/" target="_blank">
                <img
                  src="https://g1ver.sprintstaticdata.com/v22/static/front/img/social-icons/instagram.png"
                  alt="Instagram"
                />
              </Link>
            </div>
            <div className="social-icon">
              <Link to="/" target="_blank">
                <img
                  src="https://g1ver.sprintstaticdata.com/v22/static/front/img/social-icons/telegram.png"
                  alt="Telegram"
                />
              </Link>
            </div>
            <div className="social-icon">
              <Link to="/" target="_blank">
                <img
                  src="https://g1ver.sprintstaticdata.com/v22/static/front/img/social-icons/twitter.png"
                  alt="Twitter"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="secure-logo">
          <div>
            <img src="https://wver.sprintstaticdata.com/v3/static/front/img/ssl.png" />
          </div>
          <Link to="/">
            <img src={plus18} />
          </Link>
          <div className="ml-2">
            <b>100% SAFE</b>
            <div className="bottom-p">Protected connection and encrypted data.</div>
          </div>
        </div>
        <div className="d-inline-block">

          <Link to="/" target="_blank">
            <img src="https://g1ver.sprintstaticdata.com/v22/static/front/img/gamecare.png" />
          </Link>
          <Link to="/" target="_blank">
            <img src="https://g1ver.sprintstaticdata.com/v22/static/front/img/gt.png" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
