import shortid from "shortid";
import {UrlShortener} from "../Controllers/user.js";
import { client } from "../Database/db.js";
async function generateNewShortURL(req,res){
    const body=req.body;
    let date= new Date();
      let currentTimeStamp=date.toUTCString()
    if(!body.url) return res.status(400).json({error:"URL is required"})
 
try{
     const shortID=shortid();
         await UrlShortener([{
       shortID:shortID,
       redirectURL:body.url,
       visitHistory:[{ timestamp: currentTimeStamp}],

}])

     return res.status(200).json({shortenerURl:shortID});
   
}catch(error){
     return res.status(500).json({ error: "Internal Server Error" }); 
}
}

async function handleGetAnalytics(req,res){
     try{
          await client.connect();
          const shortID = req.params.shortId.trim(); // Trim the shortID
     //  console.log("Short ID from Route:", shortID);
      const db = client.db("URL_SHORTENER");
      const collection = db.collection("UrlShortener");
    const result= await collection.findOne({shortID});
//     console.log("result:",result)
    return res.json({totalClicks:result.visitHistory.length,
         analytics:result.visitHistory,
}
    )
}catch (error) {
     console.error("Error in analytics document:", error);
     res.status(500).send("Error updating document");
   }
}
export {generateNewShortURL,handleGetAnalytics};