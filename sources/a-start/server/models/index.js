const { getDb } = require("../config/db");

const USER_COLLECTION = "Users";
const COLOR_COLLECTION = "Colors";

// !! For this demo we will query the user using email and password directly
// !! In a real world scenario the password will be hashed and we need to compare the hashed password
const getUserByEmailAndPassword = async (email, password) => {
  const db = await getDb();

  const foundUser = db.collection(USER_COLLECTION).findOne({
    email,
    password,
  });

  if (!foundUser) {
    throw new Error("User not found");
  }

  return foundUser;
};

const getColors = async () => {
  const db = await getDb();
  const colors = await db.collection(COLOR_COLLECTION).find().toArray();

  return colors;
};

module.exports = {
  getUserByEmailAndPassword,
  getColors,
};
