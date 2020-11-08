const mongoose = require("mongoose");

const Count = mongoose.Schema;

const GuestCount = new Count({
  GuestCount: {},
});

const addGuest = mongoose.model("addGuest", GuestCount);

module.exports = addGuest;
