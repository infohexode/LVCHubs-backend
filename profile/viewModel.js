const profileViewModel = {};

profileViewModel.createViewModel = (body, files) =>{
    const viewModel = {};
    viewModel.DOB = body.DOB;
    viewModel.title = body.title; 
    viewModel.firstname = body.firstname;
    viewModel.lastname = body.lastname;
    viewModel.phone = body.phone;
    viewModel.affiliateCode = body.affiliateCode;
    viewModel.Address= body.Address;
    viewModel.postalCode= body.postalCode;
    viewModel.state = body.state;
    viewModel.city = body.city;
    viewModel.nationality = body.nationality;
    if(files[0]!=undefined)
    viewModel.profilePhoto =  `${process.env.serverAddress}/profilePhoto/${files[0].originalname}`;
    else
    viewModel.profilePhoto =null;
     return viewModel; 
}

profileViewModel.createUserViewModel = (obj) =>{
    const viewModel = {};

    viewModel.firstname = obj.obj.firstname;
    viewModel.lastname = obj.obj.lastname;
    viewModel.phoneNumber = obj.obj.phoneNumber;
    viewModel.userId = obj.userId;
    return viewModel; 
}

module.exports = profileViewModel;
