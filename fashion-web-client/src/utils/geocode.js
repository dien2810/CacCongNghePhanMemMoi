import axios from "axios";

export async function geocode(address, location) {
    try {
        let url = "";
        if (location && location.lat && location.lng) {
            url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.lat}&lon=${location.lng}`;
        } else {
            url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=jsonv2`;
        }

        const response = await axios.get(url);

        if (response.data) {
            const locationData = response.data;
            return {
                address: locationData.display_name,
                location: {
                    lat: locationData.lat,
                    lng: locationData.lon,
                },
            };
        } else {
            throw new Error("No data found");
        }
    } catch (err) {
        console.error("Error in geocoding:", err);
        throw err;
    }
}
