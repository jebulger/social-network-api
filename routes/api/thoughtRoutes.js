// Stating requirements and importing thoughtController methods
const router = require("express").Router();
const thoughtController = require("../../controllers/thoughtController");

// Route to get all thoughts
router.get("/", thoughtController.getThoughts);

// Route to get a single thought
router.get("/:thoughtId", thoughtController.getSingleThought);

// Route to create a new thought
router.post("/", thoughtController.createThought);

// Route to update an existing thought
router.put("/:thoughtId", thoughtController.updateThought);

// Route to delete an existing thought
router.delete("/:thoughtId", thoughtController.deleteThought);

// Route to create a new reaction for a thought
router.post("/:thoughtId/reactions", thoughtController.createReaction);

// Route to delete an existing reaction on a thought
router.delete(
  "/:thoughtId/reactions/:reactionId",
  thoughtController.removeReaction
);

module.exports = router;
