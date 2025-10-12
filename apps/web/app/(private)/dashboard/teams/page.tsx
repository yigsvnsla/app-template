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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@packages/ui/components/dialog";
import { Input } from "@packages/ui/components/input";
import { Label } from "@packages/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@packages/ui/components/select";
import { Textarea } from "@packages/ui/components/textarea";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  FolderKanban,
  MapPinIcon,
  Plus,
  TrendingUp,
  Users,
  UsersRound,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useState } from "react";
import { ChartLineMultiple } from "./chart-line-multiple";
import { ChartPieDonutText } from "./chat-pie-donut-text";

export default function Page() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <section className='space-y-4'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-4xl font-bold text-balance mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
            Teams
          </h1>
          {/* <p className='text-muted-foreground text-lg'>
            Gestiona y organiza equipos dentro de&nbsp;
            <span className='text-primary font-medium'>Org Name</span>
          </p> */}
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className='bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20'>
              <Plus className='w-4 h-4 mr-2' />
              Crear Team
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[500px]'>
            <form>
              <DialogHeader>
                <DialogTitle>Crear Nuevo Team</DialogTitle>
                <DialogDescription>
                  Agrega un nuevo equipo para organizar miembros y proyectos dentro de tu
                  organización.
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='name'>Nombre del Team *</Label>
                  <Input id='name' placeholder='Engineering, Marketing, Design...' required />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='slug'>Slug *</Label>
                  <Input id='slug' placeholder='engineering' required />
                  <p className='text-xs text-muted-foreground'>
                    Usado en URLs: /organizations/{"organization.slug"}/teams/
                    {"team-slug"}
                  </p>
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='description'>Descripción</Label>
                  <Textarea
                    id='description'
                    placeholder='Breve descripción del propósito y responsabilidades del equipo...'
                    rows={3}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='department'>Departamento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Seleccionar departamento' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='technology'>Technology</SelectItem>
                      <SelectItem value='design'>Design</SelectItem>
                      <SelectItem value='marketing'>Marketing</SelectItem>
                      <SelectItem value='sales'>Sales</SelectItem>
                      <SelectItem value='operations'>Operations</SelectItem>
                      <SelectItem value='finance'>Finance</SelectItem>
                      <SelectItem value='hr'>Human Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='location'>Ubicación</Label>
                  <Input id='location' placeholder='San Francisco, CA o Remoto' />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type='submit'>Crear Team</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className='gap-2 grid grid-cols-2'>
        <div className='grid gap-2 grid-cols-2 grid-rows-2 '>
          <Card className='justify-between border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/40 transition-all'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Total Teams
              </CardTitle>
              <div className='h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                <UsersRound className='h-5 w-5 text-primary' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold text-primary'>1</div>
              <p className='text-xs text-muted-foreground mt-1 flex items-center gap-1'>
                Equipos activos
                <TrendingUp className='size-3' />
              </p>
            </CardContent>
          </Card>

          <Card className='justify-between border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent hover:border-green-500/40 transition-all'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Miembros Totales
              </CardTitle>
              <div className='h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center'>
                <Users className='h-5 w-5 text-green-500' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold text-green-500'>1</div>
              <p className='text-xs text-muted-foreground mt-1'>En todos los equipos</p>
            </CardContent>
          </Card>

          <Card className='justify-between border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent hover:border-blue-500/40 transition-all'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Proyectos Activos
              </CardTitle>
              <div className='h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center'>
                <FolderKanban className='h-5 w-5 text-blue-500' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold text-blue-500'>1</div>
              <p className='text-xs text-muted-foreground mt-1'>En progreso</p>
            </CardContent>
          </Card>

          <Card className='justify-between border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent hover:border-purple-500/40 transition-all'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Promedio por Team
              </CardTitle>
              <div className='h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center'>
                <UsersRound className='h-5 w-5 text-purple-500' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold text-purple-500'>1</div>
              <p className='text-xs text-muted-foreground mt-1'>Miembros por equipo</p>
            </CardContent>
          </Card>
        </div>

        <ChartLineMultiple />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {[1, 2, 3, 4, 5, 6, 7, 5, 6, 7].map((team) => {
          return (
            <Card
              key={team}
              className='group hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 bg-gradient-to-br from-card to-card/50'
            >
              <CardHeader>
                <div className='flex items-start justify-between mb-3'>
                  <div className='flex items-center gap-3 flex-1'>
                    <div className='h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all'>
                      <UsersRound className='h-7 w-7 text-primary' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <CardTitle className='text-xl mb-1 truncate'>Team.Name</CardTitle>
                      <p className='text-sm text-muted-foreground'>@Team-Slug</p>
                    </div>
                  </div>
                </div>
                <CardDescription className='line-clamp-2 text-pretty'>
                  team.description
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex flex-wrap gap-2'>
                  <Badge variant='outline' className={` border`}>
                    <BriefcaseIcon className='h-3 w-3 mr-1' />
                    team.metadata.department
                  </Badge>

                  <Badge variant='outline' className='bg-muted/50'>
                    <MapPinIcon className='h-3 w-3 mr-1' />
                    team.metadata.location
                  </Badge>
                </div>

                <div className='grid grid-cols-2 gap-3 py-3 border-y border-border'>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-primary'>0</div>
                    <p className='text-xs text-muted-foreground'>Miembros</p>
                  </div>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-blue-500'>0</div>
                    <p className='text-xs text-muted-foreground'>Proyectos</p>
                  </div>
                </div>

                <div className='bg-muted/30 rounded-lg p-3 border border-border/50'>
                  <p className='text-xs text-muted-foreground mb-2 font-medium'>Team Lead</p>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-10 w-10 ring-2 ring-primary/20'>
                      <AvatarImage src={`https://ui.shadcn.com/avatars/0${team}.png`} />
                      <AvatarFallback className='text-xs bg-primary/10 text-primary font-semibold'>
                        teamLead.user.name
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium truncate'>teamLead.user.name</p>
                      <p className='text-xs text-muted-foreground truncate'>teamLead.user.email</p>
                    </div>
                  </div>
                </div>

                <Link href={`/organizations/` as Route} className='block'>
                  <Button
                    variant='outline'
                    className='w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all bg-transparent'
                  >
                    Ver Dashboard
                    <ArrowRightIcon className='h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform' />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {[].length === 0 && (
        <Card className='border-dashed border-2'>
          <CardContent className='flex flex-col items-center justify-center py-16'>
            <div className='h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
              <UsersRound className='h-10 w-10 text-primary' />
            </div>
            <h3 className='text-2xl font-semibold mb-2'>No hay teams todavía</h3>
            <p className='text-muted-foreground mb-6 text-center max-w-md text-balance'>
              Crea tu primer equipo para comenzar a organizar miembros y proyectos dentro de tu
              organización.
            </p>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              size='lg'
              className='shadow-lg shadow-primary/20'
            >
              <Plus className='w-4 h-4 mr-2' />
              Crear Tu Primer Team
            </Button>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
