const loyaltyRewardViewModel = {};

loyaltyRewardViewModel.createViewModel = (body) =>{
    const viewModel = {};
    viewModel.numberOfTokens = body.numberOfTokens;
    viewModel.userId = body.userId;
    return viewModel; 
}
module.exports = loyaltyRewardViewModel;