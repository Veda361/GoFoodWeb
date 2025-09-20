import mongoose from "mongoose";

const mongoURL = "mongodb+srv://goFood_webApp:85McvxMEkg018Nfh@cluster0.pr2owv8.mongodb.net/goFood_webApp?retryWrites=true&w=majority&appName=Cluster0";

const connectMongoDb = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("✅ Connected successfully!");

    const db = mongoose.connection.db;

    // Fetch foods and categories in parallel
    const [foods, categories] = await Promise.all([
      db.collection("foods").find({}).toArray(),
      db.collection("categories").find({}).toArray(),
    ]);

    global.food_items = foods;
    global.foodCategory = categories;

    // Optional: log sizes
    // console.log("📌 foods:", foods.length, "categories:", categories.length);
  } catch (err) {
    console.error("❌ There is an error:", err);
    throw err;
  }
};

export default connectMongoDb;
