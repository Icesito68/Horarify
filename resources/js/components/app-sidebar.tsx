// import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Phone, Calendar, User } from 'lucide-react';
import AppLogo from './app-logo';
import AppearanceTabs from '@/components/appearance-tabs';


const mainNavItems: NavItem[] = [
    {
        title: 'Calendario',
        href: '/dashboard',
        icon: Calendar,
    },
    {
        title: 'Empleados',
        href: '/empleados',
        icon: User,
    },
    {
        title: 'Dias Festivos',
        href: '/festivos',
        icon: User,
    },
    {
        title: 'Empresas',
        href: '/empresas',
        icon: User,
    }
];

const mainNavFooterItems: NavItem[] = [
    {
        title: 'Contacto',
        href: '/contacto',
        icon: Phone,
    },
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                                <AppLogo />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavMain items={mainNavFooterItems} />
                <AppearanceTabs/>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
