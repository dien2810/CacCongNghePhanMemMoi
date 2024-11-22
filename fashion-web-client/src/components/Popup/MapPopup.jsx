import React, { useState } from "react";
import Map from "../Map";
import "../../assets/css/Popup.css";
import { geocode } from "../../utils/geocode";

function MapPopup({ isMapDisplay, setIsMapDisplay, defaultLocation: initialLocation, onLocationChange }) {
    const [defaultLocation, setDefaultLocation] = useState(
        initialLocation || { address: "", location: { lat: 10.762622, lng: 106.660172 } }
    );
    const [isLoading, setIsLoading] = useState(false);

    const closePopup = (e) => {
        if (e.target.className.includes("map-popup-container")) {
            setIsMapDisplay(false);
        }
    };

    const handleAccept = () => {
        if (onLocationChange) {
            onLocationChange(defaultLocation);
        }
        setIsMapDisplay(false);
    };

    const handleFind = async () => {
        setIsLoading(true);
        try {
            const newLocation = await geocode("", defaultLocation.location);
            setDefaultLocation({
                ...defaultLocation,
                address: newLocation.address,
                location: newLocation.location,
            });
        } catch (error) {
            console.error("Error in handleFind:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isMapDisplay) return null;

    return (
        <div className="map-popup-container" onClick={closePopup}>
            <div className="popup-content">
                {/* Left: Map */}
                <div className="popup-map">
                    <Map defaultLocation={defaultLocation} setDefaultLocation={setDefaultLocation} />
                </div>
                {/* Right: Address Form */}
                <div className="popup-form">
                    <h2>SELECT LOCATION</h2>
                    <textarea
                        id="map-address"
                        value={defaultLocation.address || ""}
                        placeholder="Enter address"
                        readOnly
                    ></textarea>
                    <div className="popup-buttons">
                        <button className="btn-find" onClick={handleFind} disabled={isLoading}>
                            {isLoading ? "Finding..." : "FIND"}
                        </button>
                        <button className="btn-accept" onClick={handleAccept}>ACCEPT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MapPopup;
