import mongoose from "mongoose";

const customCssSchema = new mongoose.Schema({
    cssplate: String
},{timestamps:true});

// export default usersModel;
// customcss

const CustomCssModel = mongoose.model('CustomCss', customCssSchema);

// Export the model
export default CustomCssModel;

// userSchemaa is skeliton and users is actual model or db doc
// whenever the new model(user ) will created then timestamp will also created which will tell the time of creation of user creation 