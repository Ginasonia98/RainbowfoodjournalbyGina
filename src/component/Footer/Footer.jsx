import React from "react";
import "../Footer/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container inner-footer">
        <div className="d-flex">
          <div className="detail-rainbow">
            Rainbow <span className="detail-rainbows">Food Journal</span>
          </div>
          <div className="col-4">
            <div className="about-us">About Us</div>
            <div className="text-about-us">
              Rainbow Food Journal adalah website yang menyediakan berbagai
              macam makanan nusantara termasuk resepnya. Di website ini juga kita
              dapat membagikan menu makanan yang kita ketahui beserta resepnya.
            </div>
          </div>
          <div className="col-4">
            <div className="contact-us-new">Contact Us</div>
            <div className=" contact-us d-flex align-items-center gap-3 pointer ">
              <i class="bi bi-envelope"></i>
              <p className="text-email"> ginas.tobing@gmail.com</p>
            </div>
            <div className=" contact-us1 d-flex align-items-center gap-3 pointer">
              <i class="bi bi-instagram"></i>
              <p className="text-email">
                https://instagram.com/chikogina_?igshid=YmMyMTA2M2Y=
              </p>
            </div>
            <div className=" contact-us1 d-flex align-items-center gap-3 pointer">
              <i class="bi bi-github"></i>
              <p className="text-email">
                https://github.com/Ginasonia98?tab=repositories
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
