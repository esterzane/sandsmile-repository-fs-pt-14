import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";


export const TotalImpact = () => {
	const { store, actions } = useContext(Context);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const handleTotalImpact = async () => {
			try {
				const totalImpactData = await actions.getTotalImpact();

				if (totalImpactData) {
					setIsLoading(false);
				}
			} catch (error) {
				console.error("Error fetching total impact data", error);
			}
		}

		handleTotalImpact();
	}, []);

	return (
		<div className="info container mt-5 mb-5 overflow-hidden">
			<div className="info__bubbles">
				<div className="info__bubble">
					<div className="info__blob">
						<h1><strong>{store.total_users}125</strong></h1>
						<p>CLEANERS REGISTERED ON OUR PLATFORM</p>
					</div>
				</div>
				<div className="info__bubble">
					<div className="info__blob">
						<h1><strong>{store.total_impact_liters}5725</strong></h1>
						<p>LITERS COLLECTED FROM OUR SHORES</p>
					</div>
				</div>
				<div className="info__bubble">
					<div className="info__blob">
						<h1><strong>{store.total_impact_time}8100</strong></h1>
						<p>HOURS DEDICATED TO THE COUSE</p>
					</div>
				</div>
			</div>
		</div>
	)
};