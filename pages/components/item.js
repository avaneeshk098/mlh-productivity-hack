import { useState, useEffect } from 'react'

export default function item({ desc, time }) {
    const calculateTimeLeft = () => {
        let currTime = new Date().getTime()
        const difference = new Date(time) - currTime
        let timeLeft = {}

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
        }

        return timeLeft
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
    const [year] = useState(new Date().getTime())

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)
    })

    const timerComponents = []

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return
        }

        timerComponents.push(
            <span>
                {timeLeft[interval]} {interval}{' '}
            </span>
        )
    })
    return (
        <div>
            <div className="item-container">
                <h3 className="item-title">{desc}</h3>
                <h6 className="item-timer">
                    {timerComponents.length ? (
                        timerComponents
                    ) : (
                        <span style={{ color: 'red' }}>Deadline passed!</span>
                    )}
                </h6>
            </div>
            <style jsx>{`
                .item-container {
                    padding-left: 2rem;
                    padding-right: 2rem;
                    border-bottom: 1px solid #dedede;
                }
                .item-title {
                    font-size: 1.5em;
                    margin: 0;
                    margin-top: 2rem;
                    padding-bottom: 0;
                    color: #0070f3;
                }
                .item-timer {
                    margin: 0;
                    margin-top: 1rem;
                    margin-bottom: 2rem;
                    font-size: 1.1em;
                    font-weight: 600;
                }
            `}</style>
        </div>
    )
}
