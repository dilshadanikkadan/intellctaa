import * as nodemailer from 'nodemailer';
let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: 'pedri33123312@gmail.com',
    pass: 'rgwp lehu mtnk ldmq',
  },
});

transporter.verify((error, sucess) => {
  if (error) { 
    console.log(error);
  }
});

export class NodemailService {
  async sendEmail(mailOptions) {
    console.log(mailOptions);
    const mail = {
      from: 'pedri3312@gmail.com',
      to: mailOptions.email,
      subject: mailOptions.subject,
      html: `<p> ${mailOptions.message}</p> <p style="color:teal; font-size:25px; letter-spacing:2px;">
              <b>${mailOptions.otp}</b>
              </p>
              expires in 
              <p>${120} seconds</p>
              `,
    };
    try {
      await transporter.sendMail(mail);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  async forgotPasswordEmail(mailOptions) {
    const mail = {
      from: 'pedri3312@gmail.com',
      to: mailOptions.email,
      subject: mailOptions.subject,
      html: `
         <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Forgot Password</title>
          <style>
            /* Paste your CSS styles here */
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
              color: #333333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .logo {
              text-align: center;
              margin-bottom: 20px;
            }
            .logo img {
              max-width: 150px;
              height: auto;
            }
            .content {
              padding: 20px;
              border-top: 1px solid #e0e0e0;
            }
            .otp-container {
              background-color: #f0f0f0;
              padding: 10px;
              text-align: center;
              border-radius: 5px;
              margin-bottom: 20px;
            }
            .otp-text {
              color: teal;
              font-size: 25px;
              letter-spacing: 2px;
            }
            .expiry-text {
              font-size: 14px;
              color: #777777;
            }
            .button {
              display: inline-block;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
              margin-top: 20px;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
              text-align: center;
              color: #777777;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <h2>Forgot Your Password?</h2>
              <p>We received a request to reset the password for your account.</p>
              <div class="otp-container">
                <p class="otp-text"><b>${mailOptions.otp}</b></p>
                <p class="expiry-text">Expires in ${mailOptions.expiresInSeconds} seconds</p>
              </div>
              <p>If you did not request this, you can safely ignore this email.</p>
              <a class="button" href="http://localhost:3000/resetpassword?token=${mailOptions.token}">Reset Password</a>
            </div>
            <div class="footer">
              <p>This email was sent by Intellecta.</p>
              <p>&copy; ${new Date().getFullYear()} Intellecta. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
              `,
    };
    try {
      await transporter.sendMail(mail);
    } catch (error) {
      console.log(error);
    }
  }
}
