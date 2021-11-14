const viewModel = require('./viewModel');
import dbHelper from './dbHelper';
import { STATUS, PAYMENTUPDATED } from './const';

const paymentProof = {};


paymentProof.add = async (req) => {
    try {
        const paymentProofViewModel = viewModel.createViewModel({...req.body ,userId:req.decoded.id}, req.files);
        await dbHelper.save(paymentProofViewModel);
        return {msg:'saved'};
    } catch (err) {
        return Promise.reject(err);
    }
}



paymentProof.updateStatus = async (body) => {
    try {
        let {PaymentId, PaymentStatus} = body;
        const status = STATUS.find(s=>(s===(PaymentStatus)));
        if(status && status !== STATUS[0]){
            // const kysDetails = await dbHelper.getkycById(kycId);
            // const userInfo = await userDbHelper.getUsersById(kysDetails[0].userId);
            await dbHelper.updateStatus(PaymentId,PaymentStatus);
            // const option = stat === STATUS[1] ?
            //                     confirmKycOption(userInfo) : rejectKycOption(userInfo, comment);
            // await sendMail(option);
            return PAYMENTUPDATED;
        }

        // return KYCINVALIDDATA;
        
    } catch (err) {
        return Promise.reject(err);
    }
}












module.exports = paymentProof;