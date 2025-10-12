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
  Briefcase,
  Calendar,
  Crown,
  DollarSign,
  FolderKanban,
  MapPin,
  Settings,
  Shield,
  User,
  UserPlus,
  UsersRound,
} from "lucide-react";

interface TeamDashboardProps {
  team: Record<string, any>;
  organizationSlug: string;
}

export function TeamDashboard({ team, organizationSlug }: TeamDashboardProps) {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "lead":
        return <Crown className='h-4 w-4 text-warning' />;
      case "member":
        return <Shield className='h-4 w-4 text-primary' />;
      default:
        return <User className='h-4 w-4 text-muted-foreground' />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "lead":
        return "default";
      case "member":
        return "secondary";
      default:
        return "outline";
    }
  };

  const totalMembers = 0;
  const leads = 0;
  const members = 0;
  const contributors = 0;

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <div className='border-b border-border bg-card'>
        <div className='container mx-auto px-6 py-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center'>
                <UsersRound className='h-8 w-8 text-primary' />
              </div>
              <div>
                <h1 className='text-3xl font-bold text-balance'>{team.name}</h1>
                <p className='text-muted-foreground'>@{team.slug}</p>
                {team.description && (
                  <p className='text-sm text-muted-foreground mt-1'>{team.description}</p>
                )}
              </div>
            </div>
            <div className='flex gap-2'>
              <Button variant='outline' size='sm'>
                <UserPlus className='h-4 w-4 mr-2' />
                Add Member
              </Button>
              <Button variant='outline' size='sm'>
                <Settings className='h-4 w-4 mr-2' />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-6 py-8'>
        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Members</CardTitle>
              <UsersRound className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-primary'>{totalMembers}</div>
              <p className='text-xs text-muted-foreground'>Active team members</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Team Leads</CardTitle>
              <Crown className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-warning'>{leads}</div>
              <p className='text-xs text-muted-foreground'>Leadership roles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Active Projects</CardTitle>
              <FolderKanban className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-success'>
                {team.metadata?.projectCount || 0}
              </div>
              <p className='text-xs text-muted-foreground'>In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Budget</CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-chart-2'>
                ${team.metadata?.budget ? (team.metadata.budget / 1000).toFixed(0) : 0}K
              </div>
              <p className='text-xs text-muted-foreground'>Annual allocation</p>
            </CardContent>
          </Card>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Team Information */}
          <Card className='lg:col-span-1'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Briefcase className='h-5 w-5' />
                Team Information
              </CardTitle>
              <CardDescription>Details about this team</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {team.metadata?.department && (
                <div className='flex items-start gap-3'>
                  <Briefcase className='h-5 w-5 text-muted-foreground mt-0.5' />
                  <div>
                    <p className='text-sm font-medium'>Department</p>
                    <p className='text-sm text-muted-foreground'>{team.metadata.department}</p>
                  </div>
                </div>
              )}
              {team.metadata?.location && (
                <div className='flex items-start gap-3'>
                  <MapPin className='h-5 w-5 text-muted-foreground mt-0.5' />
                  <div>
                    <p className='text-sm font-medium'>Location</p>
                    <p className='text-sm text-muted-foreground'>{team.metadata.location}</p>
                  </div>
                </div>
              )}
              <div className='flex items-start gap-3'>
                <Calendar className='h-5 w-5 text-muted-foreground mt-0.5' />
                <div>
                  <p className='text-sm font-medium'>Created</p>
                  <p className='text-sm text-muted-foreground'>
                    {new Date(team.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className='pt-4 border-t border-border space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Team Leads</span>
                  <Badge variant='default'>{leads}</Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Members</span>
                  <Badge variant='secondary'>{members}</Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Contributors</span>
                  <Badge variant='outline'>{contributors}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card className='lg:col-span-2'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <UsersRound className='h-5 w-5' />
                Team Members
              </CardTitle>
              <CardDescription>People working in this team</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {[
                {
                  id: 1,
                  role: "role",
                  createdAt: "11/11/1111",
                  user: { id: 1, image: "image", name: "name", email: "email" },
                },
              ].map((member) => (
                <div
                  key={member.id}
                  className='flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30'
                >
                  <div className='flex items-center gap-3'>
                    <Avatar>
                      <AvatarImage
                        src={member.user.image || "/placeholder.svg"}
                        alt={member.user.name}
                      />
                      <AvatarFallback>
                        {member.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
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
              {true && (
                <div className='text-center py-8 text-muted-foreground'>No members found</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
