"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Sidebar from '../components/Sidebar';
import Head from 'next/head';
import "../globals.css";


const euCountryColors = {
    AT: "#d71868", // Austria
    BE: "#fae042", // Belgium
    BG: "#00966e", // Bulgaria
    HR: "#c8102e", // Croatia
    CY: "#dfe213", // Cyprus
    CZ: "#11457e", // Czech Republic
    DK: "#c60c30", // Denmark
    EE: "#4891d9", // Estonia
    FI: "#003580", // Finland
    FR: "#0055a4", // France
    DE: "#ffce00", // Germany
    GR: "#0d5eaf", // Greece
    HU: "#436f4d", // Hungary
    IE: "#169b62", // Ireland
    IT: "#0089d0", // Italy
    LV: "#990000", // Latvia
    LT: "#0072c6", // Lithuania
    LU: "#ffad00", // Luxembourg
    MT: "#f4c430", // Malta
    NL: "#ae1c28", // Netherlands
    PL: "#dc143c", // Poland
    PT: "#ff7518", // Portugal
    RO: "#fcd116", // Romania
    SK: "#0b4ea2", // Slovakia
    SI: "#005da4", // Slovenia
    ES: "#c60b1e", // Spain
    SE: "#006aa7", // Sweden
};
const countryInfo = {
    "countries": [
        {
            "name": "Austria",
            "ETCS": "Advanced implementation on key corridors",
            "EULYNX": "Active participation in development and pilot projects",
            "rating": "B",
            "country_code": "AT"
        },
        {
            "name": "Belgium",
            "ETCS": "Comprehensive implementation plan, aiming for nationwide coverage by 2030",
            "EULYNX": "Engaged in discussions and development, focusing on integration with existing signaling systems",
            "rating": "B",
            "country_code": "BE"
        },
        {
            "name": "Bulgaria",
            "ETCS": "Initial stages of implementation on main lines",
            "EULYNX": "Exploring opportunities, not yet actively implementing",
            "rating": "D",
            "country_code": "BG"
        },
        {
            "name": "Croatia",
            "ETCS": "Under implementation on major routes",
            "EULYNX": "Interest shown but limited active involvement",
            "rating": "C",
            "country_code": "HR"
        },
        {
            "name": "Cyprus",
            "ETCS/EULYNX": "Not applicable (no railways)",
            "rating": "E",
            "country_code": "CY"
        },
        {
            "name": "Czech Republic",
            "ETCS": "Gradual rollout on main lines",
            "EULYNX": "Participating in discussions, starting to consider pilot projects",
            "rating": "C",
            "country_code": "CZ"
        },
        {
            "name": "Denmark",
            "ETCS": "Nationwide implementation in progress",
            "EULYNX": "Very active, aiming for full compatibility",
            "rating": "A",
            "country_code": "DK"
        },
        {
            "name": "Estonia",
            "ETCS": "Plans for implementation in line with Rail Baltica project",
            "EULYNX": "Initial engagement, focusing on compatibility with Baltic states",
            "rating": "C",
            "country_code": "EE"
        },
        {
            "name": "Finland",
            "ETCS": "Investigating implementation options, focusing on cross-border connectivity",
            "EULYNX": "Actively participating, especially in nordic collaboration",
            "rating": "B",
            "country_code": "FI"
        },
        {
            "name": "France",
            "ETCS": "Strategic implementation on high-speed and intercity routes",
            "EULYNX": "Engaged in development and testing, particularly for high-speed networks",
            "rating": "B",
            "country_code": "FR"
        },
        {
            "name": "Germany",
            "ETCS": "Significant investment in deployment across the network",
            "EULYNX": "Leading role in development and standardization efforts",
            "rating": "A",
            "country_code": "DE"
        },
        {
            "name": "Greece",
            "ETCS": "Implementation in early stages, focusing on main lines",
            "EULYNX": "Showing interest, but no significant projects yet",
            "rating": "D",
            "country_code": "GR"
        },
        {
            "name": "Hungary",
            "ETCS": "Implementing on key international corridors",
            "EULYNX": "Early stages of engagement and planning",
            "rating": "C",
            "country_code": "HU"
        },
        {
            "name": "Ireland",
            "ETCS": "Limited implementation, mainly on newer lines",
            "EULYNX": "Monitoring developments, but not actively involved",
            "rating": "D",
            "country_code": "IE"
        },
        {
            "name": "Italy",
            "ETCS": "Advanced deployment on high-speed and major lines",
            "EULYNX": "Active in development and implementation projects",
            "rating": "A",
            "country_code": "IT"
        },
        {
            "name": "Latvia",
            "ETCS": "Integration planned with Rail Baltica project",
            "EULYNX": "Engaging in collaboration with Baltic neighbors",
            "rating": "C",
            "country_code": "LV"
        },
        {
            "name": "Lithuania",
            "ETCS": "Central part of Rail Baltica project, with active implementation",
            "EULYNX": "Coordinating with Baltic states for harmonization",
            "rating": "B",
            "country_code": "LT"
        },
        {
            "name": "Luxembourg",
            "ETCS": "High level of implementation across the network",
            "EULYNX": "Participating in initiatives and pilot projects",
            "rating": "A",
            "country_code": "LU"
        },
        {
            "name": "Malta",
            "ETCS/EULYNX": "Not applicable (no railways)",
            "rating": "E",
            "country_code": "MT"
        },
        {
            "name": "Netherlands",
            "ETCS": "Comprehensive rollout plan, with high-speed lines prioritized",
            "EULYNX": "Very active, focusing on integration and standardization",
            "rating": "A",
            "country_code": "NL"
        },
        {
            "name": "Poland",
            "ETCS": "Expanding implementation, particularly on corridors to Western Europe",
            "EULYNX": "Showing interest, with some involvement in development",
            "rating": "B",
            "country_code": "PL"
        },
        {
            "name": "Portugal",
            "ETCS": "Targeted implementation on key routes",
            "EULYNX": "Beginning to participate in discussions and studies",
            "rating": "C",
            "country_code": "PT"
        },
        {
            "name": "Romania",
            "ETCS": "Gradual implementation, focusing on pan-European corridors",
            "EULYNX": "Initial stages of involvement, evaluating benefits",
            "rating": "C",
            "country_code": "RO"
        },
        {
            "name": "Slovakia",
            "ETCS": "Implementation on main international corridors",
            "EULYNX": "Showing interest, but limited active involvement",
            "rating": "C",
            "country_code": "SK"
        },
        {
            "name": "Slovenia",
            "ETCS": "Implementing on main lines, with plans for expansion",
            "EULYNX": "Interested in standardization, exploring possibilities",
            "rating": "C",
            "country_code": "SI"
        },
        {
            "name": "Spain",
            "ETCS": "Extensive implementation on high-speed and conventional lines",
            "EULYNX": "Actively involved in development and pilot projects",
            "rating": "A",
            "country_code": "ES"
        },
        {
            "name": "Sweden",
            "ETCS": "Ambitious national rollout plans",
            "EULYNX": "Leading in development, focusing on Nordic interoperability",
            "rating": "A",
            "country_code": "SE"
        },
    ]
}
const countryInfoMap = countryInfo.countries.reduce((acc, country) => {
    acc[country.country_code] = country;
    return acc;
}, {});
const ratingColors = {
    A: "#008000", // Green
    B: "#9ACD32", // YellowGreen
    C: "#FFFF00", // Yellow
    D: "#FFA500", // Orange
    E: "#FF0000", // Red
};
  
