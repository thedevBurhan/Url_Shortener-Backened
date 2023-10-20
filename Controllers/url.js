import { client } from "../Database/db.js";
import { ObjectId } from "mongodb";

//to GEt a URl data
export function getAllURLData(req){
    return client
    .db("URL_SHORTENER")
    .collection("UrlShortener")
    .find(req.query)
    .toArray();
 }
//to delete a URl data
export function deleteUrlData(id){
    return client
    .db("URL_SHORTENER")
    .collection("UrlShortener")
    .deleteOne({_id:new ObjectId(id)}); // Use findOneAndDelete to find and delete the document
}
