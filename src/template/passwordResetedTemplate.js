const generatePasswordResetEmail = (email) => {
    return `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
          body {
              font-family: 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f5f8fa;
              width: 100%;
              box-sizing: border-box;
          }
          .container {
              width: 800px;
              margin: 0 auto;
              padding: 20px 10px;
          }
          .email-body {
              background-color: #ffffff;
              border-radius: 12px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
              overflow: hidden;
              width: 100%;
          }
          .header {
              background-color: #4a90e2;
              padding: 40px 10px;
              text-align: center;
          }
          .header .header-image {
              width: 100px;
              height: 100px;
              margin-bottom: 10px;
          }
          .header h1 {
              color: white;
              margin: 0;
              font-size: 28px;
              font-weight: 600;
          }
          .content {
              padding: 40px;
              color: #2c3e50;
          }
          .confirmation-message {
              font-size: 20px;
              font-weight: 700;
              margin-bottom: 24px;
              color: #2c3e50;
          }
          .cta-button {
              display: inline-block;
              background-color: #4a90e2;
              color: white;
              padding: 14px 32px;
              border-radius: 16px;
              text-decoration: none;
              font-weight: 600;
              margin: 20px auto;
              text-align: center;
          }
          .footer {
              text-align: center;
              padding: 20px;
              color: #8795a1;
              font-size: 14px;
          }
          .social-links {
              margin: 20px 0;
          }
          .social-links a {
              margin: 0 10px;
              color: #4a90e2;
              text-decoration: none;
          }
          .text-white {
              color: white;
          }

          @media (max-width: 600px) {
              .container {
                  width: 99%;
              }
              .email-body {
                  width: 100%;
                  border-radius: 0;
              }
              .header h1 {
                  font-size: 18px;
              }
              .cta-button {
                  padding: 6px 12px;
                  font-size: 12px;
                  margin: 20px auto;
              }
              .confirmation-message {
              font-size: 14;
              font-weight: 500;
              margin-bottom: 24px;
              color: #2c3e50;
          }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="email-body">
              <div class="header">
                  <img class="header-image" src="https://storage.googleapis.com/menu-view-storage/waggy/Waggy.png" alt="Waggy Logo" />
                  <h1>Password Reset Confirmation</h1>
              </div>
              <div class="content">
                  <div class="confirmation-message">Your password has been reset successfully!</div>
                  
                  <p>We're writing to confirm that the password for your Waggy account has been changed.</p>
                  
                  <p>If you did not make this change, please contact our support team immediately.</p>

                  <table width="100%">
                      <tr>
                          <td align="center">
                              <a href="https://waggy.com/login" class="cta-button"><span class="text-white">Log In to Your Account</span></a>
                          </td>
                      </tr>
                  </table>

                  <p>Warm regards,<br>The Waggy Team</p>
              </div>
              <div class="footer">
                  <p>© 2024 Waggy. All rights reserved.</p>
                  <p>This is an automated message. Please do not reply.</p>
              </div>
          </div>
      </div>
  </body>
  </html>
    `;
  };
  
  module.exports = generatePasswordResetEmail;