const express = require("express");
const eventModel = require("../models/events");
const router = express.Router();

router.get("/addEvent", (req, res, next) => {
  try {
    res.render("addEvent");
  } catch (error) {
    res.render("error", { message: error.message, error });
  }
});
router.post("/addEvent", async (req, res, next) => {
  try {
    const { nbre_participant, titre } = req.body;
    if (nbre_participant > 30) {
      throw new Error("nbre participant trop élevé");
    }
    const checkIfEventExist = await eventModel.findOne({ titre });
    if (checkIfEventExist) {
      throw new Error("event already exist!");
    }
    const event = new eventModel(req.body);
    event.save();
    res.redirect("http://localhost:5000/events");
  } catch (error) {
    res.render("error", { message: error.message, error });
  }
});
router.get("/", async (req, res, next) => {
  try {
    const events = await eventModel.find();
    res.render("index", { events });
  } catch (error) {
    res.render("error", { message: error.message, error });
  }
});
router.get("/deleteEvent/:eventId", async (req, res, next) => {
  try {
    const { eventId } = req.params;
    await eventModel.findByIdAndDelete(eventId);
    res.redirect("http://localhost:5000/events");
  } catch (error) {
    res.render("error", { message: error.message, error });
  }
});
router.get("/updateEvent/:eventId", async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const event = await eventModel.findById(eventId);
    res.render("updateEvent", { e: event });
  } catch (error) {
    res.render("error", { message: error.message, error });
  }
});
router.post("/updateEvent/:eventId", async(req, res, next)=>{
try {
    const {eventId} = req.params;
    const { nbre_participant, titre } = req.body;
    if (nbre_participant > 30) {
      throw new Error("nbre participant trop élevé");
    }
    const checkIfEventExist = await eventModel.findOne({ titre });
    if (checkIfEventExist) {
      throw new Error("event already exist!");
    }
     await eventModel.findByIdAndUpdate(eventId, req.body);
     res.redirect("http://localhost:5000/events")
  } catch (error) {
    res.render("error", { message: error.message, error });
  }
})
module.exports = router;
