import express from "express";
import {generateNewShortURL,handleGetAnalytics,handleDeleteUrl} from "../Url_Shortener/url.js"

//initalize the router
const router=express.Router();

router.post("/",generateNewShortURL);

router.get("/analytics/:shortId",handleGetAnalytics);
router.delete("/delete/:Id",handleDeleteUrl);
export const urlRouter=router;