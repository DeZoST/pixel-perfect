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

    useEffect(() => {
        const socket = io("localhost:3000", {
            extraHeaders: {
                Authorization: `Bearer ${user.jwt}`,
            },
        })

        socket.on("vote.listen", data => {
            if (data) {
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
                            display: true, // Hide x-axis
                            stacked: true,
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
        </div>
    )
}

export default VoteGraphPage
