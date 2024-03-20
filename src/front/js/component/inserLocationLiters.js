import React, { useContext, useState, useCallback } from "react";
import { Context } from "../store/appContext";

export const InsertLocationLiters = () => {
    const { store, actions } = useContext(Context);

    const handleLocation = (e) => {
        actions.setLocation(e.target.value);
    };

    const handleLiters = (e) => {
        actions.setLiters(e.target.value);
    };

    return (
        <div className="user-location card container-fluid col-sm-8 col-md-8 col-lg-8 bg-body-tertiary text-center p-1 mt-5">
            <form className="form-floating">
                <label htmlFor="location"> LOCATION</label>
                <input
                    id="location"
                    type="text"
                    value={store.location}
                    onChange={(e) => handleLocation(e)}
                    placeholder="location"
                />
            </form>
            <form className="form-floating">
                <label htmlFor="liters"> LITERS</label>
                <input
                    id="liters"
                    type="number"
                    value={store.liters}
                    onChange={(e) => handleLiters(e)}
                    placeholder="liters"
                />
            </form>
        </div>
    );
};