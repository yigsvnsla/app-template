"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@packages/ui/components/avatar";
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
import { CrownIcon, MailIcon, SettingsIcon, ShieldIcon, UsersIcon } from "lucide-react";
import { useParams } from "next/navigation";
import router from "next/router";
import useSWR from "swr";
import { CreateOrganizationDialog } from "@/components/create-organization-dialog";
import { authClient } from "@/utils/auth-client";
import { columns as columnsMember } from "./columns";
import { useGetOrgRenforced } from "@/hooks/use-get-org";

export default function Page() {
  const params = useParams<{id:string}>();
  const { data: organization } = useGetOrgRenforced(params.id)

  

  // const tableMembers = useReactTable({
  //   data: organization?.members ?? [],
  //   columns: columnsMember,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  // });

  async function orgFullFetcher([_, orgId]: string[]) {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1500 + 500));
    return authClient.organization.getFullOrganization({
      query: {
        organizationId: orgId,
      },
    });
  }



  

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
                    {organization?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <h1 className='text-3xl font-bold text-balance'>{organization?.name}</h1>
                <p className='text-muted-foreground'>@{organization?.slug}</p>
                <p className='text-sm text-muted-foreground'>
                  Created {new Date(organization?.createdAt).toLocaleDateString()}
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

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{1}</div>
              <p className="text-xs text-muted-foreground">Active organization members</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Invitations</CardTitle>
              <MailIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{1}</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Owners</CardTitle>
              <CrownIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{1}</div>
              <p className="text-xs text-muted-foreground">Organization owners</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Administrators</CardTitle>
              <ShieldIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-2">{1}</div>
              <p className="text-xs text-muted-foreground">Admin privileges</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Members Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5" />
                Organization Members
              </CardTitle>
              <CardDescription>Manage your organization members and their roles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {organization..map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.user.image || "/placeholder.svg"} alt={member.user.name} />
                      <AvatarFallback>
                        {member.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.user.name}</p>
                      <p className="text-sm text-muted-foreground">{member.user.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Joined {new Date(member.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getRoleIcon(member.role)}
                    <Badge variant={getRoleBadgeVariant(member.role)}>{member.role}</Badge>
                  </div>
                </div>
              ))}
              {organization.Member.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No members found</div>
              )}
            </CardContent>
          </Card>

          {/* Invitations Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MailIcon className="h-5 w-5" />
                Pending Invitations
              </CardTitle>
              <CardDescription>Track and manage organization invitations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {organization.Invitation.map((invitation) => (
                <div
                  key={invitation.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <MailIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{invitation.email}</p>
                      <p className="text-sm text-muted-foreground">Invited for {invitation.role} role</p>
                      <p className="text-xs text-muted-foreground">
                        Expires {new Date(invitation.expiresAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(invitation.status)}
                    <Badge variant={getStatusBadgeVariant(invitation.status)}>{invitation.status}</Badge>
                  </div>
                </div>
              ))}
              {organization.Invitation.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No pending invitations</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Organization Metadata */}
        {organization.metadata && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Organization Metadata
              </CardTitle>
              <CardDescription>Additional organization information and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">
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
