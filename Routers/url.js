import express from "express";
import {generateNewShortURL,handleGetAnalytics} from "../Url_Shortener/url.js"

//initalize the router
const router=express.Router();

router.post("/",generateNewShortURL);

router.get("/analytics/:shortId",handleGetAnalytics);
// // to delete a URL data
router.delete("/deleteUrl/:id",async(req,res)=>{
    try {
         const {id}=req.params;
         if(!id){
           return res.status(400).json({data:"Wrong Request"})  
         }
         const result=await deleteUrlData(id);
         res.status(200).json({data:{result:result,message:"Deteled URl Sucessfully"}})
       } catch (error) {
         console.log(`${error} No URL is Deleted`)
         res.status(500).json({data:"Internal Server Error"})
       }
  })
export const urlRouter=router;