"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@packages/ui/components/avatar";
import { Badge } from "@packages/ui/components/badge";
import { Button } from "@packages/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@packages/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@packages/ui/components/dropdown-menu";
import { Input } from "@packages/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@packages/ui/components/select";
import {
  Briefcase,
  Building2,
  Calendar,
  Filter,
  Mail,
  MapPin,
  MoreVertical,
  Search,
  Shield,
  UserCheck,
  Users,
  UsersIcon,
  UserX,
} from "lucide-react";
import { useState } from "react";

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    email: "john.doe@example.com",
    name: "John Doe",
    image: "/professional-headshot.png",
    createdAt: new Date("2024-01-15"),
    lastActive: new Date("2025-01-10"),
    status: "active",
    metadata: {
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      department: "Engineering",
      title: "Senior Software Engineer",
    },
    organizations: [
      { id: "1", name: "Acme Corp", role: "admin" },
      { id: "2", name: "TechStart Inc", role: "member" },
    ],
    teams: [
      { id: "1", name: "Frontend Team", organizationName: "Acme Corp", role: "lead" },
      { id: "2", name: "Mobile Team", organizationName: "Acme Corp", role: "member" },
    ],
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    image: "/professional-woman-headshot.png",
    createdAt: new Date("2024-02-20"),
    lastActive: new Date("2025-01-11"),
    status: "active",
    metadata: {
      phone: "+1 (555) 234-5678",
      location: "New York, NY",
      department: "Product",
      title: "Product Manager",
    },
    organizations: [{ id: "1", name: "Acme Corp", role: "owner" }],
    teams: [{ id: "3", name: "Product Team", organizationName: "Acme Corp", role: "lead" }],
  },
  {
    id: "3",
    email: "mike.johnson@example.com",
    name: "Mike Johnson",
    createdAt: new Date("2024-03-10"),
    lastActive: new Date("2024-12-15"),
    status: "inactive",
    metadata: {
      location: "Austin, TX",
      department: "Design",
      title: "UX Designer",
    },
    organizations: [{ id: "2", name: "TechStart Inc", role: "member" }],
    teams: [{ id: "4", name: "Design Team", organizationName: "TechStart Inc", role: "member" }],
  },
  {
    id: "4",
    email: "sarah.williams@example.com",
    name: "Sarah Williams",
    createdAt: new Date("2024-04-05"),
    lastActive: new Date("2025-01-09"),
    status: "active",
    metadata: {
      location: "Seattle, WA",
      department: "Marketing",
      title: "Marketing Director",
    },
    organizations: [
      { id: "1", name: "Acme Corp", role: "admin" },
      { id: "3", name: "Global Solutions", role: "owner" },
    ],
    teams: [
      { id: "5", name: "Marketing Team", organizationName: "Acme Corp", role: "lead" },
      { id: "6", name: "Growth Team", organizationName: "Global Solutions", role: "lead" },
    ],
  },
  {
    id: "5",
    email: "david.brown@example.com",
    name: "David Brown",
    createdAt: new Date("2024-05-12"),
    lastActive: new Date("2024-11-20"),
    status: "suspended",
    metadata: {
      location: "Boston, MA",
      department: "Sales",
      title: "Sales Representative",
    },
    organizations: [{ id: "2", name: "TechStart Inc", role: "member" }],
    teams: [],
  },
];

const statusColors = {
  active: "bg-green-500/10 text-green-500 border-green-500/20",
  inactive: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  suspended: "bg-red-500/10 text-red-500 border-red-500/20",
};

const roleColors = {
  owner: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  admin: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  member: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  lead: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  contributor: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
};

