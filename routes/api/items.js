const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Item = require("../../model/Item");

router.get("/", (req, res) => {
   console.log(req.query);
   Item.find({ userId: req.query.id })
      .sort({ date: -1 })
      .then((items) => res.json(items))
      .catch((error) => {
         console.log(error);
      });
});

router.post("/", auth, (req, res) => {
   console.log(req.body);
   const newItem = new Item({
      name: req.body.name,
      userId: req.body.userId,
   });

   newItem.save().then((item) => res.json(item));
});

router.delete("/:id", (req, res) => {
   Item.findById(req.params.id)
      .then((item) => item.remove().then(() => res.json({ success: true })))
      .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
