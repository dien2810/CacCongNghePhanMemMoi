import "../../assets/css/Address.css";
import MapPopup from "../../components/Popup/MapPopup";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { getUserLocation } from "../../redux/selectors";

function Address() {
    const user = JSON.parse(localStorage.getItem("user")) || { username: "Unknown", number: "N/A" };
    const [isMapDisplay, setIsMapDisplay] = useState(false);

    const defaultLocation = useSelector(getUserLocation) || {
        address: "Chưa có địa chỉ",
        location: { lat: 10.762622, lng: 106.660172 },
    };

    const handleLocationChange = (newLocation) => {
        console.log("New Location:", newLocation);
    };

    return (
        <section style={{ marginTop: "26px", marginBottom: "26px" }}>
            <div className="container-1056 container-padding location">
                <div className="username-number">
                    {user.username} (+84) {user.number}
                </div>
                <div className="address">{defaultLocation?.address || "Địa chỉ chưa được thiết lập"}</div>
                <div className="change" onClick={() => setIsMapDisplay(true)}>
                    Thay Đổi
                </div>
                <div className="container-item address-heading">
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        style={{ color: "var(--heavyblue-color)", fontSize: "25px" }}
                    />
                    <div className="adrress-heading-content">Địa Chỉ Nhận Hàng</div>
                </div>
            </div>
            <MapPopup
                isMapDisplay={isMapDisplay}
                setIsMapDisplay={setIsMapDisplay}
                defaultLocation={defaultLocation}
                onLocationChange={handleLocationChange}
            />
        </section>
    );
}

export default Address;
