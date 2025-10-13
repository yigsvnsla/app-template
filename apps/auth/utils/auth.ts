import { bearerPlugin } from "@app/auth/plugins/bearer-plugin.js";
import { databasePlugin } from "@app/auth/plugins/database-plugin.js";
import { openapiPlugin } from "@app/auth/plugins/openapi-plugin.js";
import { organizationPlugin } from "@app/auth/plugins/organization-plugin.js";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: databasePlugin,
  basePath: process.env.BETTER_AUTH_PATH,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    process.env.APP_ADMIN_ORIGIN || "",
    process.env.APP_FILES_ORIGIN || "",
    process.env.APP_ADMIN_WEB || "",
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: "Lax",
      partitioned: true,
    },
  },
  logger: {
    disabled: false,
    level: "debug",
  },
  onAPIError: {
    throw: true,
  },
  plugins: [openapiPlugin, organizationPlugin, bearerPlugin],
});

// admin({
//   ac,
//   roles,
//   defaultRole: 'user',
//   adminRoles: ['admin'],
// }),

//  magicLink(magicLinkOptions),
// emailVerification: emailVerificationOptions,
// type MagicLinkOptions = Parameters<typeof magicLink>["0"];
// type EmailVerificationOptions = BetterAuthOptions["emailVerification"];

// const magicLinkOptions: MagicLinkOptions = {
// 	disableSignUp: false,
// 	sendMagicLink: async ({ email, token, url }, request) => {
// 		const { messageId } = await smtp_transporter.sendMail({
// 			from: '"Project Carter" <project_carter@ethereal.email>',
// 			to: "bar@example.com",
// 			subject: "Invite Your Account 📨",
// 			html: await render(
// 				InviteUserEmail({
// 					appName: "APP_NAME",
// 					appImage: "https://remix.run/_brand/remix-letter-light.png",
// 					username: email,
// 					userImage: "https://avatars.githubusercontent.com/u/55502763?v=4",
// 					teamName: "TEAM_NAME",
// 					teamImage:
// 						"https://avatars.githubusercontent.com/u/132495275?s=200&v=4",
// 					inviteLink: url,
// 					inviteFromLocation: "INVITE_FROM_LOCATION",
// 				}),
// 			),
// 		});

// 		console.log("Message sent: %s", messageId);
// 	},
// };

// const emailVerificationOptions: EmailVerificationOptions = {
// 	sendOnSignUp: true,
// 	autoSignInAfterVerification: false,
// 	async sendVerificationEmail({ user, url, token }, request) {
// 		const { messageId } = await smtp_transporter.sendMail({
// 			from: '"Project Carter" <project_carter@ethereal.email>',
// 			to: "bar@example.com",
// 			subject: "Account Verification 📨",
// 			html: await render(
// 				VerificationUserEmail({
// 					// TODO: ADD USER INFO
// 					appName: "ACME INC",

// 					inviteLink: url,
// 				}),
// 			),
// 		});
// 		// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// 		console.log("Message sent: %s", messageId);
// 	},
// };
