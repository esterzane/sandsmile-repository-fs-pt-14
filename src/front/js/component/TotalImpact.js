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
			<h3><strong>OUR IMPACT IN THE WORLD</strong></h3>
			<div className="info__bubbles">
				<div className="info__bubble">
					<div className="info__blob">
						<strong>{store.total_users}50</strong>cleaners registered on our platform
					</div>
				</div>
				<div className="info__bubble">
					<div className="info__blob">
						<strong>{store.total_impact_liters}5000</strong>liters collected from our shores
					</div>
				</div>
				<div className="info__bubble">
					<div className="info__blob">
						<strong>{store.total_impact_time}5000</strong>time dedicated to the cause
					</div>

				</div>
			</div>
		</div>
	)
};