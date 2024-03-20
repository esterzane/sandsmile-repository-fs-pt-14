import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

export const NavBar = () => {
	return (
			<nav className="nav">
				<div className="container nav__menu">
					<a href="/">
						<img src={logo} className="nav__logo"/>
					</a>
					<div className="nav_bar_buttons">
						<Link to="/donation " className="donations__button btn">
							<span>GET INVOLVED: DONATE</span>
						</Link>
						<Link to="/signuplogin" className="nav__btn round">
							<span>CLEANERS</span>
						</Link>
					</div>
				</div>
			</nav>
		);
	};
