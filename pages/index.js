import Head from 'next/head'
import { useState, useEffect } from 'react'
import Item from './components/item'
export default function Home() {
    const pomodoroCalc = () => {
        if (pomodoroSeconds - 1 === 0 && pomodoroMode === true) {
            setPomodoroMode(false)
            setSeconds(5 * 60)
        } else if (pomodoroSeconds - 1 === 0 && pomodoroMode === true) {
            setPomodoroMode(true)
            setSeconds(25 * 60)
        } else {
            setSeconds(pomodoroSeconds - 1)
        }
    }
    const [items, setItems] = useState([])
    const [pomodoroSeconds, setSeconds] = useState(25 * 60)
    const [pomodoroMode, setPomodoroMode] = useState(true)
    const [timerPlay, setTimerPlay] = useState(false)

    const startTimer = (e) => {
        setTimerPlay(true)
        setTimeout(() => {
            pomodoroCalc()
        }, 1000)
    }

    const stopTimer = (e) => {
        setTimerPlay(false)
    }

    useEffect(() => {
        if (timerPlay) {
            setTimeout(() => {
                pomodoroCalc()
            }, 1000)
        }
    })

    const addItem = () => {
        const desc = document.getElementById('task-desc').value
        document.getElementById('task-desc').value = ''
        const date = Date.parse(document.getElementById('task-date').value)
        document.getElementById('task-date').value = ''
        setItems((items) => {
            return [
                ...items,
                <Item key={items.length + 1} desc={desc} time={date} />,
            ]
        })
    }

    return (
        <div className="container">
            <Head>
                <title>Productivity Hack</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className="reminder-parent">
                    <h1 className="title">
                        Welcome to <a href="#">Productivity Hack!</a>
                    </h1>

                    <p className="description">Get your work done faster!</p>

                    <form
                        className="reminder-form"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="text"
                            id="task-desc"
                            placeholder="Enter task description"
                            className="reminder-input"
                        />
                        <input
                            placeholder="Enter task deadline"
                            id="task-date"
                            className="reminder-input"
                            type="datetime-local"
                        />
                        <button className="reminder-btn" onClick={addItem}>
                            Add
                        </button>
                    </form>
                    <h2 className="subtitle">Your Task List</h2>
                    <div
                        className="item-list"
                        style={
                            items.length === 0
                                ? { display: 'none' }
                                : { display: 'block' }
                        }
                    >
                        {items}
                    </div>
                    <h6
                        className="no-items"
                        style={
                            items.length === 0
                                ? { display: 'block' }
                                : { display: 'none' }
                        }
                    >
                        No items yet!
                    </h6>
                </div>
                <div className="pomodoro">
                    <h2 className="subtitle">Pomodoro Timer</h2>
                    <div className="controls">
                        <button className="pomodoro-btn" onClick={startTimer}>
                            Start
                        </button>
                        <button className="pomodoro-btn" onClick={stopTimer}>
                            Stop
                        </button>
                    </div>
                    <h2 className="pomodoro-time">
                        {Math.floor(pomodoroSeconds / 60)} min{' '}
                        {pomodoroSeconds % 60} sec
                    </h2>
                    <h3
                        className="subtitle"
                        style={{ color: '#0070f3', marginTop: '0.5rem' }}
                    >
                        {pomodoroMode ? 'Work Mode' : 'Break Mode'}
                    </h3>
                </div>
                <h3 className="subtitle">Enjoy some music while working!</h3>
                <iframe
                    scrolling="no"
                    frameborder="no"
                    allow="autoplay"
                    style={{
                        marginTop: '2rem',
                        width: '100%',
                        height: '450px',
                    }}
                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/301391962&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                ></iframe>
                <div
                    style={{
                        fontSize: '10px',
                        color: '#cccccc',
                        lineBreak: 'anywhere',
                        wordBreak: 'normal',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        fontFamily:
                            'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
                        fontWeight: '100',
                    }}
                >
                    <a
                        href="https://soundcloud.com/suricolbert"
                        title="suri"
                        target="_blank"
                        style={{ color: '#cccccc', textDecoration: 'none' }}
                    >
                        suri
                    </a>{' '}
                    ·{' '}
                    <a
                        href="https://soundcloud.com/suricolbert/sets/lofi-4-studying"
                        title="lofi 4 studying"
                        target="_blank"
                        style={{ color: '#cccccc', textDecoration: 'none' }}
                    >
                        lofi 4 studying
                    </a>
                </div>
            </main>
            <footer>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    &copy; Made By Avaneesh Kumar
                </a>
            </footer>

            <style jsx>{`
                .container {
                    min-height: 100vh;
                    padding: 0 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .reminder-parent {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding-bottom: 2rem;
                    border-bottom: 3px solid #efefef;
                }

                .subtitle {
                    margin: 0;
                    margin-top: 2rem;
                    font-size: 1.8em;
                }

                .pomodoro {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding-bottom: 2rem;
                    width: 100%;
                    border-bottom: 3px solid #efefef;
                }

                .pomodoro-time {
                    font-size: 3em;
                    margin: 0;
                }

                .controls {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    margin-top: 2rem;
                    margin-bottom: 2rem;
                }
                .pomodoro-btn {
                    border: none;
                    outline: none;
                    margin-left: 2rem;
                    margin-right: 2rem;
                    height: 40px;
                    border-radius: 4px;
                    font-weight: 600;
                    font-size: 1.05em;
                    padding-left: 2rem;
                    padding-right: 2rem;
                    background-color: #0070f3;
                    color: #fff;
                }

                .pomodoro-btn:hover {
                    background-color: #0064da;
                    cursor: pointer;
                }
                .no-items {
                    color: red;
                    margin: 0;
                    margin-top: 1rem;
                    font-size: 1.4em;
                }
                .reminder-form {
                    display: flex;
                    flex-direction: column;
                    width: 45%;
                }

                .item-list {
                    width: 60%;
                    min-height: 40vh;
                    max-height: 70vh;

                    overflow: scroll;
                    border: 1px solid #dedede;
                    box-shadow: 0px 0px 2px 1px #dedede;
                    padding-top: 0;
                    margin-top: 2rem;
                    border-radius: 8px;
                }

                .reminder-input {
                    padding-left: 1rem;
                    height: 40px;
                    border: none;
                    outline: none;
                    border-radius: 3px;
                    font-size: 1em;
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                    box-shadow: 0px 0px 2px 2px #ededed;
                }

                .reminder-btn {
                    margin-top: 1rem;
                    outline: none;
                    border: none;
                    height: 40px;
                    font-size: 1.05em;
                    font-weight: 600;
                    border-radius: 4px;
                    background-color: #0070f3;
                    color: #fff;
                }

                .reminder-btn:hover {
                    background-color: #0064da;
                    cursor: pointer;
                }
                main {
                    padding: 5rem 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                footer {
                    width: 100%;
                    height: 100px;
                    border-top: 1px solid #eaeaea;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                footer img {
                    margin-left: 0.5rem;
                }

                footer a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                a {
                    color: inherit;
                    text-decoration: none;
                }

                .title a {
                    color: #0070f3;
                    text-decoration: none;
                }

                .title a:hover,
                .title a:focus,
                .title a:active {
                    text-decoration: underline;
                }

                .title {
                    margin: 0;
                    line-height: 1.15;
                    font-size: 4rem;
                }

                .title,
                .description {
                    text-align: center;
                }

                .description {
                    line-height: 1.5;
                    font-size: 1.5rem;
                }

                code {
                    background: #fafafa;
                    border-radius: 5px;
                    padding: 0.75rem;
                    font-size: 1.1rem;
                    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                        DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
                        monospace;
                }

                .grid {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;

                    max-width: 800px;
                    margin-top: 3rem;
                }

                .card {
                    margin: 1rem;
                    flex-basis: 45%;
                    padding: 1.5rem;
                    text-align: left;
                    color: inherit;
                    text-decoration: none;
                    border: 1px solid #eaeaea;
                    border-radius: 10px;
                    transition: color 0.15s ease, border-color 0.15s ease;
                }

                .card:hover,
                .card:focus,
                .card:active {
                    color: #0070f3;
                    border-color: #0070f3;
                }

                .card h3 {
                    margin: 0 0 1rem 0;
                    font-size: 1.5rem;
                }

                .card p {
                    margin: 0;
                    font-size: 1.25rem;
                    line-height: 1.5;
                }

                .logo {
                    height: 1em;
                }

                @media (max-width: 600px) {
                    .grid {
                        width: 100%;
                        flex-direction: column;
                    }
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    )
}
