import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({

userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
},
storyId:Number,
sceneId:String,
selected:Number,
correct:Boolean,

time:{
type:Date,
default:Date.now
}

});

export default mongoose.model("Answer",answerSchema);