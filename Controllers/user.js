import { client } from "../Database/db.js";
import  jwt  from "jsonwebtoken";
import dotenv from "dotenv"
import { ObjectId } from "mongodb";
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
//To get details by key &value
export function getAllUsers(req){
    return client
    .db("URL_SHORTENER")
    .collection("Users")
    .find(req.query)//get by our requirement in postman 
    .toArray();
}
//to delete a student data
export function deleteUsersData(id){
    return client
    .db("URL_SHORTENER")
    .collection("Users")
   .deleteOne({_id:new ObjectId(id)})
 }
//to delete a url data
export function deleteUrlData(id){
    return client
    .db("URL_SHORTENER")
    .collection("UrlShortener")
   .deleteOne({_id:new ObjectId(id)})
 }