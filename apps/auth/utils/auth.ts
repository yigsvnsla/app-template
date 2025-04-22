import { join } from "node:path";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
	database: new LibsqlDialect({
		url: `file:${join(__dirname, "../database/better-auth.sqlite")}`,
	}),
	// trustedOrigins: [process.env.CLIENT_ADMIN_PANEL],
	plugins: [
		// admin(), magicLink(magicLinkOptions),
		openAPI(),
	],
	emailAndPassword: { enabled: true, requireEmailVerification: true },
	logger: { disabled: false },
	// emailVerification: emailVerificationOptions,
});

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

