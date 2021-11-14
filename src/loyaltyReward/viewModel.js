const loyaltyRewardViewModel = {};

loyaltyRewardViewModel.createViewModel = (body) =>{
    const viewModel = {};
    viewModel.title = body.title;
    viewModel.firstname = body.firstname;
    viewModel.lastname = body.lastname;
    viewModel.phoneNumber = body.phoneNumber;
    viewModel.numberOfTokens = body.numberOfTokens;
    viewModel.city = body.city;
    viewModel.nationality = body.nationality;
    viewModel.userId = body.userId;
    return viewModel; 
}
module.exports = loyaltyRewardViewModel;