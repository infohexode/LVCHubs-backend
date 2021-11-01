const dbHelper = require('./dbHelper');
const viewModel = require('./viewModel');
import userDbHelper, { getUsersById } from '../user/dbHelper';
import {sendMail, confirmPartnerOption, 
    rejectPartnerOption} from '../helper/sendGridEMail';

import { STATUS, PARTNERUPDATED , PARTNERINVALIDDATA } from './const';
const enlistPartner = {};


enlistPartner.add = async (req) => {
    try {
        const enlistPartnerViewModel = viewModel.createViewModel({...req.body,userId:req.decoded.id}, req.files);
        await dbHelper.save(enlistPartnerViewModel);
        return {msg:'saved'};
    } catch (err) {
        return Promise.reject(err);
    }
}


enlistPartner.update = async (body) => {
    try {
        return await dbHelper.update(body);
    
    } catch (err) {
        return Promise.reject(err);
    }
}


enlistPartner.updateStatus = async (body) => {
    try {
        let {PartnerId, PartnerStatus,comment} = body;
        const status = STATUS.find(s=>(s===(PartnerStatus)));
        if(status && status !== STATUS[0]){
            const PartnerDetails = await dbHelper.getPartnerById(PartnerId);
            const userInfo = await userDbHelper.getUsersById(PartnerDetails[0].userId);
            await dbHelper.updateStatus(PartnerId, PartnerStatus ,comment);
            const option = status === STATUS[1] ?
                                confirmPartnerOption(userInfo) : rejectPartnerOption(userInfo, comment);
            await sendMail(option);
            return PARTNERUPDATED;
       }

        return PARTNERINVALIDDATA;
        
    } catch (err) {
        return Promise.reject(err);
    }
}


enlistPartner.delete = async (id) => {
    try {
        return await dbHelper.delete(id);
    } catch (err) {
        return Promise.reject(err);
    }
}

enlistPartner.getPartnerById = async (id) => {
    try {
        return await dbHelper.getPartnerById(id);
    } catch (err) {
        return Promise.reject(err);
    }
}

enlistPartner.getAll = async () => {
    try {
        return await dbHelper.getAll();
    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = enlistPartner;