const express = require("express");

const router = express.Router();
const PostController = require("../controllers/Post");

router.post("/", PostController.create);
router.put("/:id", PostController.update);
router.delete("/:id", PostController.delete);
router.get("/:id", PostController.get);
router.get("/", PostController.getAll);

module.exports = router;
