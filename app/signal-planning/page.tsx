'use client'

import React from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import { ChartBar, MapPin, Sliders, Timer } from 'phosphor-react';
import dynamic from 'next/dynamic';

// Dynamically import a component for rendering interactive signal plans, if available
const SignalPlanVisualizer = dynamic(() => import('../components/SignalPlanVisualizer'), {
    ssr: false, // Disable server-side rendering for this component
    loading: () => <p>Loading visualizer...</p>,
});

const SignalPlanningPage = () => {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Head>
                <title>Signal Planning | SystemsLab21</title>
                <meta name="description" content="SystemsLab21 - Signal Planning for Efficient Railway Operations" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Sidebar />

            <main className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-6">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Signal Planning</h1>
                    <p className="text-gray-700 mb-8">
                        Utilize advanced tools to create, analyze, and optimize railway signal plans for efficient and safe train operations.
                    </p>
                    
                    {/* Main content - Signal plan visualizer */}
                    <div className="flex flex-col lg:flex-row gap-6 mb-6">
                        <div className="flex-1 bg-white shadow-xl rounded-lg p-6">
                            <SignalPlanVisualizer />
                        </div>

                        <div className="w-full lg:w-96">
                            <div className="bg-white shadow-xl rounded-lg p-6 mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Real-time Data</h3>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Train throughput</span>
                                    <ChartBar className="w-8 h-8 text-green-600" weight="bold" />
                                </div>
                                {/* Placeholder for real-time data graph */}
                                <div className="mt-4 bg-gray-200 h-32 rounded-md flex items-center justify-center">
                                    {/* Insert real-time chart here */}
                                    <span className="text-gray-400">Chart</span>
                                </div>
                            </div>

                            <div className="bg-white shadow-xl rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Signal Timing</h3>
                                {/* Placeholder for signal timing controls */}
                                <div className="mt-4 bg-gray-200 h-32 rounded-md flex flex-col items-center justify-center">
                                    <Timer className="w-8 h-8 text-blue-600 mb-2" weight="bold" />
                                    <span className="text-gray-400">Adjust Timing</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SignalPlanningPage;
