import { client } from "../Database/db.js";
import { ObjectId } from "mongodb";

//to delete a URl data
export function deleteUrlData(id){
    return client
    .db("URL_SHORTENER")
    .collection("Users")
   .deleteOne({_id:new ObjectId(id)})
 }
