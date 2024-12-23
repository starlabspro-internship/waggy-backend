const generateDeclineAdoptionRequestEmail = (ownerName, requesterName, petName) => {
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
            background-color: #e74c3c;
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
        .message {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 24px;
            color: #2c3e50;
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
            color: #e74c3c;
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
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="email-body">
            <div class="header">
                <img class="header-image" src="https://storage.googleapis.com/menu-view-storage/waggy/Waggy.png" alt="Waggy Logo" />
                <h1>Adoption Request Declined</h1>
            </div>
            <div class="content">
                <div class="message">Hello ${requesterName},</div>
                
                <p>We regret to inform you that your adoption request for <strong>${petName}</strong> has been declined by ${ownerName}</p>
                
                <p>We understand this can be disappointing, but we encourage you to explore other opportunities on Waggy to find the perfect match for you and your family.</p>
                
                <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>

                <p>Thank you for being a part of the Waggy community.</p>
                <p>Warm regards,<br>The Waggy Team</p>
            </div>
            <div class="footer">
                <div class="social-links">
                    <a href="#">Instagram</a> •
                    <a href="#">Facebook</a> •
                    <a href="#">TikTok</a>
                </div>
                <p>© 2024 Waggy. All rights reserved.</p>
                <p>You're receiving this email because you're a member of Waggy.</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

module.exports = generateDeclineAdoptionRequestEmail;
