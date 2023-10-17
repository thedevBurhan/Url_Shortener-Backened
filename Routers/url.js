import express from "express";
import {
  generateNewShortURL,
  handleGetAnalytics,
  deleteURL,
  AllURLData,
  GetURLDataForSpecificUser,
} from "../Url_Shortener/url.js";

//initalize the router
const router = express.Router();

router.post("/", generateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);
// // to delete a URL data
router.delete("/deleteUrl/:shortID", deleteURL);
//To Get AllURL Data
router.get("/allURL", AllURLData);
//To get specific url for user
router.get("/SpecificUser/:id", GetURLDataForSpecificUser);
export const urlRouter = router;
