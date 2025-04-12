// server.js or Firebase function
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-order-email', async (req, res) => {
  const { toEmail, orderId, orderItems, totalCost } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'raasika.m17@gmail.com',
      pass: 'jniz gqed bota yahe', 
    },
  });

  const orderSummary = orderItems
    .map(item => `${item.item_id} x${item.FoodQuantity} - ₹${item.totalFoodPrice}`)
    .join('\n');

    const mailOptions = {
        from: 'raasika.m17@gmail.com',
        to: toEmail,
        subject: `🧾 Munchr Order Confirmation - ${orderId}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #4CAF50;">Thank you for your order!</h2>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <thead>
                <tr style="background-color: #f5f5f5;">
                  <th style="text-align: left; padding: 8px;">Item</th>
                  <th style="text-align: center; padding: 8px;">Quantity</th>
                  <th style="text-align: right; padding: 8px;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${orderSummary}
              </tbody>
            </table>
            <h3 style="text-align: right; margin-top: 20px;">Total: ₹${totalCost}</h3>
            <p style="margin-top: 30px;">We hope you enjoy your meal 😋</p>
          </div>
        `,
      };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).send({ success: false, error: error.message });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));