import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0,
    },
},{timestamps:true});

// export default usersModel;

export default mongoose.model("users", userSchema);
// module.exports = mongoose.model("users", userSchem);

// userSchemaa is skeliton and users is actual model or db doc
// whenever the new model(user ) will created then timestamp will also created which will tell the time of creation of user creation 