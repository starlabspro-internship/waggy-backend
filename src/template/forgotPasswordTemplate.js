const generateForgotPasswordEmail = (resetLink) => {
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
        .welcome-message {
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

        @media (max-width: 600px) {
            .container {
                width: 90%;
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
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="email-body">
            <div class="header">
                <h1>Reset Your Password</h1>
            </div>
            <div class="content">
                <div class="welcome-message">We received a request to reset your password.</div>
                
                <p>If you didn’t request a password reset, please ignore this email.</p>
                
                <p>To reset your password, click the button below:</p>

                <table width="100%">
                    <tr>
                        <td align="center">
                            <a href="${resetLink}" class="cta-button">Reset Password</a>
                        </td>
                    </tr>
                </table>

                <p>If you have any questions, feel free to contact our support team.</p>

                <p>Warm regards,<br>The Waggy Team</p>
            </div>
            <div class="footer">
                <div class="social-links">
                    <a href="#">Instagram</a> •
                    <a href="#">Facebook</a> •
                    <a href="#">TikTok</a>
                </div>
                <p>© 2024 Waggy. All rights reserved.</p>
                <p>You're receiving this email because you signed up for Waggy</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

module.exports = generateForgotPasswordEmail;