"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@packages/ui/components/avatar";
import { Badge } from "@packages/ui/components/badge";
import { Button } from "@packages/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@packages/ui/components/card";
import { Input } from "@packages/ui/components/input";
import { Label } from "@packages/ui/components/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@packages/ui/components/table";
import { flexRender, useReactTable } from "@tanstack/react-table";
import { getCoreRowModel, getPaginationRowModel } from "@tanstack/table-core";
import {
  AlertCircleIcon,
  ArrowRightIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  CrownIcon,
  MailIcon,
  MapPinIcon,
  SettingsIcon,
  ShieldIcon,
  StarIcon,
  UserIcon,
  UsersIcon,
  UsersRoundIcon,
  XCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import router from "next/router";
import useSWR from "swr";
import { CreateOrganizationDialog } from "@/components/create-organization-dialog";
import { useGetOrgRenforced } from "@/hooks/use-get-org";
import { authClient } from "@/utils/auth-client";
import { columns as columnsMember } from "./columns";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  logo?: string | null;
  metadata?: any;
  Member: Member[];
  Invitation: Invitation[];
}

export interface Member {
  id: string;
  organizationId: string;
  role: "member" | "owner" | "admin";
  createdAt: Date;
  userId: string;
  user: {
    email: string;
    name: string;
    image?: string;
  };
}

export interface Invitation {
  id: string;
  organizationId: string;
  email: string;
  role: "member" | "owner" | "admin";
  status: InvitationStatus;
  inviterId: string;
  expiresAt: Date;
}

export enum InvitationStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
  EXPIRED = "expired",
}