export default function UsersDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole =
      roleFilter === "all" ||
      user.organizations.some((org) => org.role === roleFilter) ||
      user.teams.some((team) => team.role === roleFilter);
    return matchesSearch && matchesStatus && matchesRole;
  });

  const stats = {
    total: mockUsers.length,
    active: mockUsers.filter((u) => u.status === "active").length,
    inactive: mockUsers.filter((u) => u.status === "inactive").length,
    suspended: mockUsers.filter((u) => u.status === "suspended").length,
    admins: mockUsers.filter((u) =>
      u.organizations.some((org) => org.role === "admin" || org.role === "owner"),
    ).length,
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground mb-2'>Usuarios</h1>
          <p className='text-muted-foreground'>Gestiona todos los usuarios del sistema</p>
        </div>
        <Button className='bg-primary hover:bg-primary/90'>
          <Users className='w-4 h-4 mr-2' />
          Invitar Usuario
        </Button>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-5'>
        <Card className='border-border bg-card/50 backdrop-blur'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Total Usuarios
            </CardTitle>
            <Users className='h-4 w-4 text-blue-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-foreground'>{stats.total}</div>
            <p className='text-xs text-muted-foreground mt-1'>Todos los usuarios registrados</p>
          </CardContent>
        </Card>

        <Card className='border-border bg-gradient-to-br from-green-500/5 to-emerald-500/5 backdrop-blur'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Activos</CardTitle>
            <UserCheck className='h-4 w-4 text-green-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-foreground'>{stats.active}</div>
            <p className='text-xs text-muted-foreground mt-1'>Usuarios activos</p>
          </CardContent>
        </Card>

        <Card className='border-border bg-gradient-to-br from-yellow-500/5 to-orange-500/5 backdrop-blur'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Inactivos</CardTitle>
            <UserX className='h-4 w-4 text-yellow-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-foreground'>{stats.inactive}</div>
            <p className='text-xs text-muted-foreground mt-1'>Sin actividad reciente</p>
          </CardContent>
        </Card>

        <Card className='border-border bg-gradient-to-br from-red-500/5 to-pink-500/5 backdrop-blur'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Suspendidos</CardTitle>
            <UserX className='h-4 w-4 text-red-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-foreground'>{stats.suspended}</div>
            <p className='text-xs text-muted-foreground mt-1'>Cuentas suspendidas</p>
          </CardContent>
        </Card>

        <Card className='border-border bg-gradient-to-br from-purple-500/5 to-blue-500/5 backdrop-blur'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Administradores
            </CardTitle>
            <Shield className='h-4 w-4 text-purple-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-foreground'>{stats.admins}</div>
            <p className='text-xs text-muted-foreground mt-1'>Con permisos elevados</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className='border-border bg-card/50 backdrop-blur'>
        <CardHeader>
          <CardTitle className='text-lg flex items-center gap-2'>
            <Filter className='w-5 h-5 text-primary' />
            Filtros y Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-4 md:flex-row'>
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <Input
                placeholder='Buscar por nombre o email...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10'
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-full md:w-[180px]'>
                <SelectValue placeholder='Estado' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Todos los estados</SelectItem>
                <SelectItem value='active'>Activos</SelectItem>
                <SelectItem value='inactive'>Inactivos</SelectItem>
                <SelectItem value='suspended'>Suspendidos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className='w-full md:w-[180px]'>
                <SelectValue placeholder='Rol' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Todos los roles</SelectItem>
                <SelectItem value='owner'>Owner</SelectItem>
                <SelectItem value='admin'>Admin</SelectItem>
                <SelectItem value='member'>Member</SelectItem>
                <SelectItem value='lead'>Lead</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card className='border-border bg-card/50 backdrop-blur'>
        <CardHeader>
          <CardTitle className='text-lg'>Usuarios ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Lista completa de usuarios con su información y permisos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {filteredUsers.map((user) => (
              <Card
                key={user.id}
                className='border-border bg-card hover:bg-accent/5 transition-colors'
              >
                <CardContent className='p-6'>
                  <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
                    {/* User Info */}
                    <div className='flex items-start gap-4 flex-1'>
                      <Avatar className='w-12 h-12 border-2 border-border'>
                        <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 text-white'>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h3 className='font-semibold text-foreground'>{user.name}</h3>
                          <Badge className={statusColors[user.status]}>{user.status}</Badge>
                        </div>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground mb-2'>
                          <Mail className='w-3 h-3' />
                          {user.email}
                        </div>
                        <div className='flex flex-wrap gap-3 text-xs text-muted-foreground'>
                          {user.metadata?.title && (
                            <div className='flex items-center gap-1'>
                              <Briefcase className='w-3 h-3' />
                              {user.metadata.title}
                            </div>
                          )}
                          {user.metadata?.location && (
                            <div className='flex items-center gap-1'>
                              <MapPin className='w-3 h-3' />
                              {user.metadata.location}
                            </div>
                          )}
                          <div className='flex items-center gap-1'>
                            <Calendar className='w-3 h-3' />
                            Desde {user.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Organizations & Teams */}
                    <div className='flex flex-col gap-3 lg:w-80'>
                      <div>
                        <div className='flex items-center gap-2 text-xs text-muted-foreground mb-2'>
                          <Building2 className='w-3 h-3' />
                          Organizaciones ({user.organizations.length})
                        </div>
                        <div className='flex flex-wrap gap-2'>
                          {user.organizations.map((org) => (
                            <Badge key={org.id} variant='outline' className={roleColors[org.role]}>
                              {org.name} · {org.role}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className='flex items-center gap-2 text-xs text-muted-foreground mb-2'>
                          <UsersIcon className='w-3 h-3' />
                          Teams ({user.teams.length})
                        </div>
                        <div className='flex flex-wrap gap-2'>
                          {user.teams.slice(0, 2).map((team) => (
                            <Badge
                              key={team.id}
                              variant='outline'
                              className={roleColors[team.role]}
                            >
                              {team.name}
                            </Badge>
                          ))}
                          {user.teams.length > 2 && (
                            <Badge variant='outline' className='text-muted-foreground'>
                              +{user.teams.length - 2} más
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon'>
                          <MoreVertical className='w-4 h-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                        <DropdownMenuItem>Editar Usuario</DropdownMenuItem>
                        <DropdownMenuItem>Ver Actividad</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "active" ? (
                          <DropdownMenuItem className='text-yellow-500'>
                            Desactivar
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className='text-green-500'>Activar</DropdownMenuItem>
                        )}
                        <DropdownMenuItem className='text-red-500'>Suspender</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
