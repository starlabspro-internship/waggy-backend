const generateWelcomeEmail = (email) => {
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
            margin: 70px auto;
            text-align: center;
        }
        .feature-box {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            width: 100%;
            box-sizing: border-box;
        }
        .feature-item {
            margin: 12px 0;
            font-size: 16px;
        }
        .feature-table {
            width: 100%;
            border-collapse: collapse;
        }
        .feature-table td {
            padding: 8px;
            vertical-align: middle;
        }
        .feature-icon {
            width: 18px;
            height: 18px;
            margin-right: 8px;
        }
        .header-table {
            width: 100%;
            border-collapse: collapse;
        }
        .header-title {
            display: inline-block;
            vertical-align: middle;
        }
        .mini-logo {
            width: 20px;
            height: 20px;
            vertical-align: middle;
            margin-left: 8px;
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
                margin: 20px auto;
            }
            .feature-box {
                margin: 10 0;
                padding: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="email-body">
            <div class="header">
                <img class="header-image" src="https://storage.googleapis.com/menu-view-storage/waggy/Waggy.png" alt="Wagy Logo" />
                <table class="header-table" align="center">
                    <tr>
                        <td align="center">
                            <h1 class="header-title">Welcome to the Waggy!</h1>
                            <img class="mini-logo" src="https://storage.googleapis.com/menu-view-storage/waggy/shiba.png" alt="shiba" />
                        </td>
                    </tr>
                </table>
            </div>
            <div class="content">
                <div class="welcome-message">Your pet's next best friend is waiting!</div>
                
                <p>Thanks for joining Waggy - the perfect place for pet parents and their furry companions!</p>
                
                <div class="feature-box">
                    <table class="feature-table">
                        <tr>
                            <td width="30">
                                <img class="feature-icon" src="https://storage.googleapis.com/menu-view-storage/waggy/connect.png" alt="connect" />
                            </td>
                            <td>Connect with local pet parents</td>
                        </tr>
                        <tr>
                            <td width="30">
                                <img class="feature-icon" src="https://storage.googleapis.com/menu-view-storage/waggy/pet-care.png" alt="pet care" />
                            </td>
                            <td>Arrange fun pet playdates</td>
                        </tr>
                        <tr>
                            <td width="30">
                                <img class="feature-icon" src="https://storage.googleapis.com/menu-view-storage/waggy/location.png" alt="location" />
                            </td>
                            <td>Discover pet-friendly events nearby</td>
                        </tr>
                        <tr>
                            <td width="30">
                                <img class="feature-icon" src="https://storage.googleapis.com/menu-view-storage/waggy/girl.png" alt="share" />
                            </td>
                            <td>Share your pet's precious moments</td>
                        </tr>
                    </table>
                </div>

                <p><strong>Ready to start?</strong> Complete these quick steps:</p>
                
                <ol>
                    <li>Create your pet's profile</li>
                    <li>Add some adorable photos</li>
                    <li>Start matching with other pets!</li>
                </ol>

                <table width="100%">
                    <tr>
                        <td align="center">
                            <a href="#" class="cta-button"><span class="text-white">Set Up Your Pet's Profile</span></a>
                        </td>
                    </tr>
                </table>

                <p><a href="#">Need help getting started?</a> Our support team is always here to assist you!</p>

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

module.exports = generateWelcomeEmail;
