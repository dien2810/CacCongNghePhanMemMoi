import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Configure default Leaflet Marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function Map({ defaultLocation, setDefaultLocation }) {
    const handleMarkerDragEnd = (event) => {
        const lat = event.target.getLatLng().lat;
        const lng = event.target.getLatLng().lng;

        // Update location state
        setDefaultLocation((prev) => ({
            ...prev,
            location: { lat, lng },
        }));
    };

    return (
        <MapContainer
            center={defaultLocation?.location || { lat: 10.762622, lng: 106.660172 }}
            zoom={16}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
                position={defaultLocation?.location || { lat: 10.762622, lng: 106.660172 }}
                draggable={true}
                eventHandlers={{
                    dragend: handleMarkerDragEnd,
                }}
            >
                <Popup>{defaultLocation?.address || "Unknown Location"}</Popup>
            </Marker>
        </MapContainer>
    );
}

export default Map;
