'use client';

import React, { useState } from 'react';
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
  
const SignalPlanVisualizer = () => {
    const [signals, setSignals] = useState([
        { id: 's1', status: 'green', position: { x: 50, y: 50 } },
        { id: 's2', status: 'red', position: { x: 150, y: 50 } },
        { id: 's3', status: 'yellow', position: { x: 250, y: 50 } },
    ]);

    const toggleSignal = (signalId) => {
        setSignals((prevSignals) =>
            prevSignals.map((sig) =>
                sig.id === signalId
                    ? {
                        ...sig,
                        status: sig.status === 'green' ? 'red' : 'green',
                    }
                    : sig
            )
        );
    };

    return (
        <svg width="300" height="100" className="border">
            {signals.map((signal) => (
                <Signal
                    key={signal.id}
                    x={signal.position.x}
                    y={signal.position.y}
                    status={signal.status}
                    onClick={() => toggleSignal(signal.id)}
                />
            ))}
        </svg>
    );
};

const Signal = ({ x, y, status, onClick }) => {
    const colors = {
        green: '#28A745',
        red: '#DC3545',
        yellow: '#FFC107',
    };

    return (
        <g onClick={onClick} style={{ cursor: 'pointer' }}>
            <circle cx={x} cy={y} r="20" fill={colors[status]} />
            <text x={x} y={y + 5} fontSize="15" fill="white" textAnchor="middle" pointerEvents="none">
                {status[0].toUpperCase()}
            </text>
        </g>
    );
};

export default SignalPlanVisualizer;
