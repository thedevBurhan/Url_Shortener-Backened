import { client } from "../Database/db.js";
import { ObjectId } from "mongodb";

//to GEt a URl data
export function getAllURLData(req){
    return client
    .db("URL_SHORTENER")
    .collection("UrlShortener")
    .find(req.query)//get by our requirement in postman 
    .toArray();
 }
//to delete a URl data
export function deleteUrlData(shortid){
    return client
    .db("URL_SHORTENER")
    .collection("UrlShortener")
    .findOne({shortID:shortid})
   .delete()
 }
