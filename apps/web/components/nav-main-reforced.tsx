import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@packages/ui/components/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@packages/ui/components/sidebar";
import {
  Building2Icon,
  Folder,
  Forward,
  type LucideIcon,
  MoreHorizontal,
  Trash2,
  User2Icon,
  UsersIcon,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { FC } from "react";

type RouteItem =
  | (BaseRouteItem & { options: RouteItem[]; items?: never })
  | (BaseRouteItem & { items: RouteItem[]; options?: never });

interface BaseRouteItem {
  title: string;
  url: Route;
  icon: LucideIcon;
}

// Removed LayoutSlotMap usage as it is not exported from "next"
const sideBarItems: Record<string, RouteItem> = {
  teams: {
    title: "tea",
    url: "/auth",
    icon: UsersIcon,
    items: [],
  },
};

console.log(sideBarItems);

export const NavMainReforced: FC = () => {
  const { isMobile } = useSidebar();

  return (
    <>
      {[
        {
          title: "users management",
          items: [
            // {
            //   title: "dashboard",
            //   url: "/organizations",
            //   isActive: true,
            //   icon: UsersIcon,
            //   items: [
            //     { title: "dashboard", url: "/organizations", isActive: true, icon: UsersIcon },
            //     { title: "audit", url: "/organizations", isActive: true, icon: UsersIcon },
            //   ],
            // },
            {
              title: "organizations",
              url: `/dashboard/organizations` satisfies Route,
              isActive: true,
              icon: Building2Icon,

              options: [
                //   { title: "dashboard", url: "/organizations", isActive: true, icon: UsersIcon },
                //   { title: "audit", url: "/organizations", isActive: true, icon: UsersIcon },
              ],
            },

            {
              title: "teams",
              url: `/dashboard/teams` satisfies Route,
              isActive: true,
              icon: UsersIcon,
            },

            {
              title: "users",
              url: `/dashboard/users` satisfies Route,
              isActive: true,
              icon: User2Icon,
            },
          ],
        },
        {
          title: "inventory",
          items: [
            {
              title: "equipment",
              url: `/dashboard/organizations` satisfies Route,
              isActive: true,
              icon: Building2Icon,

              options: [
                //   { title: "dashboard", url: "/organizations", isActive: true, icon: UsersIcon },
                //   { title: "audit", url: "/organizations", isActive: true, icon: UsersIcon },
              ],
            },

            {
              title: "teams",
              url: `/dashboard/teams` satisfies Route,
              isActive: true,
              icon: UsersIcon,
            },

            {
              title: "users",
              url: `/dashboard/users` satisfies Route,
              isActive: true,
              icon: User2Icon,
            },
          ],
        },
      ].map((group) => {
        return (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className='capitalize'>{group.title}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => {
                // if (item.items) {
                //   return (
                //     <Collapsible
                //       asChild
                //       key={item.title}
                //       defaultOpen={item.isActive}
                //       className='group/collapsible'
                //     >
                //       <SidebarMenuItem>
                //         <CollapsibleTrigger asChild>
                //           <SidebarMenuButton className='capitalize' tooltip={item.title}>
                //             {item.icon && <item.icon />}
                //             <span>{item.title}</span>
                //             <ChevronDownIcon className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180' />
                //           </SidebarMenuButton>
                //         </CollapsibleTrigger>
                //         <CollapsibleContent>
                //           <SidebarMenuSub>
                //             {item.items.map((subItem) => (
                //               <SidebarMenuSubItem key={subItem.title}>
                //                 <SidebarMenuSubButton className='capitalize' asChild>
                //                   <Link href={subItem.url as Route}>
                //                     <span>{subItem.title}</span>
                //                   </Link>
                //                 </SidebarMenuSubButton>
                //               </SidebarMenuSubItem>
                //             ))}
                //           </SidebarMenuSub>
                //         </CollapsibleContent>
                //       </SidebarMenuItem>
                //     </Collapsible>
                //   );
                // }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className='capitalize' tooltip={item.title}>
                      <Link href={item.url as Route}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        {/* {!item.options && <ChevronRightIcon className='ml-auto ' />} */}
                      </Link>
                    </SidebarMenuButton>
                    {item.options && item.options.length > 0 && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction showOnHover>
                            <MoreHorizontal />
                            <span className='sr-only'>More</span>
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className='w-48 rounded-lg'
                          side={isMobile ? "bottom" : "right"}
                          align={isMobile ? "end" : "start"}
                        >
                          <DropdownMenuItem>
                            <Folder className='text-muted-foreground' />
                            <span>View Project</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Forward className='text-muted-foreground' />
                            <span>Share Project</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Trash2 className='text-muted-foreground' />
                            <span>Delete Project</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        );
      })}
    </>
  );
};
