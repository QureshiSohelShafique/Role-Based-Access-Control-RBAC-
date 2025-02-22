const express = require("express");
const { getUsers, getUserDetails, blockUser, unblockUser, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getUsers);
router.get("/me", authMiddleware, getUserDetails);
router.patch("/block/:user_id", authMiddleware, blockUser);
router.patch("/unblock/:userId", authMiddleware, unblockUser);
router.delete("/:userId", authMiddleware, deleteUser);

module.exports = router;
