'use client'
import React from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import { Train, Lock, Gauge, ShieldCheck } from 'phosphor-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js'
import { Chart, Doughnut, Line } from 'react-chartjs-2'
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
)

const DashboardPage = () => {
    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Number of Train Operations',
                data: [65, 59, 80, 81, 56, 55],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const doughnutChartData = {
        labels: ['ETCS', 'EULYNX', 'Interlocking', 'Safety Logic'],
        datasets: [
            {
                label: 'System Compliance',
                data: [300, 50, 100, 50],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Head>
                <title>Dashboard | SystemsLab21</title>
                <meta name="description" content="SystemsLab21 - Dashboard for Railway System Monitoring" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Sidebar />

            <main className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-6">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Dashboard</h1>
                    <p className="text-gray-700 mb-8">
                        Gain insights and oversee your railway systems at a glance with our comprehensive dashboard.
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Line Chart for Train Operations */}
                        <div className="bg-white shadow-xl rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Train Operations - Last 6 Months</h3>
                            <Line data={lineChartData} />
                        </div>

                        {/* Doughnut Chart for System Compliance */}
                        <div className="bg-white shadow-xl rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">System Compliance Overview</h3>
                            <Doughnut data={doughnutChartData} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
