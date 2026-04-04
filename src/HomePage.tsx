import { NavLink, Outlet, useLocation } from "react-router-dom"
import { BookOpen, BookMarked, PlusCircle, Settings, Sword, UserRoundCog } from "lucide-react"
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
import {useAuth} from "@/contexts/AuthContext.tsx"
import {useMemo} from "react"


const AppRoutes = {
    Campaigns: "/campaigns",
    Create_campaign: "/create-campaign",
    Dnd_rules: "/dnd-rules",
    Settings: "/settings",
    Preset_page: "/preset-page",
    Home: "/",
}

const navItems = [
    { to: AppRoutes.Campaigns, label: "Campaigns", icon: BookOpen },
    { to: AppRoutes.Create_campaign, label: "Create Campaign", icon: PlusCircle },
    { to: AppRoutes.Dnd_rules, label: "D&D Rules", icon: Sword },
    { to: AppRoutes.Settings, label: "Settings", icon: Settings },
    { to: AppRoutes.Preset_page, label: "Presets", icon: UserRoundCog},
]


const SidebarNav = () => {
    const { pathname } = useLocation()
    const {user} = useAuth()
    const isMaster = user?.role === "master"
    const allowedNavItems = useMemo(() => (
            isMaster
                ? navItems
                : navItems.filter(item => item.to !== AppRoutes.Preset_page && item.to !== AppRoutes.Create_campaign)
    ), [isMaster])

    return (
        <SidebarMenu>
            {allowedNavItems.map(({ to, label, icon: Icon }) => (
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
                        <span className="font-semibold text-sm">DnD App</span>
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
