import ReactMarkdown from 'react-markdown';

import "styles/pages/privacy.css"

const markdownPrivacy = `
# Privacy Policy Version 1.0 for the edio iOS App

## Introduction

This Privacy Policy describes how edio ("App", "we", "us", or "our") collects, uses, and protects your personal information when you use our mobile application (the "App").

## Information We Collect

We collect the following types of personal information when you use the App:

- **Usage Data**: Data related to your use of the App, such as your IP address, device type, operating system, and the date and time of your interactions.
- **User-Generated Content**: Any text, images, or other data you submit or upload to the App.
- **Cookies and other tracking technologies**: We use cookies and other tracking technologies to collect information about your use of the App and to improve your experience.

## How We Use Your Information

We use your personal information to:

- Provide, operate, and maintain the App.
- Enhance your experience by providing personalized content and recommendations.
- Respond to your inquiries and provide customer support.
- Analyze usage data to improve the App and our services.
- Comply with legal and regulatory obligations.

## Sharing Your Information

We may share your personal information with the following types of third parties:

- **Service Providers**: We may share your personal information with third-party vendors and service providers that perform services on our behalf, such as hosting, data analysis, customer service, and marketing assistance. These providers are obligated to protect your information and only use it as necessary to provide their services.
- **Compliance with Laws**: We may disclose your personal information to government or law enforcement agencies when required by law or in response to legal process.

Below is a non-exhaustive list of third-party vendors and service providers we may share your data with:

- **Axios**: Provides HTTP client services for making requests to servers. For more information, please see their Privacy Policy.
- **MongoDB**: Provides database services for storing and managing data. For more information, please see their Privacy Policy.

## Data Retention and Deletion

We will retain your personal information for as long as necessary for the purposes described above. You can request deletion of your personal information by contacting us at [matthew@edio.cc](mailto:matthew@edio.cc).

## Security

We take appropriate security measures to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction.

## Children's Privacy

The App is not intended for children under 13 years of age. We do not knowingly collect or solicit personal information from children under 13.

## Changes to This Privacy Policy

We may update this Privacy Policy from time to time. The updated Privacy Policy will be posted on the App and accessible through the App's settings.

## Contact Us

If you have any questions or concerns about this Privacy Policy, please contact us at [matthew@edio.cc](mailto:matthew@edio.cc).

Your privacy is important to us. We will take reasonable steps to protect your personal information and comply with applicable privacy laws.
`;

const Privacy = () => {
  return (
    <div className = "flex-conteiner">
        <ReactMarkdown className = "markdown-content">{markdownPrivacy}</ReactMarkdown>
    </div>
  )
}
export default Privacy;
