const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);
app.use(express.json());

// API Routes
app.use("/api/v1/email", routes);

app.post("/api/cancelReservation/:reservationID", (req, res) => {
  const reservationID = req.params.reservationID;

  // Your cancellation logic goes here, e.g., update the reservation status in your database

  res.json({ success: true, message: "Reservation canceled successfully" });
});

app.listen(PORT, () => {
  console.log(`Server connected to http://localhost:${PORT}`);
});
