import express from "express";
import {generateNewShortURL,handleGetAnalytics} from "../Url_Shortener/url.js"
import { deleteUrlData ,getAllURLData} from "../Controllers/url.js";
//initalize the router
const router=express.Router();

router.post("/",generateNewShortURL);

router.get("/analytics/:shortId",handleGetAnalytics);
// // to delete a URL data
router.delete("/deleteUrl/:shortID", async (req, res) => {
    try {
        const shortID = req.params.shortID; // Use req.params.shortID directly
        if (!shortID) {
            return res.status(400).json({ data: "Wrong Request" });
        }
         const result=await deleteUrlData(shortID);
         res.status(200).json({data:{result:result,message:"Deteled URl Sucessfully"}})
       } catch (error) {
         console.log(`${error} No URL is Deleted`)
         res.status(500).json({data:"Internal Server Error"})
       }
  })
  //To Get URL Data
  router.get("/allURL",async(req,res)=>{
    
    try {
    const url = await getAllURLData(req)
          if(url.length<=0){
            res.status(400).json({data:"url Not Found"})
            return
          }
           res.status(200).json({data:url})
      } catch (error) {
         console.log(error)
         res.send(500).json({data:"Internal Server Error"})
      }
       
})
export const urlRouter=router;