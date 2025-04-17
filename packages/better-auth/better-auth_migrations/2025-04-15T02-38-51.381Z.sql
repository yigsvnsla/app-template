alter table "member" add column "teamId" text;

alter table "invitation" add column "teamId" text;

create table "team" ("id" text not null primary key, "name" text not null, "organizationId" text not null references "organization" ("id"), "createdAt" date not null, "updatedAt" date);