import { Card, CardContent } from "@packages/ui/components/card";
import { Building2Icon, CalendarIcon, UsersIcon } from "lucide-react";
import type { FC } from "react";
import { useParams } from "next/navigation";
import { useGetOrgRenforced } from "@/hooks/use-get-org";

export const TeamStadisticBanner: FC = () => {
  const {id} = useParams<{id:string}>()



  const { data: stadistics } = useGetOrgRenforced(id) ;

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
      <Card className='bg-card border-border'>
        <CardContent>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>Total Organizaciones</p>
              <p className='text-2xl font-bold text-foreground'>{stadistics?.organizations}</p>
            </div>
            <div className='p-3 bg-blue-500/10 rounded-lg'>
              <Building2Icon className='w-6 h-6 text-blue-500' />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='bg-card border-border'>
        <CardContent>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>Total Miembros</p>
              <p className='text-2xl font-bold text-foreground'>{stadistics?.members}</p>
            </div>
            <div className='p-3 bg-green-500/10 rounded-lg'>
              <UsersIcon className='w-6 h-6 text-green-500' />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='bg-card border-border'>
        <CardContent>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>Invitaciones Pendientes</p>
              <p className='text-2xl font-bold text-foreground'>{stadistics?.invitations}</p>
            </div>
            <div className='p-3 bg-orange-500/10 rounded-lg'>
              <CalendarIcon className='w-6 h-6 text-orange-500' />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
