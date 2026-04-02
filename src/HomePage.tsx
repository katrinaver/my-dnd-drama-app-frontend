import { NavLink, Outlet, useLocation } from "react-router-dom"
import { BookOpen, BookMarked, PlusCircle, Settings, Sword } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

const navItems = [
    { to: "/campaigns", label: "Campaigns", icon: BookOpen },
    { to: "/create-campaign", label: "Create Campaign", icon: PlusCircle },
    { to: "/dnd-rules", label: "D&D Rules", icon: Sword },
    { to: "/settings", label: "Settings", icon: Settings },
]

const SidebarNav = () => {
    const { pathname } = useLocation()

    return (
        <SidebarMenu>
            {navItems.map(({ to, label, icon: Icon }) => (
                <SidebarMenuItem key={to}>
                    <SidebarMenuButton asChild isActive={pathname === to}>
                        <NavLink to={to}>
                            <Icon />
                            <span>{label}</span>
                        </NavLink>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}

export const HomePage = () => {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2 px-2 py-1">
                        <BookMarked className="size-5" />
                        <span className="font-semibold text-sm">DnD Tavern</span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarNav />
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <header className="flex h-12 items-center border-b px-4">
                    <SidebarTrigger />
                </header>
                <div className="p-6">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
