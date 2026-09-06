export interface PrivacyPolicySection {
  title: string;
  content: string;
}

export interface PrivacyPolicy {
  title: string;
  appName: string;
  effectiveDate: string;
  contactEmail: string;
  sections: PrivacyPolicySection[];
}

export const privacyPolicies: Record<string, PrivacyPolicy> = {
  "scratch-and-learn": {
    title: "Scratch and Learn Privacy Policy",
    appName: "Scratch and Learn",
    effectiveDate: "September 5, 2026",
    contactEmail: "tiwaridotrajesh@gmail.com",
    sections: [
      {
        title: "1. Introduction",
        content: "Welcome to Scratch and Learn! This privacy policy describes how Scratch and Learn (the 'App') treats your privacy and information. The App is a fun, educational kids learning game designed strictly with children's safety and privacy in mind."
      },
      {
        title: "2. Registration and Accounts",
        content: "The App is designed to work completely without requiring any account or user registration. We do not ask users—including parents or children—to create a login, register, or provide any credentials to access any feature in the game."
      },
      {
        title: "3. No Personal Information Collection",
        content: "We take children's privacy very seriously. The App does NOT collect, store, or ask for any personal information. This includes but is not limited to names, email addresses, phone numbers, locations, device identifiers, or IP addresses. All game progress and interactions are kept strictly local to your device and are never sent to any external server."
      },
      {
        title: "4. Advertising and Third-Party Analytics",
        content: "To provide a clean, educational, and completely distraction-free learning environment, the App does NOT contain any third-party advertisements or commercial banners. Additionally, we do NOT use any third-party analytics, behavioral tracking, or cookies inside the App."
      },
      {
        title: "5. Information Sharing and Sales",
        content: "Since we do not collect any personal or anonymous user data, we do NOT sell, rent, trade, or share any user information with third parties. Your child's gameplay remains entirely private."
      },
      {
        title: "6. Children's Privacy (COPPA Compliance)",
        content: "The App is fully compliant with the Children's Online Privacy Protection Act (COPPA). We do not knowingly or intentionally collect any personal information from children under the age of 13. If you have any questions or concerns as a parent or guardian, please contact us immediately."
      },
      {
        title: "7. Data Security and Retention",
        content: "Because we store zero user data or personal records on external servers, there is no threat of server-side data leaks or security breaches. The local game progress is stored securely on your device and can be cleared at any time by uninstalling the App."
      },
      {
        title: "8. Changes to This Privacy Policy",
        content: "We may update this privacy policy from time to time to reflect changes in our App's features or compliance regulations. We recommend reviewing this policy periodically. Any changes will be posted on this public page with an updated effective date."
      },
      {
        title: "9. Contact Us",
        content: "If you have any questions, suggestions, or concerns regarding your child's privacy or this policy, please feel free to reach out to us at: tiwaridotrajesh@gmail.com. We will respond promptly as soon as possible."
      }
    ]
  }
};
