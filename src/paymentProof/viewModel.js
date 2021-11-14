const paymentProofViewModel = {};

paymentProofViewModel.createViewModel = (body, files) =>{
    const viewModel = {};
    viewModel.paymentAmount = body.paymentAmount;
    viewModel.paymentInfo = body.paymentInfo;
    viewModel.userId = body.userId;
    viewModel.PaymentProofPhoto =  new Date()+" "+`${process.env.serverAddress}/PaymentProofPhoto/${files[0].originalname}`;
    return viewModel; 
}
module.exports = paymentProofViewModel;
