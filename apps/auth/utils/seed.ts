import { $, organizations, Seed, type SeedConfig, users } from "@better-auth-kit/seed";

export const config: SeedConfig = {
  rows: 10,
};

export const seed = Seed({
  // ...organizations({
  //   member:{}
  // })
  // Adds 100 users (including sessions and accounts)
  ...users({
    account: {
      password: $.password(() => "password123456"),
    },
  }),
});
