require("dotenv").config;
const Razorpay = require('razorpay');
// const RAZORPAY_ID_KEY = process.env.RAZORPAY_ID_KEY;
// const RAZORPAY_SECRET_KEY = process.env.RAZORPAY_SECRET_KEY;
RAZORPAY_ID_KEY = "rzp_test_jg5DLX3jNS9fJ4"
RAZORPAY_SECRET_KEY = "NWBCqYvgyktp6k3H2cSw2K97"

const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_ID_KEY ?? "",
    key_secret: RAZORPAY_SECRET_KEY ?? ""
});

const renderProductPage = async (req, res) => {

    try {
        res.render('product');

    } catch (error) {
        console.log(error.message);
    }
}

const createOrder = async (req, res) => {
    try {
        const amount = req.body.amount * 100
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        }

        razorpayInstance.orders.create(options,
            (err, order) => {
                if (!err) {
                    console.log(order)
                    res.status(200).send({
                        success: true,
                        msg: 'Order Created',
                        order_id: order.id,
                        amount: amount,
                        key_id: RAZORPAY_ID_KEY??"",
                        product_name: req.body.name,
                        description: req.body.description,
                        contact: "7284063310",
                        name: "Hritik Dubey",
                        email: "dubeyhritik32@gmail.com"
                    });
                }
                else {
                    res.status(400).send({ success: false, msg: 'Something went wrong!' });
                }
            }
        );

    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    renderProductPage,
    createOrder
}