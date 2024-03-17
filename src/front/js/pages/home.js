import React, { useContext } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { TotalImpact } from "../component/TotalImpact";
import image1 from "../../img/image1.jpg";
import image2 from "../../img/image2.jpg";
import image3 from "../../img/image3.jpg";


import { NavBar } from "../component/navbar";
import video from "../../assets/video.mp4";

export const Home = () => {
	const { store } = useContext(Context);
	return (
		<div className="home">
			<NavBar />
			<div className="hero">
				<video className="hero__video" autoPlay muted loop src={video} />
			</div>
			<div className="about container mt-5 mb-5 overflow-hidden">
				<p>Scientists say Earth has about 7.5 sextillion sand grains that have been shaping our coastlines and ocean life for millions of years. Yet, human activity casts a dark shadow. Over 80% of marine pollution originates from land, carried to the sea by rivers and streams. Each year, tons of debris wash onto beaches, but the issue doesn't stop there. Beach sand, moved by ocean currents, carries pollution far from its source, creating a widespread issue. Meaning, garbage travels far from where it was originally thrown away. Coastal areas become dumping grounds for this debris, harming the animals and plants that call these places home.
				</p>
				<p>This challenge affects everyone, from children playing on the shore to adults enjoying beach days. It's our daily responsibility to recognize and cherish the importance of caring for our ocean sand. Together, we can ensure clean beaches and healthy oceans for future generations.
				</p>
				<p><strong>SANDSMILE</strong> is a website designed to inspire and encourage users to become dedicated collectors of debris that invades ocean beaches. The site allows users to track their individual and collective impact on collected trash across various coastal geographies. By transforming the beach into places where sand smiles, users not only contribute to a cleaner environment but also gain financial benefits. Sandsmile acts to foster a community of socially responsible citizens and companies, turning beach cleanup into a rewarding and impactful endeavor.
				</p>
			</div>
			<TotalImpact />
			<div className="about container mt-5 mb-5 overflow-hidden">
				<h3><strong>BE SOCIALLY RESPONSIBLE CITIZEN</strong></h3>
					<p>After registering or logging in, you gain access to your personal page, where you can track your activity effectively:
					</p>
					<p><strong>Time Tracking:</strong> Use a timer to record the duration of your activity. Start and stop the timer to accurately log the time spent on cleaning;
					</p>
					<p><strong>Location Selection:</strong> Choose the specific beach where you're conducting the cleanup. This helps in organising and overviewing efforts;
					</p>
					<p><strong>Amount Collected:</strong> Record the quantity of waste collected in liters. This data will assess your impact.
					</p>
					<br></br>
					<p>For dedicated participants who meet specific criteria, we offer an enhanced status called <strong>'Cleaners Plus - Smilers'</strong>:
					</p>
					<p><strong>Eligibility:</strong> Cleaners who have been registered for over six months, with a minimum collection of 1000 liters and participation in at least one platform-organized event, qualify for 'Cleaners Plus - Smilers' status;
					<strong> Benefits:</strong> Upon achieving 'Smiler' status, <strong>you receive a 5% on donations</strong>. This incentive recognizes your commitment and encourages continued engagement in our cleanup initiatives.
					</p>
			</div>

			<div className="user_plus container mt-5 mb-5 overflow-hidden">
				<p><strong>
					Together we strive to nurture fresh habits that reshape our interactions with the environment along the ocean coast, fostering responsible behavior and a sense of stewardship.
				</strong></p>
				<p><strong>
					By uniting efforts, Sandsmile will to transform individual actions into collective impact.
				</strong></p>
			</div>
			<div className="info container mt-5 mb-5 overflow-hidden">
				<div className="info__bubbles">
					<div className="info__bubble">
						<img className="info__img" src={image1} />
					</div>
					<div className="info__bubble">
						<img className="info__img" src={image2} />
					</div>
					<div className="info__bubble">
						<img className="info__img" src={image3} />
					</div>
				</div>
			</div>
			
		</div>
	);
};