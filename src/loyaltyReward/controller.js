import { STATUS, LOYALTYUPDATED ,LOYALTYINVALIDDATA} from './const';
const viewModel = require('./viewModel');
import userDbHelper, { getUsersById } from '../user/dbHelper';
import myWalletDbHelper,{getuserId ,updateLockedLvc} from '../myWallet/dbHelper';
import {sendMail,confirmLoyaltyOption} from '../helper/sendGridEMail';


const dbHelper = require('./dbHelper');

const loyaltyReward = {};


loyaltyReward.add = async (req) => {
    try {

        const loyaltyRewardViewModel = viewModel.createViewModel({...req.body ,userId:req.decoded.id});
        const my = await myWalletDbHelper.getuserId();
        // console.log(my[0].userId);
        // console.log("HELLO");
        // const x = my.forEach(element => element.userId);
        
        // let i=0;
        // for (let index = 0; index < my.length; index++){
        //     const element = my[index].userId;
        //     if((element)!=(loyaltyRewardViewModel["userId"]) || (my.length)==0)
        //     {
        //         console.log("HIIIIIIII");
        //     }
        // }
        
        
        if((my.length)==0 ){
            
            await myWalletDbHelper.save(loyaltyRewardViewModel);
        }
        // else if(){

        // }
        // else if(my[i].userId!==(loyaltyRewardViewModel["userId"])){
            for (let index = 0; index < my.length; index++) {
                var arr = [];
                arr.push(my[index].userId);
                    // const element = my[index].userId;
                    // var arr = [];
                    // await arr.push(element);
                    // console.log(arr);
                    // console.log(element);
                    // console.log(loyaltyRewardViewModel["userId"]);
                    // console.log("this");
                    // while(element--){
                    //     if(element!=(loyaltyRewardViewModel["userId"])){
                    //         console.log("Hello");
                    //         await myWalletDbHelper.save(loyaltyRewardViewModel); 
                    //     }
                    // }
                    // if(element!= (loyaltyRewardViewModel["userId"])){
                    //     console.log("Invail");
                    //     await myWalletDbHelper.save(loyaltyRewardViewModel); 
                    // }
                    // else{
                    //     await myWalletDbHelper.save(loyaltyRewardViewModel); 
                    // }
            }
            // return "saved"
            //     if((element)!=(loyaltyRewardViewModel["userId"]) || (my.length)==0){
            //         await myWalletDbHelper.save(loyaltyRewardViewModel); 
            //     }
            // }
            // console.log(this.element);
        //             await myWalletDbHelper.save(element); 
        //         }
        //     } 

        // for(let i=0;i<my.length;i++){
        // else if(x!==(loyaltyRewardViewModel["userId"])){
        //         await myWalletDbHelper.save(loyaltyRewardViewModel); 
        // }  
        
        // for (let index = 0; index < my.length; index++) {
        //     const element = subsriberList[index];
        //     await myWalletDbHelper.save(element); 
        // }
        // my.forEach((arrayItem)=> {
        //     var x = arrayItem.userId;
        //     console.log(x);
        // });
        // while((my[i].userId!==loyaltyRewardViewModel["userId"]) ){
        //     await myWalletDbHelper.save(loyaltyRewardViewModel);
        // }
        await dbHelper.save(loyaltyRewardViewModel);
        return {msg:'saved'};
    } catch (err) {
        return Promise.reject(err);
    }
}

loyaltyReward.getAll = async () => {
    try {
        return await dbHelper.getAll();
    } catch (err) {
        return Promise.reject(err);
    }
}

loyaltyReward.getLoyaltyById = async (id) => {
    try {
        return await dbHelper.getLoyaltyById(id);
    } catch (err) {
        return Promise.reject(err);
    }
}


loyaltyReward.updateStatus = async (body) => {
    try {
        let {LoyaltyId, LoyaltyStatus} = body;
        const status = STATUS.find(s=>(s===(LoyaltyStatus)));
        const tokens = await dbHelper.getTokenById(LoyaltyId);
        const Tokens = tokens[0].numberOfTokens;
        const Balance = tokens[0].lvcLocked;
        
        if(status && status !== STATUS[0]){
            const LoyaltyDetails = await dbHelper.getLoyaltyById(LoyaltyId);
            const userInfo = await userDbHelper.getUsersById(LoyaltyDetails[0].userId);
            const userid = LoyaltyDetails[0].userId;
            if(Tokens>0)
            {
                await myWalletDbHelper.updateLockedLvc(userid,Tokens);
                await dbHelper.updateLvc(LoyaltyId,Balance,Tokens);
            }
            await dbHelper.updateStatus(LoyaltyId, LoyaltyStatus);
            // const option = status === STATUS[1] ?
            //                     confirmLoyaltyOption(userInfo) : rejectLoyaltyOption(userInfo, comment);
            // await sendMail(option);
            return LOYALTYUPDATED;
       }

        return LOYALTYINVALIDDATA;
        
    } catch (err) {
        return Promise.reject(err);
    }
}



module.exports = loyaltyReward;