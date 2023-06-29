import bcrypt from "bcrypt";

// hashpassword function

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(`hashed password ${hashedPassword}`);
    return hashedPassword
  } catch (error) {
    console.log(error);
  }
};


// compare password


export const comparePassword  = async (password,hashPassword) =>{
    return bcrypt.compare(password,hashPassword)
}