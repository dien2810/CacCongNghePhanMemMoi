import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: { 
        type: String, 
        required: true 
    },
    username: { 
        type: String, 
        required: true, 
        unique: true 
    }, 
    image: { 
        type: String 
    },
    number: { 
        type: String, 
        required: true 
    }, 
    items: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product" 
    }], 
    refreshToken: { 
        type: String 
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
    }
}, 
{ 
    timestamps: true 
});

const User = mongoose.model("User", userSchema);
export default User;
