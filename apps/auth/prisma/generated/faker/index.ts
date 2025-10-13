import {  } from '../client/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeUser() {
  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    updatedAt: faker.date.anytime(),
    image: faker.image.avatar(),
  };
}
export function fakeUserComplete() {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    emailVerified: faker.datatype.boolean({ probability: 0.5 }),
    image: faker.image.avatar(),
  };
}
export function fakeSession() {
  return {
    expiresAt: faker.date.anytime(),
    token: faker.internet.jwt(),
    updatedAt: faker.date.anytime(),
    ipAddress: faker.internet.ipv4(),
    userAgent: faker.internet.userAgent(),
    activeOrganizationId: undefined,
    activeTeamId: undefined,
  };
}
export function fakeSessionComplete() {
  return {
    id: faker.string.uuid(),
    expiresAt: faker.date.anytime(),
    token: faker.internet.jwt(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    ipAddress: faker.internet.ipv4(),
    userAgent: faker.internet.userAgent(),
    userId: faker.string.uuid(),
    activeOrganizationId: undefined,
    activeTeamId: undefined,
  };
}
export function fakeAccount() {
  return {
    accountId: faker.string.uuid(),
    providerId: faker.string.uuid(),
    accessToken: undefined,
    refreshToken: undefined,
    idToken: undefined,
    accessTokenExpiresAt: undefined,
    refreshTokenExpiresAt: undefined,
    scope: undefined,
    password: undefined,
    updatedAt: faker.date.anytime(),
  };
}
export function fakeAccountComplete() {
  return {
    id: faker.string.uuid(),
    accountId: faker.string.uuid(),
    providerId: faker.string.uuid(),
    userId: faker.string.uuid(),
    accessToken: undefined,
    refreshToken: undefined,
    idToken: undefined,
    accessTokenExpiresAt: undefined,
    refreshTokenExpiresAt: undefined,
    scope: undefined,
    password: undefined,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeVerification() {
  return {
    identifier: faker.lorem.words(5),
    value: faker.lorem.words(5),
    expiresAt: faker.date.anytime(),
  };
}
export function fakeVerificationComplete() {
  return {
    id: faker.string.uuid(),
    identifier: faker.lorem.words(5),
    value: faker.lorem.words(5),
    expiresAt: faker.date.anytime(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
export function fakeOrganizationRole() {
  return {
    role: faker.lorem.words(5),
    permission: faker.lorem.words(5),
    updatedAt: undefined,
  };
}
export function fakeOrganizationRoleComplete() {
  return {
    id: faker.string.uuid(),
    organizationId: faker.string.uuid(),
    role: faker.lorem.words(5),
    permission: faker.lorem.words(5),
    createdAt: new Date(),
    updatedAt: undefined,
  };
}
export function fakeTeam() {
  return {
    name: faker.person.fullName(),
    createdAt: faker.date.anytime(),
    updatedAt: undefined,
  };
}
export function fakeTeamComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    organizationId: faker.string.uuid(),
    createdAt: faker.date.anytime(),
    updatedAt: undefined,
  };
}
export function fakeTeamMember() {
  return {
    createdAt: undefined,
  };
}
export function fakeTeamMemberComplete() {
  return {
    id: faker.string.uuid(),
    teamId: faker.string.uuid(),
    userId: faker.string.uuid(),
    createdAt: undefined,
  };
}
export function fakeOrganization() {
  return {
    name: faker.person.fullName(),
    slug: undefined,
    logo: undefined,
    createdAt: faker.date.anytime(),
    metadata: undefined,
  };
}
export function fakeOrganizationComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    slug: undefined,
    logo: undefined,
    createdAt: faker.date.anytime(),
    metadata: undefined,
  };
}
export function fakeMember() {
  return {
    role: faker.lorem.words(5),
    createdAt: faker.date.anytime(),
  };
}
export function fakeMemberComplete() {
  return {
    id: faker.string.uuid(),
    organizationId: faker.string.uuid(),
    userId: faker.string.uuid(),
    role: faker.lorem.words(5),
    createdAt: faker.date.anytime(),
  };
}
export function fakeInvitation() {
  return {
    email: faker.internet.email(),
    role: undefined,
    teamId: undefined,
    status: faker.lorem.words(5),
    expiresAt: faker.date.anytime(),
  };
}
export function fakeInvitationComplete() {
  return {
    id: faker.string.uuid(),
    organizationId: faker.string.uuid(),
    email: faker.internet.email(),
    role: undefined,
    teamId: undefined,
    status: faker.lorem.words(5),
    expiresAt: faker.date.anytime(),
    inviterId: faker.string.uuid(),
  };
}
