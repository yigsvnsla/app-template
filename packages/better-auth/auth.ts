import { join } from "node:path";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { getEnvArray } from "@package/better-auth/helpers/env";
import { smtp_transporter } from "@package/better-auth/helpers/smtp";
import { InviteUserEmail } from "@package/email/templates/InviteUserEmail";
import { VerificationUserEmail } from "@package/email/templates/verificationUserEmail";
import { render } from "@package/email/utils/render";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { admin, magicLink, openAPI, organization } from "better-auth/plugins";
import { findUser } from "./helpers/client-sql";

type MagicLinkOptions = Parameters<typeof magicLink>["0"];
type EmailVerificationOptions = BetterAuthOptions["emailVerification"];

const magicLinkOptions: MagicLinkOptions = {
	disableSignUp: false,
	sendMagicLink: async ({ email, token, url }, request) => {
		const { messageId } = await smtp_transporter.sendMail({
			from: '"Project Carter" <project_carter@ethereal.email>',
			to: "bar@example.com",
			subject: "Invite Your Account 📨",
			html: await render(
				InviteUserEmail({
					appName: "APP_NAME",
					appImage: "https://remix.run/_brand/remix-letter-light.png",
					username: email,
					userImage: "https://avatars.githubusercontent.com/u/55502763?v=4",
					teamName: "TEAM_NAME",
					teamImage:
						"https://avatars.githubusercontent.com/u/132495275?s=200&v=4",
					inviteLink: url,
					inviteFromLocation: "INVITE_FROM_LOCATION",
				}),
			),
		});

		console.log("Message sent: %s", messageId);
	},
};

const emailVerificationOptions: EmailVerificationOptions = {
	sendOnSignUp: true,
	autoSignInAfterVerification: false,
	async sendVerificationEmail({ user, url, token }, request) {
		const { messageId } = await smtp_transporter.sendMail({
			from: '"Project Carter" <project_carter@ethereal.email>',
			to: "bar@example.com",
			subject: "Account Verification 📨",
			html: await render(
				VerificationUserEmail({
					// TODO: ADD USER INFO
					appName: "ACME INC",

					inviteLink: url,
				}),
			),
		});
		// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
		console.log("Message sent: %s", messageId);
	},
};

export const auth = betterAuth({
	appName: "better-auth-test",
	database: new LibsqlDialect({
		url: `file:${join(__dirname, "/database/better-auth.sqlite")}`,
	}),
	trustedOrigins: getEnvArray("BETTER_AUTH_TRUSTED_ORIGINS"),
	plugins: [
		admin({
			adminUserIds: ["kiT71kZPCyFOefHbvI4eZ9fqCKDQ2uGY"],
		}),
		organization({
			teams: {
				enabled: true,
				maximumTeams: 10,
				allowRemovingAllTeams: true,
			},
			allowUserToCreateOrganization: async (user) => {
				const current_user = await findUser(user.id);
				if (!current_user)
					throw new Error("[allowUserToCreateOrganization]: USER NOT FOUND");

				return current_user.role === "admin";
			},
		}),
		magicLink(magicLinkOptions),
		openAPI(),
	],
	emailAndPassword: { enabled: true, requireEmailVerification: true },
	logger: { disabled: false },
	emailVerification: emailVerificationOptions,
});
