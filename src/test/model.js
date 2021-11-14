
import {Schema, model} from 'mongoose';

const Test = new Schema({
    name: { type: String, default: 'hahaha' },
    age: { type: Number },
    bio: { type: String },
    date: { type: Date, default: Date.now }
  });

  const ForTesting = new Schema(
    {
      name:{type:String},
      email:{type: String},
      phone:{type: Number},
      password:{type:String}

    });

export default model('Test', Test);