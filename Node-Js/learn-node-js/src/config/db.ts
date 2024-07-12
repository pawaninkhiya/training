import mongoose,{connect} from "mongoose";

function  connectMongoDb(){
    return connect("mongodb://localhost:27017/learn-node-ts")
    .then(()=>{
        console.log("Db Connected");
    }).catch((error)=>{
        console.log(error);
    })
}

export default connectMongoDb