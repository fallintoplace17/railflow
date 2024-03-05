"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Sidebar from '../components/Sidebar';
import Head from 'next/head';
import { generateFakeTrainLineData, stationNames } from '../utils/trainData';
import { Train } from 'phosphor-react';
import "../globals.css";

interface StationPosition {
    time: number;
    station: string;
}

// Generate sophisticated and randomized train line data
const numLines = 5;
const numStations = stationNames.length;

// Adjusted to cover 18 hours (from 6:00 AM to midnight)
const maxTime = 18 * 60; // 18 hours * 60 minutes

const trainLinesData = generateFakeTrainLineData(numLines, numStations, maxTime);
const colors = [
    "#e6194B", // Red
    "#3cb44b", // Green
    "#ffe119", // Yellow
    "#4363d8", // Blue
    "#f58231", // Orange
    "#911eb4", // Purple
    "#42d4f4", // Cyan
    "#f032e6", // Magenta
    "#bfef45", // Lime
    "#fabed4"  // Pink
];
  
const TrainTimeTable = () => {
    const d3Container = useRef<SVGSVGElement>(null);

    // Tooltip state
    const [tooltipContent, setTooltipContent] = useState('');
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const initialized = useRef(false)

    useEffect(() => {
        if (!initialized.current && d3Container.current) {
            initialized.current = true;
            const margin = { top: 120, right: 50, bottom: 100, left: 100 };
            const width = 1400 - margin.left - margin.right;
            const height = 800 - margin.top - margin.bottom;
            
            const svg = d3.select(d3Container.current)
                .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
                .attr("class", "bg-white rounded-lg shadow")
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            // Define the text for the title
            const titleText = "Railway Time Table for 01/03/2024";
        
            // Append an empty text element that will be filled character by character
            const title = svg.append("text")
                .attr("x", width / 2)
                .attr("y", -margin.top / 2)
                .attr("text-anchor", "middle")
                .attr("class", "chart-title")
                .style("font-size", "24px")
                .style("font-family", "monospace");

            // Function to simulate typing effect
            let index = 0;
            const typeWriter = () => {
                if (index < titleText.length) {
                    title.text(title.text() + titleText[index]);
                    index++;
                    setTimeout(typeWriter, 100); // Adjust typing speed as needed
                }
            };

            // Start typing animation
            typeWriter();


            svg.append("style").text(`
            .train-line {
                stroke-linecap: round;
                transition: stroke-width 0.2s;
            }

            .train-line:hover {
                stroke-width: 6;
                cursor: pointer;
            }
        `);

            const xScale = d3.scaleLinear()
                .domain([0, 60 * 18])
                .range([0, width]);

            const yScale = d3.scalePoint()
                .domain(stationNames)
                .range([height, 0])
                .padding(1);


            // Gridlines
            const makeXGridlines = () => d3.axisBottom(xScale)
                .tickValues(d3.range(0, maxTime + 60, 60)); 
            const makeYGridlines = () => d3.axisLeft(yScale);

            // Adding gridlines
            svg.append("g")
                .attr("class", "grid")
                .attr("transform", `translate(0, ${height})`)
                .call(makeXGridlines()
                    .tickSize(-height)
                    .tickFormat(() => ""))
                .attr("stroke-opacity", 0.1); // Lighten the grid lines

            svg.append("g")
                .attr("class", "grid")
                .call(makeYGridlines()
                    .tickSize(-width)
                    .tickFormat(() => ""))
                .attr("stroke-opacity", 0.1);

            const xAxis = d3.axisBottom(xScale)
                .tickFormat(d => {
                    const time = new Date();
                    time.setHours(6, 0, 0, 0); // Start from 6:00 AM
                    time.setMinutes(time.getMinutes() + Number(d)); 
                    const hours = time.getHours();
                    const minutes = time.getMinutes();
                    return `${hours % 24}:${minutes.toString().padStart(2, '0')}`;
                })
                .tickValues(d3.range(0, maxTime + 60, 60));
            
                
            const yAxis = d3.axisLeft(yScale);

            // Append the x-axis to the svg
            const gXAxis = svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(xAxis);

            gXAxis.selectAll(".tick text") // Select all text elements for the ticks
                .classed("text-hover", true); // Apply the hover class

            // Function to format the tooltip content
            const formatTooltipContent = (time: number) => {
                // Filter train lines data to find train positions at or before the given time
                return trainLinesData.map((lineData, index) => {
                    // Find the closest departure time at or before the given time
                    let position: StationPosition | null = null;
                    for (let i = 0; i < lineData.length; i++) {
                        if (lineData[i].time <= time) {
                            position = lineData[i];
                        } else {
                            break; // Stop if the time exceeds the current time
                        }
                    }
              
                    // Return information about the train at the position found
                    if (position) {
                    // If the next position is within the time range, the train is traveling to the next station
                        let nextPosition = lineData.find((d, idx) => idx > lineData.indexOf(position) && d.station !== position.station);
                        let travelingToStation = nextPosition ? `traveling to ${nextPosition.station}` : 'at the last station';
                        return `Train ${index + 1} from ${position.station} ${travelingToStation}`;
                    }
                    return null;
                }).filter(Boolean);
            };
              
  
            // Attach mousemove event to x-axis ticks
            gXAxis.selectAll('.tick').on('mousemove', function(event, d) {
                // d is the time value for the tick
                const formattedTime = d3.select(this).select('text').text(); // Gets the formatted time from the tick label
                const tooltipContentArray = formatTooltipContent(d); // Get the positions of the trains at the tick's time as an array
                setTooltipContent(`Time: ${formattedTime}\n${tooltipContentArray.join('\n')}`);
                setTooltipVisible(true);
                setMousePosition({ x: event.clientX, y: event.clientY });
            })
                .on('mouseleave', function(event, d) {
                    setTooltipVisible(false);
                });
  

            const gYAxis = svg.append("g")
                .call(yAxis)
                .selectAll(".tick") // Select all the ticks (station names)
                .on("mousemove", function(event, d) {
                    // d is the station name for the tick
                    const trainsThroughStation = trainLinesData.map((lineData, index) => {
                        // Filter train lines to find those that pass through the station at any time
                        const timesThroughStation = lineData
                            .filter(pos => pos.station === d)
                            .map(pos => {
                                // Convert time to a readable format
                                const time = new Date();
                                time.setHours(6, 0, 0, 0); // Start from 6:00 AM
                                time.setMinutes(time.getMinutes() + pos.time);
                                const hours = time.getHours();
                                const minutes = time.getMinutes();
                                return `${hours % 24}:${minutes.toString().padStart(2, '0')}`;
                            })
                            .join(', ');
            
                        return timesThroughStation ? `Train ${index + 1} at ${timesThroughStation}` : null;
                    }).filter(Boolean).join('\n');
            
                    // If there are trains passing through the station, show them in the tooltip
                    if (trainsThroughStation) {
                        setTooltipContent(`Station: ${d}\n${trainsThroughStation}`);
                        setTooltipVisible(true);
                        setMousePosition({ x: event.clientX, y: event.clientY });
                    }
                })
                .on("mouseleave", function(event, d) {
                    setTooltipVisible(false);
                });

            gYAxis
                .selectAll(".tick text") // Select all text elements for the ticks
                .classed("text-hover", true); // Apply the hover class

            const line = d3.line<{ time: number; station: string }>()
                .x(d => xScale(d.time) ?? 0) 
                .y(d => {
                    const yValue = yScale(d.station);
                    return yValue ?? 0;
                });
            
            


            // Create a path for each train line
            trainLinesData.forEach((lineData, index) => {
                const path = svg.append("path")
                    .datum(lineData)
                    .attr("d", line)
                    .attr("fill", "none")
                    .attr("stroke", colors[index % colors.length])
                    .attr("stroke-width", 4)
                    .attr("class", "train-line");
                const pathNode = path.node();
                if (pathNode !== null) {
                    const totalLength = pathNode.getTotalLength();
                    path.attr("stroke-dasharray", totalLength + " " + totalLength)
                        .attr("stroke-dashoffset", totalLength)
                        .transition() // Initialize transition
                        .duration(20000) // Duration of animation in milliseconds
                        .ease(d3.easeLinear) // Linear easing for a constant animation speed
                        .attr("stroke-dashoffset", 0); // Animate dash offset to 0 over the duration
                    const trainPathData = "M8.5 19V21.2C8.5 21.48 8.5 21.62 8.4455 21.727C8.39757 21.8211 8.32108 21.8976 8.227 21.9455C8.12004 22 7.98003 22 7.7 22H5.8C5.51997 22 5.37996 22 5.273 21.9455C5.17892 21.8976 5.10243 21.8211 5.0545 21.727C5 21.62 5 21.48 5 21.2V19M19 19V21.2C19 21.48 19 21.62 18.9455 21.727C18.8976 21.8211 18.8211 21.8976 18.727 21.9455C18.62 22 18.48 22 18.2 22H16.3C16.02 22 15.88 22 15.773 21.9455C15.6789 21.8976 15.6024 21.8211 15.5545 21.727C15.5 21.62 15.5 21.48 15.5 21.2V19M3 12H21M3 5.5H21M6.5 15.5H8M16 15.5H17.5M7.8 19H16.2C17.8802 19 18.7202 19 19.362 18.673C19.9265 18.3854 20.3854 17.9265 20.673 17.362C21 16.7202 21 15.8802 21 14.2V6.8C21 5.11984 21 4.27976 20.673 3.63803C20.3854 3.07354 19.9265 2.6146 19.362 2.32698C18.7202 2 17.8802 2 16.2 2H7.8C6.11984 2 5.27976 2 4.63803 2.32698C4.07354 2.6146 3.6146 3.07354 3.32698 3.63803C3 4.27976 3 5.11984 3 6.8V14.2C3 15.8802 3 16.7202 3.32698 17.362C3.6146 17.9265 4.07354 18.3854 4.63803 18.673C5.27976 19 6.11984 19 7.8 19Z";

                    // Define an SVG filter for the shadow
                    svg.append('defs')
                        .append('filter')
                        .attr('id', 'train-shadow')
                        .append('feDropShadow')
                        .attr('dx', -10) // Horizontal shadow offset
                        .attr('dy', -10) // Vertical shadow offset
                        .attr('stdDeviation', 1) // Blur amount
                        .attr('flood-color', 'white') // Shadow color
                        .attr('flood-opacity', 0.5); // Shadow opacity

                    // When appending the train icon, apply the filter using its ID
                    const trainIcon = svg.append('g')
                        .append('path')
                        .attr('d', trainPathData) // The SVG path data for the train icon
                        .attr('transform', 'translate(-100, -100)') // Start off-screen
                        .attr('stroke', colors[index % colors.length]) // Use the same color scheme as the line
                        .attr('fill', 'none')
                        .style('filter', 'url(#train-shadow)'); // Apply the shadow filter here

                    // Animate the train icon along the path
                    trainIcon.transition()
                        .duration(20000)
                        .ease(d3.easeLinear)
                        .attrTween("transform", function() {
                            const length = pathNode.getTotalLength();
                            return function(t) {
                                const point = pathNode.getPointAtLength(t * length);
                                return `translate(${point.x}, ${point.y - 16})`;
                            };
                        });
                }

                path.on("mousemove", function(event, d) {
                    const mouseCoords = d3.pointer(event);
                    const x0 = xScale.invert(mouseCoords[0]); // Get the approximate time value from the x-coordinate
                    // Find the closest data point in lineData
                    const closestData = lineData.reduce((prev, curr) => {
                        return (Math.abs(curr.time - x0) < Math.abs(prev.time - x0) ? curr : prev);
                    });

                    // Convert minutes to hours and minutes from 6:00 AM
                    const baseTime = new Date();
                    baseTime.setHours(6, 0, 0); // Set base time to 6:00 AM
                    const timeOfInterest = new Date(baseTime.getTime() + closestData.time * 60000); // Add minutes to base time
                    const formattedTime = `${timeOfInterest.getHours()}:${timeOfInterest.getMinutes().toString().padStart(2, '0')}`;

                      
                    // Find indices for the closestData in the original dataset
                    const closestIndex = lineData.indexOf(closestData);
                    const prevStationIndex = closestIndex > 0 ? closestIndex - 1 : 0;
                    const nextStationIndex = closestIndex < lineData.length - 1 ? closestIndex + 1 : lineData.length - 1;
                      
                    // Ensure we don't reference the same station for prev and next in case of a stop
                    const prevStation = lineData[prevStationIndex].station;
                    const nextStation = lineData[nextStationIndex].station;
                      
                    // Update the tooltip content with accurate information
                    setTooltipContent(`Train ${index + 1} near ${closestData.station} at time ${formattedTime}, moving from ${prevStation} to ${nextStation}`);
                    setTooltipVisible(true);
                    setMousePosition({ x: event.clientX, y: event.clientY });
                      
                    // Increase stroke width to indicate hover
                    d3.select(this).style("stroke-width", 8); 
                });
                      
                
    
                path.on("mouseleave", function(event, d) {
                    d3.select(this)
                        .style("stroke-width", 4);
                    setTooltipVisible(false);
                });
            });
        }
        
    }, []);

    useEffect(() => {
        if (tooltipVisible && tooltipRef.current) {
            const tooltipHeight = tooltipRef.current.offsetHeight;
            const tooltipWidth = tooltipRef.current.offsetWidth;
            const spaceBelow = window.innerHeight - mousePosition.y;
            const spaceRight = window.innerWidth - mousePosition.x;
      
            let newPosition = { ...mousePosition };
      
            // Check if there's not enough space below
            if (spaceBelow < tooltipHeight) {
                newPosition.y -= (tooltipHeight + 8); // Move tooltip above the cursor
            }
      
            // Check if there's not enough space to the right
            if (spaceRight < tooltipWidth) {
                newPosition.x -= (tooltipWidth - spaceRight + 8); // Move tooltip to the left of the cursor
            }
      
            // Only update the position if necessary to reduce unnecessary re-renders
            if (newPosition.x !== mousePosition.x || newPosition.y !== mousePosition.y) {
                setMousePosition(newPosition);
            }
      
        }
    }, [tooltipVisible, mousePosition]); // Depend on both axes of mousePosition
      

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
            <Head>
                <title>Train Timetable | SystemsLab21</title>
                <meta name="description" content="SystemsLab21 - Train Timetable Visualization" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Sidebar />
            <div className="flex-grow flex justify-center items-center p-4">
                <svg ref={d3Container} id="d3-container" className="bg-gray-50 rounded-lg border border-gray-200 shadow-md" />
                {tooltipContent && (
                    <div
                        ref={tooltipRef}
                        className={`absolute px-4 py-2 text-sm text-gray-100 bg-gray-800 bg-opacity-90 rounded-lg shadow-md backdrop-blur-xs pointer-events-none ${
                            tooltipVisible ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                            left: mousePosition.x, // Position the tooltip based on mouse position
                            top: mousePosition.y
                        }}
                    >
                        {tooltipContent.split('\n').map((line, index) => (
                            <div key={index}>{line}</div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default TrainTimeTable;
