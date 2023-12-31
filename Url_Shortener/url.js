import shortid from "shortid";
import { UrlShortener } from "../Controllers/user.js";
import { deleteUrlData, getAllURLData } from "../Controllers/url.js";
import { client } from "../Database/db.js";
//to generate Short URl
async function generateNewShortURL(req, res) {
  const body = req.body;
  let date = new Date();
  let currentTimeStamp = date.toUTCString();
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  try {
    const shortID = shortid();
    await UrlShortener([
      {
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: [{ timestamp: currentTimeStamp }],
        userId: body.id,
      },
    ]);

    return res.status(200).json({ shortenerURl: shortID ,message:"Url create successfull",statusCode:200});
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error",statusCode:500 });
  }
}

//To Get the Analytics Count of URL
async function handleGetAnalytics(req, res) {
  try {
    await client.connect();
    const shortID = req.params.shortId.trim(); // Trim the shortID
    //  console.log("Short ID from Route:", shortID);
    const db = client.db("URL_SHORTENER");
    const collection = db.collection("UrlShortener");
    const result = await collection.findOne({ shortID });
    //     console.log("result:",result)
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    console.error("Error in analytics document:", error);
    res.status(500).send("Error updating document");
  }
}
//To Get All URL Data

async function AllURLData(req, res) {
  try {
    const url = await getAllURLData(req);
    if (url.length <= 0) {
      res.status(400).json({ data: "url Not Found" });
      return;
    }
    res.status(200).json({ url });
  } catch (error) {
    console.log(error);
    res.send(500).json({ data: "Internal Server Error" });
  }
}
//To get  URl Data for Specific User
async function GetURLDataForSpecificUser(req, res) {
  let allurl = await getAllURLData(req);
  console.log(allurl);
  try {
    if (allurl > 0) {
      res.status(400).json({ data: "No Data found" });
    } else {
      const url = allurl.filter((item) => item.userId == req.params.id);
      res.json({
        message: "url send successfull",
        statusCode: 200,
        urls: url.reverse(),
      });
    }
  } catch (error) {
    res.json({
      message: "Internal server error ",
      statusCode: 500,
    });
  }
}
// To Detele a Specific URL
async function deleteURL(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ data: "Wrong Request" });
    } else {
      const result = await deleteUrlData(id);
      console.log(result);
      res
        .status(200)
        .json({ data: { result: result,statusCode:200,
          message:"Short url deleted successfully" } });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal Server Error", message:'Internal server error',
    statusCode:500, });
  }
}
export {
  generateNewShortURL,
  handleGetAnalytics,
  deleteURL,
  AllURLData,
  GetURLDataForSpecificUser,
};
