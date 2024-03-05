'use client'

import React from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar'; // Adjust the import path according to your file structure
import { ChartBar, ComputerTower, Wrench, ShieldCheck } from 'phosphor-react';

const TestAutomation = () => {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Head>
                <title>Test Automation | SystemsLab21</title>
                <meta name="description" content="SystemsLab21 - Automated Testing for Railway Systems" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Sidebar />

            <main className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-6">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Test Automation</h1>
                    <p className="text-gray-700 mb-8">
                        Streamline your rail system testing process with our comprehensive test automation solutions.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <FeatureCard
                            icon={ComputerTower}
                            title="High Performance"
                            description="Optimize your testing procedures with high-speed automation that saves time and reduces errors."
                        />
                        {/* Card 2 */}
                        <FeatureCard
                            icon={ChartBar}
                            title="Analytics"
                            description="Gain insights from detailed analytics and reports to make informed decisions for system improvements."
                        />
                        {/* Card 3 */}
                        <FeatureCard
                            icon={Wrench}
                            title="Custom Solutions"
                            description="Customized testing solutions that cater to the unique needs of your rail infrastructure."
                        />
                        {/* Card 4 */}
                        <FeatureCard
                            icon={ShieldCheck}
                            title="Safety Assurance"
                            description="Ensure the highest standards of safety with rigorous automated testing protocols."
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center text-center">
        <Icon className="w-12 h-12 text-green-600 mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default TestAutomation;
