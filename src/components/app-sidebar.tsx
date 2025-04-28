/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import * as React from 'react';

import { NavDocuments } from '@/components/nav-documents';
import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  BicepsFlexed,
  Camera,
  ChartNoAxesColumnIncreasing,
  CircleHelp,
  Database,
  FileClock,
  FileText,
  FileType,
  Folder,
  LayoutDashboard,
  List,
  Search,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: <LayoutDashboard />,
    },
    {
      title: 'Lifecycle',
      url: '/',
      icon: <List />,
    },
    {
      title: 'Analytics',
      url: '/',
      icon: <ChartNoAxesColumnIncreasing />,
    },
    {
      title: 'Projects',
      url: '/',
      icon: <Folder />,
    },
    {
      title: 'Team',
      url: '/',
      icon: <Users />,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: Camera,
      isActive: true,
      url: '/',
      items: [
        {
          title: 'Active Proposals',
          url: '/',
        },
        {
          title: 'Archived',
          url: '/',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: FileText,
      url: '/',
      items: [
        {
          title: 'Active Proposals',
          url: '/',
        },
        {
          title: 'Archived',
          url: '/',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: <Sparkles />,
      url: '/',
      items: [
        {
          title: 'Active Proposals',
          url: '/',
        },
        {
          title: 'Archived',
          url: '/',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '/',
      icon: <Settings />,
    },
    {
      title: 'Get Help',
      url: '/',
      icon: <CircleHelp />,
    },
    {
      title: 'Search',
      url: '/',
      icon: <Search />,
    },
  ],
  documents: [
    {
      name: 'Data Library',
      url: '/',
      icon: <Database />,
    },
    {
      name: 'Reports',
      url: '/',
      icon: <FileClock />,
    },
    {
      name: 'Word Assistant',
      url: '/',
      icon: <FileType />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <BicepsFlexed className="!size-5" />
                <span className="text-base font-semibold">Build-a-Body</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
