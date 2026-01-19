import nodemailer from "nodemailer";

// 1. Create a single reusable transporter instance
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_PORT === "465", // true for 465, false for others
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface MailProps {
  to: string;
  documentTitle: string;
  senderName: string;
}

interface SendInviteEmailProps extends MailProps {
  permission: string;
}

/**
 * Sends an invitation email when a document is shared
 */
export async function sendInviteEmail({
  to,
  documentTitle,
  permission,
  senderName,
}: SendInviteEmailProps) {
  const mailOptions = {
    from: `"Collaborate App" <${process.env.SMTP_USER}>`,
    to,
    subject: `${senderName} invited you to collaborate on "${documentTitle}"`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #3b82f6; padding: 20px; text-align: center;">
            <h2 style="color: white; margin: 0;">Document Invitation</h2>
        </div>
        <div style="padding: 30px; color: #374151;">
          <p>Hi there,</p>
          <p><strong>${senderName}</strong> has invited you to collaborate on the document: <strong>${documentTitle}</strong>.</p>
          <div style="margin: 20px 0; padding: 15px; background: #f3f4f6; border-radius: 8px;">
             <strong>Permission Level:</strong> ${permission}
          </div>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
               style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
               Open Document
            </a>
          </div>
        </div>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
}

/**
 * Sends a revocation email when access is removed
 */
export const sendRevocationEmail = async ({
  to,
  documentTitle,
  senderName,
}: MailProps) => {
  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 550px; margin: 0 auto; border: 1px solid #fee2e2; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #ef4444; padding: 25px; text-align: center;">
        <h2 style="color: white; margin: 0; font-size: 22px; letter-spacing: 0.5px;">Access Revoked</h2>
      </div>
      <div style="padding: 30px; color: #1f2937; background-color: #ffffff;">
        <p style="font-size: 16px; margin-bottom: 20px;">Hello,</p>
        <p style="font-size: 16px; line-height: 1.6;">
          This is a notification to inform you that <strong>${senderName}</strong> has removed your access to the document:
        </p>
        <div style="margin: 25px 0; padding: 20px; border-left: 4px solid #ef4444; background-color: #fef2f2; font-size: 18px; font-weight: bold; color: #b91c1c;">
          "${documentTitle}"
        </div>
        <p style="font-size: 14px; color: #6b7280; line-height: 1.5; margin-top: 30px; border-top: 1px solid #f3f4f6; padding-top: 20px;">
          You can no longer view, edit, or share this document. If you believe this was an error, please reach out to the document owner directly.
        </p>
      </div>
      <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #9ca3af;">
        &copy; ${new Date().getFullYear()} Your Collaborative Workspace
      </div>
    </div>
  `;

  return await transporter.sendMail({
    from: `"Security Team" <${process.env.SMTP_USER}>`,
    to,
    subject: `Access Revoked: ${documentTitle}`,
    html: htmlContent,
  });
};