const getRatingColor = (rating: string) => ratingColors[rating] || "#CCCCCC"; // Default to grey if unknown rating
  
const getRatingClass = (rating: string) => `rating-${rating}`;

  
const EULYNXScore = () => {
    const d3Container = useRef<SVGSVGElement>(null);
    const [stations, setStations] = useState([]);

    // Tooltip state
    const [tooltipContent, setTooltipContent] = useState({ name: '', ETCS: '', EULYNX: '', rating: '', ratingColor: '', country: '' });
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const initialized = useRef(false)

    useEffect(() => {
        d3.csv('/data/train_stations_europe.csv').then(data => {
            const stationsData = data.map(d => ({
                id: d.id,
                name: d.name,
                latitude: +d.latitude,
                longitude: +d.longitude,
                country: d.country,
                info: countryInfoMap[d.country]
            }));
            setStations(stationsData);
        });
    }, []);

    useEffect(() => {
        if (!initialized.current && d3Container.current && stations.length > 0) {
            initialized.current = true;
            const margin = { top: 120, right: 50, bottom: 250, left: 100 };
            const width = 1400 - margin.left - margin.right;
            const height = 800 - margin.top - margin.bottom;

            const projection = d3.geoMercator()
                .center([15, 55]) 
                .scale(800)
                .translate([width / 2, height / 2]);

            const svg = d3.select(d3Container.current)
                .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
                .attr("class", "bg-white rounded-lg shadow")
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            // Define the text for the title
            const titleText = "ETCS/EULYNX Score Visualization";
        
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

            // Total duration for the animations
            const totalDuration = 5000;

            // Calculate delay for each station to fit within the total duration
            const delayDuration = totalDuration / stations.length;

            // Draw each point with a delay
            svg.selectAll(".station")
                .data(stations)
                .enter()
                .append("circle")
                .attr("class", "station")
                .attr("cx", d => projection([d.longitude, d.latitude])[0])
                .attr("cy", d => projection([d.longitude, d.latitude])[1])
                .attr("r", 0) // Initial radius of 0
                .attr("fill", d => euCountryColors[d.country] || "#CCCCCC")

                .on("mouseover", (event, d) => {
                    const countryData = countryInfoMap[d.country];
                    if (countryData) {
                        setTooltipContent({
                            name: d.name,
                            country: countryData.name,
                            ETCS: countryData.ETCS || "Info not available",
                            EULYNX: countryData.EULYNX || "Info not available",
                            rating: countryData.rating || "N/A",
                            ratingColor: getRatingColor(countryData.rating) // Determine the color based on the rating
                        });
                    } else {
                        setTooltipContent({
                            name: d.name,
                            country: "Unknown",
                            ETCS: "Info not available",
                            EULYNX: "Info not available",
                            rating: "N/A",
                            ratingColor: "#CCCCCC" // Default grey color
                        });
                    }
                    setTooltipVisible(true);
                    setMousePosition({ x: event.pageX, y: event.pageY });
                })
                .on("mouseleave", () => {
                    setTooltipVisible(false);
                })                
                .transition()
                .delay((_, i) => i * delayDuration) // Delay based on index
                .duration(delayDuration) // Duration for each point's animation
                .attr("r", 1.5) // Animate to final radius
        }
    }, [stations]); //


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
                <title>EULYNX Score | SystemsLab21</title>
                <meta name="description" content="SystemsLab21 - EULYNX Score Visualization" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Sidebar />
            <div className="flex-grow flex justify-center items-center p-4">
                <svg ref={d3Container} id="d3-container" className="bg-gray-50 rounded-lg border border-gray-200 shadow-md" />
                {tooltipVisible && (
                    <div
                        ref={tooltipRef}
                        className={`absolute px-4 py-2 text-sm text-gray-100 bg-gray-800 bg-opacity-90 rounded-lg shadow-md backdrop-blur-xs ${
                            tooltipVisible ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                            left: mousePosition.x,
                            top: mousePosition.y
                        }}
                    >
                        <div><strong>Station:</strong> {tooltipContent.name}</div>
                        <div><strong>Country:</strong> {tooltipContent.country}</div>
                        <div><strong>ETCS:</strong> {tooltipContent.ETCS}</div>
                        <div><strong>EULYNX:</strong> {tooltipContent.EULYNX}</div>
                        <div>
                            <strong>Rating: </strong> 
                            <span className={getRatingClass(tooltipContent.rating)}>{tooltipContent.rating}</span>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
};

export default EULYNXScore;
