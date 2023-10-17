import { client } from "../Database/db.js";


//to GEt a URl data
export function getAllURLData(req){
    return client
    .db("URL_SHORTENER")
    .collection("UrlShortener")
    .find(req.query)
    .toArray();
 }
//to delete a URl data
export function deleteUrlData(shortid){
    return client
    .db("URL_SHORTENER")
    .collection("UrlShortener")
    .findOneAndDelete({ shortID: shortid }); // Use findOneAndDelete to find and delete the document
}
 
