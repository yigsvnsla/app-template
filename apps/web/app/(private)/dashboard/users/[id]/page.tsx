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
import { Separator } from "@packages/ui/components/separator";
import {
  Activity,
  ArrowLeft,
  Ban,
  Briefcase,
  Building2,
  Calendar,
  Clock,
  Edit,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  Shield,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data - En producción esto vendría de una API
const mockUsers = [
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
      { id: "3", name: "Backend Team", organizationName: "TechStart Inc", role: "contributor" },
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

interface UserDetailDashboardProps {
  userId: string;
}

export default function UserDetailDashboard({ userId }: UserDetailDashboardProps) {
  // const user = mockUsers.find((u) => u.id === userId);

  // if (!user) {
  //   notFound();
  // }

  const daysSinceJoined = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const daysSinceActive = "user.lastActive"
    ? Math.floor((Date.now() - 0) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className='space-y-6'>
      {/* Header with Back Button */}
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon' asChild>
          <Link href='/users'>
            <ArrowLeft className='w-4 h-4' />
          </Link>
        </Button>
        <div className='flex-1'>
          <h1 className='text-3xl font-bold text-foreground mb-2'>Perfil de Usuario</h1>
          <p className='text-muted-foreground'>Información detallada y gestión del usuario</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              <MoreVertical className='w-4 h-4 mr-2' />
              Acciones
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Acciones de Usuario</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Edit className='w-4 h-4 mr-2' />
              Editar Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Activity className='w-4 h-4 mr-2' />
              Ver Actividad
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {"active" === "active" ? (
              <DropdownMenuItem className='text-yellow-500'>
                <UserX className='w-4 h-4 mr-2' />
                Desactivar Usuario
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem className='text-green-500'>
                <UserCheck className='w-4 h-4 mr-2' />
                Activar Usuario
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className='text-red-500'>
              <Ban className='w-4 h-4 mr-2' />
              Suspender Usuario
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* User Profile Card */}
      <Card className='border-border bg-gradient-to-br from-card/95 to-card/80 backdrop-blur'>
        <CardContent className='p-6'>
          <div className='flex flex-col md:flex-row gap-6'>
            {/* Avatar and Basic Info */}
            <div className='flex flex-col items-center md:items-start gap-4'>
              <Avatar className='w-32 h-32 border-4 border-border shadow-lg'>
                <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl'>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Badge className={`${statusColors[user.status]} text-sm px-3 py-1`}>
                {user.status.toUpperCase()}
              </Badge>
            </div>

            {/* Detailed Info */}
            <div className='flex-1 space-y-4'>
              <div>
                <h2 className='text-2xl font-bold text-foreground mb-1'>{user.name}</h2>
                {user.metadata?.title && (
                  <p className='text-lg text-muted-foreground flex items-center gap-2'>
                    <Briefcase className='w-4 h-4' />
                    {user.metadata.title}
                  </p>
                )}
              </div>

              <Separator />

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex items-center gap-3 text-muted-foreground'>
                  <Mail className='w-5 h-5 text-blue-500' />
                  <div>
                    <p className='text-xs text-muted-foreground'>Email</p>
                    <p className='text-sm text-foreground'>{user.email}</p>
                  </div>
                </div>

                {user.metadata?.phone && (
                  <div className='flex items-center gap-3 text-muted-foreground'>
                    <Phone className='w-5 h-5 text-green-500' />
                    <div>
                      <p className='text-xs text-muted-foreground'>Teléfono</p>
                      <p className='text-sm text-foreground'>{user.metadata.phone}</p>
                    </div>
                  </div>
                )}

                {user.metadata?.location && (
                  <div className='flex items-center gap-3 text-muted-foreground'>
                    <MapPin className='w-5 h-5 text-red-500' />
                    <div>
                      <p className='text-xs text-muted-foreground'>Ubicación</p>
                      <p className='text-sm text-foreground'>{user.metadata.location}</p>
                    </div>
                  </div>
                )}

                {user.metadata?.department && (
                  <div className='flex items-center gap-3 text-muted-foreground'>
                    <Building2 className='w-5 h-5 text-purple-500' />
                    <div>
                      <p className='text-xs text-muted-foreground'>Departamento</p>
                      <p className='text-sm text-foreground'>{user.metadata.department}</p>
                    </div>
                  </div>
                )}

                <div className='flex items-center gap-3 text-muted-foreground'>
                  <Calendar className='w-5 h-5 text-orange-500' />
                  <div>
                    <p className='text-xs text-muted-foreground'>Miembro desde</p>
                    <p className='text-sm text-foreground'>
                      {user.createdAt.toLocaleDateString()} ({daysSinceJoined} días)
                    </p>
                  </div>
                </div>

                {user.lastActive && (
                  <div className='flex items-center gap-3 text-muted-foreground'>
                    <Clock className='w-5 h-5 text-cyan-500' />
                    <div>
                      <p className='text-xs text-muted-foreground'>Última actividad</p>
                      <p className='text-sm text-foreground'>
                        {user.lastActive.toLocaleDateString()} ({daysSinceActive} días)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-3'>
        <Card className='border-border bg-gradient-to-br from-blue-500/5 to-indigo-500/5 backdrop-blur'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Organizaciones
            </CardTitle>
            <Building2 className='h-5 w-5 text-blue-500' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold text-foreground'>{user.organizations.length}</div>
            <p className='text-xs text-muted-foreground mt-1'>
              {user.organizations.filter((o) => o.role === "owner" || o.role === "admin").length}{" "}
              con permisos elevados
            </p>
          </CardContent>
        </Card>

        <Card className='border-border bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>Teams</CardTitle>
            <Users className='h-5 w-5 text-purple-500' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold text-foreground'>{user.teams.length}</div>
            <p className='text-xs text-muted-foreground mt-1'>
              {user.teams.filter((t) => t.role === "lead").length} como líder
            </p>
          </CardContent>
        </Card>

        <Card className='border-border bg-gradient-to-br from-green-500/5 to-emerald-500/5 backdrop-blur'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Roles Totales
            </CardTitle>
            <Shield className='h-5 w-5 text-green-500' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold text-foreground'>
              {user.organizations.length + user.teams.length}
            </div>
            <p className='text-xs text-muted-foreground mt-1'>Asignaciones activas</p>
          </CardContent>
        </Card>
      </div>

      {/* Organizations Section */}
      <Card className='border-border bg-card/50 backdrop-blur'>
        <CardHeader>
          <CardTitle className='text-lg flex items-center gap-2'>
            <Building2 className='w-5 h-5 text-blue-500' />
            Organizaciones ({user.organizations.length})
          </CardTitle>
          <CardDescription>Organizaciones a las que pertenece este usuario</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {user.organizations.map((org) => (
              <Card
                key={org.id}
                className='border-border bg-card hover:bg-accent/5 transition-colors'
              >
                <CardContent className='p-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold'>
                        {org.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className='font-semibold text-foreground'>{org.name}</h3>
                        <p className='text-xs text-muted-foreground'>ID: {org.id}</p>
                      </div>
                    </div>
                    <Badge className={roleColors[org.role]}>{org.role}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Teams Section */}
      <Card className='border-border bg-card/50 backdrop-blur'>
        <CardHeader>
          <CardTitle className='text-lg flex items-center gap-2'>
            <Users className='w-5 h-5 text-purple-500' />
            Teams ({user.teams.length})
          </CardTitle>
          <CardDescription>Teams en los que participa este usuario</CardDescription>
        </CardHeader>
        <CardContent>
          {user.teams.length > 0 ? (
            <div className='space-y-3'>
              {user.teams.map((team) => (
                <Card
                  key={team.id}
                  className='border-border bg-card hover:bg-accent/5 transition-colors'
                >
                  <CardContent className='p-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold'>
                          {team.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className='font-semibold text-foreground'>{team.name}</h3>
                          <p className='text-xs text-muted-foreground'>{team.organizationName}</p>
                        </div>
                      </div>
                      <Badge className={roleColors[team.role]}>{team.role}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className='text-center py-8 text-muted-foreground'>
              <Users className='w-12 h-12 mx-auto mb-2 opacity-50' />
              <p>Este usuario no pertenece a ningún team</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
