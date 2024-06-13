import {useEffect, useState} from "react"
import {io} from "socket.io-client"
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js"
import {Bar} from "react-chartjs-2"
import styles from "./VoteGraphPage.module.css"
import {useAuth} from "../../hooks/useAuth"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const VoteGraphPage = () => {
    const {user} = useAuth()
    const [voteData, setVoteData] = useState({
        labels: ["Current Team Votes"],
        datasets: [
            {
                label: "Superpoop",
                backgroundColor: "#5C1513",
                data: [0],
            },
            {
                label: "Poop",
                backgroundColor: "#8B4D60",
                data: [0],
            },
            {
                label: "Good",
                backgroundColor: "#3C660D",
                data: [0],
            },
            {
                label: "Very good",
                backgroundColor: "#303E10",
                data: [0],
            },
            {
                label: "Epic",
                backgroundColor: "#2C2D7C",
                data: [0],
            },
            {
                label: "Legendary",
                backgroundColor: "#DAAC1F",
                data: [0],
            },
        ],
    })

    const [percentages, setPercentages] = useState({
        red: 0,
        pink: 0,
        lime: 0,
        green: 0,
        blue: 0,
        yellow: 0,
    })

    useEffect(() => {
        const socket = io("localhost:3000", {
            extraHeaders: {
                Authorization: `Bearer ${user.jwt}`,
            },
        })

        socket.on("vote.listen", data => {
            if (data) {
                const totalVotes = Object.values(data).reduce((sum, val) => sum + val, 0)
                const calculatePercentage = value => (totalVotes === 0 ? 0 : ((value / totalVotes) * 100).toFixed(2))

                const updatedPercentages = {
                    red: calculatePercentage(data.red),
                    pink: calculatePercentage(data.pink),
                    lime: calculatePercentage(data.lime),
                    green: calculatePercentage(data.green),
                    blue: calculatePercentage(data.blue),
                    yellow: calculatePercentage(data.yellow),
                }

                const updatedData = {
                    labels: ["Current Team Votes"],
                    datasets: [
                        {
                            label: "Superpoop",
                            backgroundColor: "#5C1513",
                            data: [data.red],
                        },
                        {
                            label: "Poop",
                            backgroundColor: "#8B4D60",
                            data: [data.pink],
                        },
                        {
                            label: "Good",
                            backgroundColor: "#3C660D",
                            data: [data.lime],
                        },
                        {
                            label: "Very good",
                            backgroundColor: "#303E10",
                            data: [data.green],
                        },
                        {
                            label: "Epic",
                            backgroundColor: "#2C2D7C",
                            data: [data.blue],
                        },
                        {
                            label: "Legendary",
                            backgroundColor: "#DAAC1F",
                            data: [data.yellow],
                        },
                    ],
                }

                setVoteData(updatedData)
                setPercentages(updatedPercentages)
            } else {
                console.error("Unexpected data format received:", data)
            }
        })

        return () => {
            socket.disconnect()
        }
    }, [user.jwt])

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Votes</h1>
            <Bar
                data={voteData}
                className={styles.chart}
                options={{
                    indexAxis: "y", // Set the chart to be horizontal
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: false,
                        },
                    },
                    scales: {
                        x: {
                            display: true, // Show x-axis
                            stacked: true,
                            ticks: {
                                color: "white",
                                font: {
                                    size: 14,
                                    family: "Inter, sans-serif",
                                    weight: "bold",
                                },
                            },
                        },
                        y: {
                            display: false, // Hide y-axis
                            stacked: true,
                        },
                    },
                    animation: {
                        duration: 1000,
                        easing: "easeOutBounce",
                    },
                }}
            />
            <div className={styles.percentagesContainer}>
                <div className={styles.percentage}>
                    <span className={styles.colorBox} style={{backgroundColor: "#5C1513"}}></span>
                    <span>Superpoop: {percentages.red}%</span>
                </div>
                <div className={styles.percentage}>
                    <span className={styles.colorBox} style={{backgroundColor: "#8B4D60"}}></span>
                    <span>Poop: {percentages.pink}%</span>
                </div>
                <div className={styles.percentage}>
                    <span className={styles.colorBox} style={{backgroundColor: "#3C660D"}}></span>
                    <span>Good: {percentages.lime}%</span>
                </div>
                <div className={styles.percentage}>
                    <span className={styles.colorBox} style={{backgroundColor: "#303E10"}}></span>
                    <span>Very good: {percentages.green}%</span>
                </div>
                <div className={styles.percentage}>
                    <span className={styles.colorBox} style={{backgroundColor: "#2C2D7C"}}></span>
                    <span>Epic: {percentages.blue}%</span>
                </div>
                <div className={styles.percentage}>
                    <span className={styles.colorBox} style={{backgroundColor: "#DAAC1F"}}></span>
                    <span>Legendary: {percentages.yellow}%</span>
                </div>
            </div>
        </div>
    )
}

export default VoteGraphPage
