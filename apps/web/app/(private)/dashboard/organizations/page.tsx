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
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@packages/ui/components/table";
// import {
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
import { Building2Icon, CalendarIcon, ExternalLinkIcon, SettingsIcon } from "lucide-react";
// import { useRouter } from "next/navigation";
import { CreateOrganizationDialog } from "@/components/create-organization-dialog";
import { useGetOrgListRenforced } from "@/hooks/use-get-org-list";
import { OrganizationCard } from "./org-card";
import { OrganizationStadisticBanner } from "./org-stadistic-card";
// import { columns } from "./columns";

export default function Page() {
  const { data: organizationList } = useGetOrgListRenforced();

  return (
    <div>
      <header className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-foreground mb-2'>Organizaciones</h1>
          <p className='text-muted-foreground'>
            Gestiona y accede a todas tus organizaciones desde un solo lugar
          </p>
        </div>

        <CreateOrganizationDialog>
          <Button variant='outline' className='capitalize select-none'>
            <Building2Icon className='size-4' />
            create organization
          </Button>
        </CreateOrganizationDialog>
      </header>
      <OrganizationStadisticBanner />
      {/* Organizations Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {organizationList?.data
          ?.sort((a, b) => a.name.localeCompare(b.name))
          .map((organization) => (
            <OrganizationCard {...organization} key={organization.id} />
          ))}
      </div>

      {/* Empty State */}
      {/* {organizationList?.length === 0 && (
        <Card className='bg-card border-border'>
          <CardContent className='p-12 text-center'>
            <Building2Icon className='w-16 h-16 text-muted-foreground mx-auto mb-4' />
            <h3 className='text-lg font-semibold text-foreground mb-2'>No hay organizaciones</h3>
            <p className='text-muted-foreground mb-6'>
              Comienza creando tu primera organización para gestionar equipos y proyectos.
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className='bg-primary hover:bg-primary/90'>
                  <Building2 className='w-4 h-4 mr-2' />
                  Crear Primera Organización
                </Button>
              </DialogTrigger>
            </Dialog>
          </CardContent>
        </Card>
      )} */}
    </div>
  );
}

// const router = useRouter();
// const table = useReactTable({
//   data: organizationList ?? [],
//   columns,
//   getCoreRowModel: getCoreRowModel(),
//   getPaginationRowModel: getPaginationRowModel(),
// });

// <Card>
//   <CardHeader>
//     <CardTitle className='text-2xl capitalize '>organization list</CardTitle>
//     <CardDescription>description</CardDescription>
//     <CardAction className='space-x-2'>
//       <CreateOrganizationDialog>
//         <Button variant='outline' className='capitalize select-none'>
//           create organization
//         </Button>
//       </CreateOrganizationDialog>
//     </CardAction>
//   </CardHeader>
//   <CardContent>
//     <div className='overflow-hidden rounded-md border'>
//       <Table>
//         <TableHeader className='bg-muted '>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 return (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(header.column.columnDef.header, header.getContext())}
//                   </TableHead>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableHeader>
//         <TableBody>
//           {table.getRowModel().rows?.length ? (
//             table.getRowModel().rows.map((row) => (
//               <TableRow
//                 className='hover:cursor-pointer'
//                 key={row.id}
//                 data-state={row.getIsSelected() && "selected"}
//                 onClick={() => router.push(`/dashboard/organizations/${row.getValue("id")}`)}
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell key={cell.id}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={columns.length} className='h-24 text-center'>
//                 No results.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   </CardContent>
//   <CardFooter className='space-x-2 justify-end-safe'>
//     <div className='text-muted-foreground flex-1 text-sm'>
//       {table.getFilteredSelectedRowModel().rows.length} of{" "}
//       {table.getFilteredRowModel().rows.length} row(s) selected.
//     </div>
//     <CardAction>
//       <Button variant='default'>Sign Up</Button>
//     </CardAction>
//     <CardAction>
//       <Button variant='default'>Sign Up</Button>
//     </CardAction>
//   </CardFooter>
// </Card>
