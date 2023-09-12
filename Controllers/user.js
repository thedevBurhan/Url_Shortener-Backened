import { client } from "../Database/db.js";
import  jwt  from "jsonwebtoken";
import dotenv from "dotenv"

//configure thhe environment
dotenv.config();
const SECRETKEY=process.env.SECRETKEY 
export function addUsers(userInfo){
    return client
    .db("URL_SHORTENER")
    .collection("Users")
    .insertOne(userInfo)
}

export function getUser(userEmail){
    return client
    .db("URL_SHORTENER")
    .collection("Users")
    .findOne({email:userEmail})
}
 export function generateJwtToken(id){
    return jwt.sign({id},SECRETKEY,{expiresIn:"1d"})
 }

 export function UrlShortener(urlData){
    return client
    .db("URL_SHORTENER")
    .collection("UrlShortener")
    .insertMany(urlData)
 }
