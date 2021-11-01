const viewModel = require('./viewModel');
import dbHelper from './dbHelper';
import userDbHelper, { getActiveStatus } from '../user/dbHelper';
// import {sendMail, kycUploadOption, 
//     confirmKycOption, rejectKycOption} from '../helper/sendGridEMail';
// import { STATUS, KYCUPDATED, KYCINVALIDDATA } from './const';

const profile = {};


profile.add = async (req) => {
    try {
        // const kycInfo = await kyc.getKycByUserId(req);
        const profileViewModel = viewModel.createViewModel({...req.body ,userId:req.decoded.id}, req.files);
        await dbHelper.save(profileViewModel);
        return {msg:'saved'};
    } catch (err) {
        return Promise.reject(err);
    }
}

profile.update = async (req) => {
    try {
        const profileViewModel = viewModel.createViewModel(req.body, req.files);        
        return await dbHelper.update(req.body.id,profileViewModel);
    
    } catch (err) {
        return Promise.reject(err);
    }
}


profile.getProfileById = async (id) => {
    try {
        return await dbHelper.getProfileById(id);
    } catch (err) {
        return Promise.reject(err);
    }
}


profile.getAll = async () => {
    try {
        return await dbHelper.getAll();
    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = profile;