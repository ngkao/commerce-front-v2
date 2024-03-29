import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.scss";
import Lottie from "lottie-react";
import QRPhone from "../../assets/animations/qr-phone.json";
import GithubIcon from "../../assets/icons/Github-icon.png";
import SiteIcon from "../../assets/icons/Link.svg";
import LinkedinIcon from "../../assets/icons/LinkedIn-icon.png";

const NavBar = () => {
  const location = useLocation();
  const isProductPath = location.pathname.startsWith("/products");
  const isSalesPath = location.pathname.startsWith("/sales");
  const isEmployeesPath = location.pathname.startsWith("/insights");
  const isInventory = location.pathname.startsWith("/inventory");

  useEffect(() => {
    setTimeout(() => {
      const items = document.querySelectorAll(".inventory__item");
      if (location.pathname === "/products") {
        setTimeout(() => {
          items.forEach((item, index) =>
            setTimeout(() => {
              item.classList.add("show");
            }, index * 100)
          );
        }, 0);
      } else {
        items.forEach((item) => item.classList.remove("show"));
      }
    }, 300);
  }, [location.pathname]);

  return (
    <div className="nav">
      <div className="nav__ctr">
        <div className="nav__logo-ctr">
          <div className="nav__lottie">
            <Link to="/">
              <Lottie
                loop={false}
                autoplay={true}
                animationData={QRPhone}
                interactivity="click"
                style={{ height: "150%", width: "200%" }}
              />
            </Link>
          </div>
          <p className="nav__logo">Snack POS</p>
        </div>
        <div className="nav__list">
          <Link
            className={
              isProductPath ? "nav__item nav__item--active" : "nav__item"
            }
            to="/products"
          >
            Products
          </Link>
          <Link
            className={
              isInventory ? "nav__item nav__item--active" : "nav__item"
            }
            to="/inventory"
          >
            Inventory
          </Link>
          <Link
            className={
              isSalesPath ? "nav__item nav__item--active" : "nav__item"
            }
            to="/sales"
          >
            Sales History
          </Link>
          <Link
            className={
              isEmployeesPath ? "nav__item nav__item--active" : "nav__item"
            }
            to="/dashboard"
          >
            Dashboard
          </Link>
        </div>
        <div className="nav__author-ctr">
          <p className="nav__author-name">by NG Kao</p>
          <div className="nav__list-icon">
            <Link to="https://www.linkedin.com/in/ngkao/" target="_blank">
              <img className="nav__icon" src={LinkedinIcon} alt="LinkedIn" />
            </Link>
            <Link to="https://github.com/ngkao/" target="_blank">
              <img className="nav__icon" src={GithubIcon} alt="GitHub" />
            </Link>
            <Link to="https://ngkao.dev/" target="_blank">
              <img className="nav__icon" src={SiteIcon} alt="Personal Site" />
            </Link>
          </div>
        </div>
      </div>
      <div className="nav-cover-bottom"> cover </div>
      <div className="nav-cover-top"> cover top </div>
    </div>
  );
};

export default NavBar;
