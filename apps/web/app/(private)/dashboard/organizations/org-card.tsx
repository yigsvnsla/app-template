import { Avatar, AvatarFallback, AvatarImage } from "@packages/ui/components/avatar";
import { Badge } from "@packages/ui/components/badge";
import { Button } from "@packages/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@packages/ui/components/card";
import { Building2Icon, CalendarIcon, ExternalLinkIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import type { authClient } from "@/utils/auth-client";

export const OrganizationCard: FC<
  typeof authClient.$Infer.Organization & { _count: Record<string, string> }
> = ({ logo, name, slug, _count, id }) => {
  return (
    <Card className='bg-card border-border hover:border-primary/50 transition-colors group'>
      <CardHeader className='pb-4'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center space-x-3'>
            <Avatar className='w-12 h-12'>
              <AvatarImage src={logo || "/vercel.svg"} alt={name} />
              <AvatarFallback className='bg-primary/10 text-primary font-semibold'>
                {name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className='text-lg text-foreground group-hover:text-primary transition-colors'>
                {name}
              </CardTitle>
              <p className='text-sm text-muted-foreground'>@{slug}</p>
            </div>
          </div>
          <Button
            size='sm'
            variant='ghost'
            className='opacity-0 group-hover:opacity-100 transition-opacity'
          >
            <SettingsIcon className='size-4' />
          </Button>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* Organization Info */}
        <div className='space-y-2'>
          <div className='flex items-center text-sm text-muted-foreground'>
            <Building2Icon className='size-4 mr-2' />
            Consulting
            {/* {organization.metadata.industry} */}
          </div>
          <div className='flex items-center text-sm text-muted-foreground'>
            <CalendarIcon className='size-4 mr-2' />
            San Francisco, CA
            {/* {organization.metadata.location} */}
          </div>
        </div>
        {/* Stats */}
        <div className='flex md:flex-col items-center justify-between pt-2 border-t border-border'>
          <div className='flex items-center space-x-4'>
            <div className='text-center'>
              <p className='text-lg font-semibold text-foreground'>{_count.members}</p>
              <p className='text-xs text-muted-foreground'>Miembros</p>
            </div>
            <div className='text-center'>
              <p className='text-lg font-semibold text-foreground'>{_count.invitations}</p>
              <p className='text-xs text-muted-foreground'>Pendientes</p>
            </div>
            <div className='text-center'>
              <p className='text-lg font-semibold text-foreground'>{_count.teams}</p>
              <p className='text-xs text-muted-foreground'>Equipos</p>
            </div>
          </div>

          <div className='md:hidden flex items-center space-x-2'>
            <Badge variant='secondary' className='text-xs'>
              50-100 employees
            </Badge>
          </div>
        </div>
        {/* Actions */}
        <div className='flex items-center space-x-2 pt-2'>
          <Button asChild className='flex-1 bg-primary hover:bg-primary/90'>
            <Link href={`/dashboard/organizations/${id}`}>
              <ExternalLinkIcon className='w-4 h-4 mr-2' />
              Ver Dashboard
            </Link>
          </Button>

          <Button variant='outline' size='sm' asChild>
            <Link href={`/dashboard/organizations/${id}`}>
              <ExternalLinkIcon className='w-4 h-4' />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