export default function Page() {
  const params = useParams<{ id: string }>();
  const { data: organization } = useGetOrgRenforced(params.id);

  // const tableMembers = useReactTable({
  //   data: organization?.members ?? [],
  //   columns: columnsMember,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  // });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <CrownIcon className='h-4 w-4 text-warning' />;
      case "admin":
        return <ShieldIcon className='h-4 w-4 text-primary' />;
      default:
        return <UserIcon className='h-4 w-4 text-muted-foreground' />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "owner":
        return "default";
      case "admin":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case InvitationStatus.PENDING:
        return <ClockIcon className='h-4 w-4 text-warning' />;
      case InvitationStatus.ACCEPTED:
        return <CheckCircleIcon className='h-4 w-4 text-success' />;
      case InvitationStatus.DECLINED:
        return <XCircleIcon className='h-4 w-4 text-destructive' />;
      case InvitationStatus.EXPIRED:
        return <AlertCircleIcon className='h-4 w-4 text-muted-foreground' />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case InvitationStatus.PENDING:
        return "default";
      case InvitationStatus.ACCEPTED:
        return "secondary";
      case InvitationStatus.DECLINED:
        return "destructive";
      case InvitationStatus.EXPIRED:
        return "outline";
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <div className='border-b border-border bg-card'>
        <div className='container mx-auto px-6 py-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              {organization?.logo ? (
                <Avatar className='h-16 w-16'>
                  <AvatarImage
                    src={organization.logo || "/placeholder.svg"}
                    alt={organization.name}
                  />
                  <AvatarFallback className='text-xl font-bold'>
                    {organization.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className='h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center'>
                  <span className='text-2xl font-bold text-primary'>
                    {organization?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <h1 className='text-3xl font-bold text-balance'>{organization?.name}</h1>
                <p className='text-muted-foreground'>@{organization?.slug}</p>
                <p className='text-sm text-muted-foreground'>
                  Created {new Date(`${organization?.createdAt}`).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Button variant='outline' size='sm'>
              <SettingsIcon className='size-4 mr-2' />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}

      <div className='container mx-auto px-6 py-8'>
        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Members</CardTitle>
              <UsersIcon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-primary'>{1}</div>
              <p className='text-xs text-muted-foreground'>Active organization members</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Pending Invitations</CardTitle>
              <MailIcon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-warning'>{1}</div>
              <p className='text-xs text-muted-foreground'>Awaiting response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Teams</CardTitle>
              <UsersRoundIcon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-chart-3'>{1}</div>
              <p className='text-xs text-muted-foreground'>{1} team members</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Owners</CardTitle>
              <CrownIcon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-success'>{1}</div>
              <p className='text-xs text-muted-foreground'>Organization owners</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Administrators</CardTitle>
              <ShieldIcon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-chart-2'>{1}</div>
              <p className='text-xs text-muted-foreground'>Admin privileges</p>
            </CardContent>
          </Card>
        </div>

        <Card className='mb-8'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle className='flex items-center gap-2'>
                  <UsersRoundIcon className='h-5 w-5' />
                  Teams
                </CardTitle>
                <CardDescription>Teams within your organization</CardDescription>
              </div>
              <div className='mt-4 text-center'>
                <Link href={`/organizations/6/teams`}>
                  <Button variant='ghost' size='sm'>
                    View {6} more teams
                    <ArrowRightIcon className='h-4 w-4 ml-2' />
                  </Button>
                </Link>
              </div>
              <Link className='hidden' href={`/organizations/teams`}>
                <Button>
                  View All Teams
                  <ArrowRightIcon className='h-4 w-4 ml-2' />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {organization ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {[
                  {
                    id: 1,
                    slug: "slug",
                    name: "name",
                    description: "description",
                    metadata: { department: "department", location: "location" },
                  },
                  {
                    id: 2,
                    slug: "slug",
                    name: "name",
                    description: "description",
                    metadata: { department: "department", location: "location" },
                  },
                  {
                    id: 3,
                    slug: "slug",
                    name: "name",
                    description: "description",
                    metadata: { department: "department", location: "location" },
                  },
                ].map((team) => {
                  return (
                    <Link key={team.id} href={`/dashboard/organizations`}>
                      <div className='group relative p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-all duration-200 hover:shadow-lg hover:border-primary/50 cursor-pointer h-full'>
                        <div className='flex items-start justify-between mb-3'>
                          <div className='flex items-center gap-2'>
                            <div className='h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-chart-3/20 flex items-center justify-center'>
                              <UsersRoundIcon className='h-5 w-5 text-primary' />
                            </div>
                            <div>
                              <h3 className='font-semibold text-sm group-hover:text-primary transition-colors'>
                                {team.name}
                              </h3>
                              <p className='text-xs text-muted-foreground'>@{team.slug}</p>
                            </div>
                          </div>
                        </div>

                        {team.description && (
                          <p className='text-sm text-muted-foreground mb-3 line-clamp-2'>
                            {team.description}
                          </p>
                        )}

                        <div className='flex items-center gap-4 text-xs text-muted-foreground mb-3'>
                          <div className='flex items-center gap-1'>
                            <UsersIcon className='h-3 w-3' />
                            <span>{1} members</span>
                          </div>
                          {1 > 0 && (
                            <div className='flex items-center gap-1'>
                              <StarIcon className='h-3 w-3 text-warning' />
                              <span>{1} leads</span>
                            </div>
                          )}
                        </div>

                        {team.metadata && (
                          <div className='flex flex-wrap gap-2'>
                            {team.metadata.department && (
                              <Badge variant='outline' className='text-xs'>
                                <BriefcaseIcon className='h-3 w-3 mr-1' />
                                {team.metadata.department}
                              </Badge>
                            )}
                            {team.metadata.location && (
                              <Badge variant='outline' className='text-xs'>
                                <MapPinIcon className='h-3 w-3 mr-1' />
                                {team.metadata.location}
                              </Badge>
                            )}
                          </div>
                        )}

                        <div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                          <ArrowRightIcon className='h-4 w-4 text-primary' />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className='text-center py-8'>
                <UsersRoundIcon className='h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50' />
                <p className='text-sm text-muted-foreground mb-4'>
                  No teams yet. Create your first team to organize your members.
                </p>
                <Link href={`/organizations/${6}/teams`}>
                  <Button variant='outline'>
                    <UsersRoundIcon className='h-4 w-4 mr-2' />
                    Create Team
                  </Button>
                </Link>
              </div>

              // <div className='text-center py-8'>
              //   <UsersRoundIcon className='h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50' />
              //   <p className='text-sm text-muted-foreground mb-4'>
              //     No teams yet. Create your first team to organize your members.
              //   </p>
              //   <Link href={`/organizations/${organization.slug}/teams`}>
              //     <Button variant='outline'>
              //       <UsersRoundIcon className='h-4 w-4 mr-2' />
              //       Create Team
              //     </Button>
              //   </Link>
              // </div>
            )}

            {/* {organization.Team && organization.Team.length > 6 && (
              <div className="mt-4 text-center">
                <Link href={`/organizations/${organization.slug}/teams`}>
                  <Button variant="ghost" size="sm">
                    View {organization.Team.length - 6} more teams
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )} */}
          </CardContent>
        </Card>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Members Section */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <UsersIcon className='h-5 w-5' />
                Organization Members
              </CardTitle>
              <CardDescription>Manage your organization members and their roles</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {organization?.members?.map((member) => (
                <div
                  key={member.id}
                  className='flex items-center justify-between px-4 py-2 rounded-lg border border-border bg-muted/30'
                >
                  <div className='flex items-center gap-3'>
                    <Avatar>
                      <AvatarImage
                        src={member?.user?.image || "https://ui.shadcn.com/avatars/03.png"}
                        alt={member.userId}
                      />
                      <AvatarFallback>{member?.user?.name} </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='font-medium'>{member.user.name}</p>
                      <p className='text-sm text-muted-foreground'>{member.user.email}</p>
                      <p className='text-xs text-muted-foreground'>
                        Joined {new Date(member.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    {getRoleIcon(member.role)}
                    <Badge variant={getRoleBadgeVariant(member.role)}>{member.role}</Badge>
                  </div>
                </div>
              ))}
              {organization?.members?.length === 0 && (
                <div className='text-center py-8 text-muted-foreground'>No members found</div>
              )}
            </CardContent>
          </Card>

          {/* Invitations Section */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <MailIcon className='h-5 w-5' />
                Pending Invitations
              </CardTitle>
              <CardDescription>Track and manage organization invitations</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {organization?.invitations?.map((invitation) => (
                <div
                  key={invitation.id}
                  className='flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30'
                >
                  <div className='flex items-center gap-3'>
                    <div className='h-10 w-10 rounded-full bg-muted flex items-center justify-center'>
                      <MailIcon className='h-4 w-4 text-muted-foreground' />
                    </div>
                    <div>
                      <p className='font-medium'>{invitation.email}</p>
                      <p className='text-sm text-muted-foreground'>
                        Invited for {invitation.role} role
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        Expires {new Date(invitation.expiresAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    {getStatusIcon(invitation.status)}
                    <Badge variant={getStatusBadgeVariant(invitation.status)}>
                      {invitation.status}
                    </Badge>
                  </div>
                </div>
              ))}
              {organization?.invitations?.length === 0 && (
                <div className='text-center py-8 text-muted-foreground'>No pending invitations</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Organization Metadata */}
        {organization?.metadata && (
          <Card className='mt-8'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <SettingsIcon className='h-5 w-5' />
                Organization Metadata
              </CardTitle>
              <CardDescription>Additional organization information and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className='bg-muted p-4 rounded-lg text-sm overflow-auto'>
                {JSON.stringify(organization.metadata, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// <div className='space-y-4'>
//   {/* <div>{JSON.stringify(organization)}</div> */}
//   <div>invitations: {JSON.stringify(organization?.invitations)}</div>

//   <Card>
//     <CardHeader>
//       <CardDescription className='capitalize'>member list</CardDescription>
//       <CardTitle className='text-2xl capitalize '>{organization?.name}</CardTitle>
//       <CardAction className='space-x-2 flex'>
//         <Label>
//           search member
//           <Input />
//         </Label>
//         <Button variant='default' className='capitalize select-none'>
//           invite
//         </Button>
//         <CreateOrganizationDialog>
//           <Button variant='outline' className='capitalize select-none'>
//             add member
//           </Button>
//         </CreateOrganizationDialog>
//       </CardAction>
//     </CardHeader>
//     <CardContent>
//       <div className='overflow-hidden rounded-md border'>
//         <Table>
//           <TableHeader className='bg-muted '>
//             {tableMembers.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(header.column.columnDef.header, header.getContext())}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {tableMembers.getRowModel().rows?.length ? (
//               tableMembers.getRowModel().rows.map((row) => (
//                 <TableRow
//                   className='hover:cursor-pointer'
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                   onClick={() => router.push(`/dashboard/organizations/${row.getValue("id")}`)}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columnsMember.length} className='h-24 text-center'>
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </CardContent>
//     <CardFooter className='space-x-2 justify-end-safe'>
//       <div className='text-muted-foreground flex-1 text-sm'>
//         {tableMembers.getFilteredSelectedRowModel().rows.length} of{" "}
//         {tableMembers.getFilteredRowModel().rows.length} row(s) selected.
//       </div>
//       <CardAction>
//         <Button variant='default'>Sign Up</Button>
//       </CardAction>
//       <CardAction>
//         <Button variant='default'>Sign Up</Button>
//       </CardAction>
//     </CardFooter>
//   </Card>

//   <Card>
//     {/* <CardHeader>
//       <CardDescription className='capitalize'>member list</CardDescription>
//       <CardTitle className='text-2xl capitalize '>{organization?.name}</CardTitle>
//       <CardAction className='space-x-2 flex'>
//         <Label>
//           search member
//           <Input />
//         </Label>
//         <CreateOrganizationDialog>
//           <Button variant='outline' className='capitalize select-none'>
//             add member
//           </Button>
//         </CreateOrganizationDialog>
//       </CardAction>
//     </CardHeader> */}
//     <CardContent>
//       <div className='overflow-hidden rounded-md border'>
//         <Table>
//           <TableHeader className='bg-muted '>
//             {tableMembers.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(header.column.columnDef.header, header.getContext())}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {tableMembers.getRowModel().rows?.length ? (
//               tableMembers.getRowModel().rows.map((row) => (
//                 <TableRow
//                   className='hover:cursor-pointer'
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                   onClick={() => router.push(`/dashboard/organizations/${row.getValue("id")}`)}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columnsMember.length} className='h-24 text-center'>
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </CardContent>
//     <CardFooter className='space-x-2 justify-end-safe'>
//       <div className='text-muted-foreground flex-1 text-sm'>
//         {tableMembers.getFilteredSelectedRowModel().rows.length} of{" "}
//         {tableMembers.getFilteredRowModel().rows.length} row(s) selected.
//       </div>
//       <CardAction>
//         <Button variant='default'>Sign Up</Button>
//       </CardAction>
//       <CardAction>
//         <Button variant='default'>Sign Up</Button>
//       </CardAction>
//     </CardFooter>
//   </Card>
// </div>
