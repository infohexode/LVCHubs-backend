import model from './model';
import {GOOGLE} from './const';
import {tokenForUser} from './helper';

import {OAuth2Client} from 'google-auth-library';

const CLIENT_ID = process.env.clientIDgoogle;
const client = new OAuth2Client(CLIENT_ID);

/*hit google api
 generate token 
 verify the token 
 get userid,name,email,url,google id,img url */ 

export const googleAuth = async (req, res, next) => {
try {
            const token = req.body.token;
            const ticket = await client.verifyIdToken({idToken: token,audience: CLIENT_ID});
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            const google_id = userid;
            const name = payload.name;
            const email = payload.email;
            const imgurl = payload.picture;
            const existUser = await model.findOne({ socialMediaId: google_id });
            if(!existUser){
              /*if user doesn't exist then create new user according to model
            else return token of newUser
            if exist return token of existUser*/   
                const newUser = new model({
                socialMediaId: google_id,
                socialMediaName: GOOGLE,
                email: email,
                name: name,
                imageUrl: imgurl
              });
              await newUser.save();
              
              return res.status(200).json({token: tokenForUser(newUser),name:newUser.name,id:newUser._id,url:newUser.imageUrl,email:newUser.email, loginFrom: "Google"});
            }
            
            return res.status(200).json({token: tokenForUser(existUser),name:existUser.name,id:existUser._id,url:existUser.imageUrl,email:existUser.email, loginFrom: "Google"});
        }catch(error){
        next(error)
    }
}