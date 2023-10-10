import express from "express";
import { usersRouter } from "./Routers/users.js";
import { urlRouter } from "./Routers/url.js";
import dotenv from "dotenv";
import { isAuthenticated } from "./Authentication/auth.js";
import cors from "cors";
import { client } from "./Database/db.js";

//configure thhe environment
dotenv.config();
const PORT = process.env.PORT;

// initialize express server framework
const app = express();
// MiddleWare
app.use(express.json());
app.use(cors());
//UserssRouter
app.use("/users", usersRouter);
//UrlRouter
app.use("/url", isAuthenticated, urlRouter);

// Route to update the document
app.get("/:shortId", async (req, res) => {
    try {
      await client.connect();
      const shortID = req.params.shortId.trim(); // Trim the shortID
      console.log("Short ID from Route:", shortID);
      const db = client.db("URL_SHORTENER");
      const collection = db.collection("UrlShortener");
      let date= new Date();
      let currentTimeStamp=date.toUTCString()
      // Create the index on shortID
      collection.createIndex({ shortID: 1 });
      
      const result = await collection.findOneAndUpdate(
        { shortID }, // Use exact match
        {
          $push: {
            visitHistory: { timestamp: currentTimeStamp },
          },
        }
      );
  
 
  
      if (result) {
        console.log("Document found and updated successfully");
        const redirectURL = result.redirectURL;
        // console.log("Redirecting to:", redirectURL);
        res.redirect(redirectURL);
      } else {
        // console.error("Document not found for short ID:", shortID);
        res.status(404).send(`Document not found for short ID: ${shortID}`);
      }
    } catch (error) {
      console.error("Error updating document:", error);
      res.status(500).send("Error updating document");
    } finally {
      await client.close();
    }
  });
  

// listen to a server
app.listen(PORT, () => console.log(`Server Running in localhost:${PORT}`));
