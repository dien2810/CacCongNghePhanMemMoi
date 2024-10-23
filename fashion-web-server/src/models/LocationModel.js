import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    address: { 
        type: String, 
        required: true 
    }, 
    country: { 
        type: String, 
        required: true 
    },
    region: { 
        type: String 
    }, 
    area: { 
        type: String 
    }, 
    street: { 
        type: String 
    },
    house: { 
        type: String 
    }, 
    location: { 
        lat: { 
            type: Number, 
            required: true 
        }, 
        lng: { 
            type: Number, 
            required: true 
        } 
    },
    location_type: { 
        type: String, 
        enum: [
            'exact', 
            'approximate'
        ], 
        default: 'exact' },
    type: { 
        type: String, 
        enum: [
            'street_address', 
            'postal_code', 
            'place'
        ], 
        default: 'street_address' 
    } 
    }, 
    { 
        timestamps: true
    });

const Location = mongoose.model("Location", locationSchema);
export default Location;
