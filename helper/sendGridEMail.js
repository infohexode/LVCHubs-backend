import axios from 'axios';

/*
*sends mail to the user when they signUp with confirmation url.
*/
export const signUpOption = (userInfo) => {
   
   return {
      "from": {
         "email": process.env.signupFrom
      },
      "personalizations": [
         {
            "to": [
               {
                  "email": userInfo.email
               }
            ],
            "dynamic_template_data": {
               "confirmEmailUrl": `${process.env.frontEndHttpPath}/confirmEmail/${encodeString(userInfo._id.toString())}`,
               "username": userInfo.firstname
            }
         }
      ],
      "template_id": process.env.signUpConfirmationTemplateId
   }
}


export const confirmLoyaltyOption = (userInfo) => {
   
   return {
      "from": {
         "email": process.env.signupFrom
      },
      "personalizations": [
         {
            "to": [
               {
                  "email": userInfo.email
               }
            ],
            "dynamic_template_data": {
               "username": userInfo.firstname
            }
         }
      ],
      "template_id": process.env.LoyaltyConfirmTemplateId
   }
}

export const confirmPartnerOption = (userInfo) => {
   
   return {
      "from": {
         "email": process.env.signupFrom
      },
      "personalizations": [
         {
            "to": [
               {
                  "email": userInfo.email
               }
            ],
            "dynamic_template_data": {
               "username": userInfo.firstname
            }
         }
      ],
      "template_id": process.env.PartnerEnlistConfirmTemplateId
   }
}


export const rejectPartnerOption = (userInfo, comment) => {
   
   return {
      "from": {
         "email": process.env.signupFrom
      },
      "personalizations": [
         {
            "to": [
               {
                  "email": userInfo.email
               }
            ],
            "dynamic_template_data": {
               "username": userInfo.firstname,
               "comment": comment
            }
         }
      ],
      "template_id": process.env.PartnerEnlistRejectTemplateId
   }
}








// export const InviteOption = (UserInfo) => {
   
//    return {
//       "from": {
//          "email": process.env.signupFrom
//       },
//       "personalizations": [
//          {
//             "to": [
//                {
//                   "email": UserInfo.inviteEmail
//                }
//             ],
//             "dynamic_template_data": {
//                "inviteUrl": `${process.env.frontEndHttpPath}/ref/`
               
//             }
//          }
//       ],
//       "template_id": process.env.inviteTemplateId
//    }
// }































/*
*sends mail to the user when they successfully confirm their email. 
*/
export const confirmMailOption = (userInfo) => {
   
   return {
      "from": {
         "email": process.env.signupFrom
      },
      "personalizations": [
         {
            "to": [
               {
                  "email": userInfo.email
               }
            ],
            "dynamic_template_data": {
               "username": userInfo.firstname
            }
         }
      ],
      "template_id": process.env.emailConfirmationTemplateId
   }
}

/*
*sends mail to the user when they upload their kyc details.
*/
export const kycUploadOption = (userInfo) => {
   
   return {
      "from": {
         "email": process.env.signupFrom
      },
      "personalizations": [
         {
            "to": [
               {
                  "email": userInfo.email
               }
            ],
            "dynamic_template_data": {
               "username": userInfo.name
            }
         }
      ],
      "template_id": process.env.kycUploadTemplateId
   }
}

/*
*sends mail to the user when they click on forgot password button with reset password link 
in the email.
*/
export const resetPasswordOption = (userInfo) => {
   return {
      "from": {
         "email": process.env.signupFrom
      },
      "personalizations": [
         {
            "to": [
               {
                  "email": userInfo.email
               }
            ],
            "dynamic_template_data": {
               "passwordResetUrl": `${process.env.frontEndHttpPath}/resetPassword/${encodeString(userInfo._id.toString())}`,
               "username": userInfo.firstname
            }
         }
      ],
      "template_id": process.env.ResetPasswordTemplateId
   }
}

/*
*sends mail to the user when they succussfully reset their password.
*/
export const passwordUpdateOption = (userInfo) => {
   return {
      "from": {
         "email": process.env.signupFrom
      },
      "personalizations": [
         {
            "to": [
               {
                  "email": userInfo.email
               }
            ],
            "dynamic_template_data": {
               "username": userInfo.fisrtname
            }
         }
      ],
      "template_id": process.env.passwordUpdateTemplateId
   }
}

/*
*sends mail to the user when their kyc is confirmed.
*/


/*
*sends mails to the user when their kyc is rejected.
*/


/*
*sends email to all the subscribers.
*/
export const sendBulkEmailOption = (userInfo) => {
   
   return {
      "from": {
         "email": process.env.signupFrom
      },
      "personalizations": [
         {
            "to": [
               {
                  "email": userInfo.email
               }
            ],
            "dynamic_template_data": {
               "username": userInfo.name,
               "phone_Number": userInfo.phone_Number
            }
         }
      ],
      "template_id": process.env.SendBulkEmailTemplateId
   }
}

/*
 * it is a third party api to send mails
 */
export const sendMail = async (options) => {
   try {
      const config = { "headers": { "Authorization": `Bearer ${process.env.sendGridAPIKey}` } };
      const url = process.env.sendgridEmailUrl;
      const { data } = await axios.post(url, options, config);
      return data;
   } catch (err) {
      console.log(err);
      return err;
   }
}

export const encodeString = (data)=> {
   const buff = Buffer.from(data, "utf8");
   return buff.toString('base64');
}


export const decodeString = (data)=> {
   const buff = Buffer.from(data, "base64");
   return buff.toString('utf8');
}


