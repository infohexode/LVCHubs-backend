const enlistPartnerViewModel = {};

enlistPartnerViewModel.createViewModel = (body, files) =>{
    const viewModel = {};
    viewModel.comapanyName = body.comapanyName;
    viewModel.title = body.title; 
    viewModel.firstname = body.firstname;
    viewModel.lastname = body.lastname;
    viewModel.phoneNumber = body.phoneNumber;
    viewModel.email = body.email;
    viewModel.Address= body.Address;
    viewModel.typeofBussiness= body.typeofBussiness;
    viewModel.state = body.state;
    viewModel.city = body.city;
    viewModel.nationality = body.nationality;
    viewModel.websiteUrl = body.websiteUrl;
    viewModel.productDetails = body.productDetails;
    viewModel.companyDetails = body.companyDetails;
    viewModel.keyGoals = body.keyGoals;  
    viewModel.hearAboutUs = body.hearAboutUs;  
    viewModel.userId = body.userId;
    if(files[0]!=undefined)
    viewModel.logo =  new Date()+" "+`${process.env.serverAddress}/logo/${files[0].originalname}`;
    else
    viewModel.logo =null;
    return viewModel; 
}
module.exports = enlistPartnerViewModel;
