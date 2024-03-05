'use client';
import React from 'react';
import Link from 'next/link';
import { House, Gear, TestTube, ProjectorScreen, UserCircle, ChartLine, Icon } from 'phosphor-react';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    return (
        <div className="flex flex-col h-full min-w-64 bg-green-800 text-white shadow-xl">
            <div className="flex items-center justify-center p-6 border-b border-slate-300 shadow">
                <h1 className="text-2xl font-bold text-white">Platform21</h1>
            </div>
            <nav className="flex-grow mt-5">
                <ul>
                    <SidebarItem icon={House} href="/" label="Home" />
                    <SidebarItem icon={ChartLine} href="/dashboard" label="Dashboard" />
                    <SidebarItem icon={TestTube} href="/test-automation" label="Test Automation" />
                    <SidebarItem icon={Gear} href="/signal-planning" label="Signal Planning" />
                    <SidebarItem icon={ProjectorScreen} href="/time-table" label="Time Table" />
                </ul>
            </nav>
            <div className="px-5 py-4 border-t border-slate-300">
                <button className="w-full px-5 py-2 text-left text-white bg-green-700 hover:bg-green-600 rounded-md transition duration-150 ease-in-out shadow-md">
                    <span className="flex items-center gap-3">
                        <UserCircle className="w-6 h-6" />
                        Settings
                    </span>
                </button>
            </div>
        </div>
    );
};

type SidebarItemProps = {
    icon: Icon;
    href: string;
    label: string;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, href, label }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    const baseClasses = "flex items-center gap-3 w-full px-5 py-3 mb-1 text-left rounded-md transition-colors duration-150 ease-in-out focus:outline-none";
    const activeClasses = "bg-green-700 text-slate-200 shadow-inner"; // Style for active link with inner shadow for depth
    const inactiveClasses = "text-white hover:bg-green-700 hover:text-slate-200 hover:shadow-md"; // Style for inactive link with hover effect

    return (
        <Link href={href} passHref>
            <li>
                <button className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                    <Icon className={`w-6 h-6 ${isActive ? 'text-slate-200' : 'text-green-200'}`} weight="bold" />
                    <span className={`${isActive ? 'font-semibold text-slate-200' : 'text-white'}`}>{label}</span>
                </button>
            </li>
        </Link>
    );
};

export default Sidebar;
