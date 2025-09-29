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
import { SettingsIcon } from "lucide-react";
import { useParams } from "next/navigation";
import router from "next/router";
import useSWR from "swr";
import { CreateOrganizationDialog } from "@/components/create-organization-dialog";
import { authClient } from "@/utils/auth-client";
import { columns as columnsMember } from "./columns";

export default function Page() {
  const params = useParams();
  const { data: organization } = useSWR(
    ["/organization/get-full-organization", params.id],
    orgFullFetcher,
  );

  const tableMembers = useReactTable({
    data: organization?.members ?? [],
    columns: columnsMember,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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
              {organization.logo ? (
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
                    {organization.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <h1 className='text-3xl font-bold text-balance'>{organization.name}</h1>
                <p className='text-muted-foreground'>@{organization.slug}</p>
                <p className='text-sm text-muted-foreground'>
                  Created {new Date(organization.createdAt).toLocaleDateString()}
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
