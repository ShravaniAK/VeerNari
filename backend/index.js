const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// enable cors
app.use(cors());
app.options("*", cors());

const submitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  foodBrif: { type: String, required: true },
  quantity: { type: String, required: true },
  contact: { type: String, required: true },
  time: { type: String, required: true },
});

const submitModel = mongoose.model("Form", submitSchema);

// Set up default mongoose connection
async function connectDB() {
  const mongoDBURI =
    "mongodb+srv://Rahul_2020:Haha2020@cluster0.dqzihwn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  try {
    const connection = await mongoose.connect(mongoDBURI, {});
    console.log("Connection host: ", connection.connection.host);
  } catch (error) {
    console.log("Error DB Connection: ", error.message);
  }
}

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Test" });
});

app.post("/api/submit", async (req, res) => {
  const { Date, Description, Name, Time, venue } = req.body;
  console.log(">>>>>", req.body);
  try {
    const form = await new submitModel({
      name: Name,
      date: Date,
      contact: Description,
      foodBrif: venue,
      time: Time,
      contact: Name,
    });
    console.log(">>>>>", form, submitModel, typeof submitModel);
    const data = await form.save(function (err) {
      if (err) {
        console.log(err);
        return;
      }
      res.json({ message: "Success!" });
    });
    console.log(data);
    res.json({ message: "Success!" });
  } catch (err) {
    res.json(err);
  }
});

app.listen(5001, () => {
  console.log("Server is started !");
});
