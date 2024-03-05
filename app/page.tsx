'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import Sidebar from './components/Sidebar'; 
import Link from 'next/link';
import { House, Gear, TestTube, ProjectorScreen, UserCircle, ChartLine, Icon } from 'phosphor-react';

const Page = () => {
    // Example state and content
    const [contentTitle, setContentTitle] = useState('Welcome to Platform21');
    const [contentDescription, setContentDescription] = useState('Start enhancing your railway operations today.');

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <Head>
                <title>{contentTitle} | SystemsLab21</title>
                <meta name="description" content="SystemsLab21 - Enhancing Railway Operations" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Sidebar */}
            <Sidebar />

            {/* Main content area */}
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-6 md:p-10 lg:p-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{contentTitle}</h1>
                    <p className="text-gray-700 mb-8 text-lg">
                        {contentDescription}
                    </p>
                    {/* Dynamic content or additional sections can be added here */}
                    <section className="space-y-6 mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800">Why Choose Us</h2>
                        <p className="text-gray-600">
                            Our solutions are designed to streamline the planning, testing, and commissioning of Digital Railway Infrastructures across Europe.
                        </p>
                        <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 hover:scale-105 active:bg-green-800 transition-all">
                            Get Started
                        </button>
                    </section>
                    {/* Responsive design test area */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
                        <Card
                            href="/dashboard"
                            icon={ChartLine}
                            title="Dashboard"
                            description="Gain insights and oversee your railway systems at a glance with our comprehensive dashboard."
                        />

                        <Card
                            href="/test-automation"
                            icon={TestTube}
                            title="Test Automation"
                            description="Leverage our test automation tools to ensure the reliability of your rail systems."
                        />

                        <Card
                            href="/signal-planning"
                            icon={Gear}
                            title="Signal Planning"
                            description="Plan and optimize your signaling systems with precision using our advanced signal planning tools."
                        />

                        <Card
                            href="/time-table"
                            icon={ProjectorScreen}
                            title="Time Table"
                            description="Efficiently manage your railway projects with our integrated platform."
                        />


                    </div>
                </div>
            </main>
        </div>
    );
};


type ItemProps = {
    icon: Icon;
    href: string;
    title: string;
    description: string;
};
  
const Card: React.FC<ItemProps> =  ({ href, icon: Icon, title, description }) => (
    <Link href={href} passHref>
        <button className="block bg-white shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow duration-200 flex flex-col justify-between min-h-48 w-full">
            <div className="flex items-center space-x-3 mb-4">
                <Icon className="w-6 h-6 text-green-600" weight="bold" />
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            </div>
            <p className="text-gray-600 flex-1">{description}</p>
        </button>
    </Link>
);

export default Page;
