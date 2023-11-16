const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

// Define controller
const eventCont = require("./backend/controllers/event-controller");
const categoryCont = require("./backend/controllers/category-controller");
const statsOperation = require("./backend/controllers/stats");
const speechBotCont = require("./backend/controllers/speechbot");
const translationBotCont = require("./backend/controllers/translationbot");

const app = express();
const url = "mongodb://127.0.0.1:27017/assignment3";

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist/assignment3")));
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, 'Uploads/');
  },
  filename: (request, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  }
});

// Connection to MongoDB
async function connect() {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}
connect().catch((err) => console.log(err));

// API Endpoints
app.post("/add-category", upload.single('categoryImage'), categoryCont.addCategory);
app.post("/add-event", upload.single('eventImage'), eventCont.addEvent);
app.get("/list-category", categoryCont.listCategories);
app.get("/list-events", eventCont.listEvents);
app.get("/display-category/:categoryId", categoryCont.getCategoryDetails);
app.get("/view-event/:eventId", eventCont.getEventDetails);
app.delete("/delete-category", categoryCont.deleteById);
app.delete("/delete-event", eventCont.deleteEventById);
app.put("/update-category", categoryCont.updateCategoryById);
app.put("/update-event", eventCont.updateEventById);
app.get("/stats", statsOperation.totalCounts);
app.use("/speech-bot", speechBotCont);
app.use("/translation-bot", translationBotCont);

// Starting Express server
app.listen(8081, () => {
  console.log('Express server is running on port 8081');
});

// Socket.io Setup
const server = require("http").Server(app); // Server set up 
const io = require("socket.io")(server); // Socket.IO Setup

// Event listener for a new connection from a client
// Inside the callback, a socket object is provided, which represents the connected client. 
// This object can be used to listen for events from the client and emit events to the client.
io.on("connection", (socket) => {
  console.log("New socket connection --:" + socket.id);
});