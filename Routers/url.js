import express from "express";
import {generateNewShortURL,handleGetAnalytics} from "../Url_Shortener/url.js"

//initalize the router
const router=express.Router();

router.post("/",generateNewShortURL);

router.get("/analytics/:shortId",handleGetAnalytics);
export const urlRouter=router;