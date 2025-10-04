import {useEffect, useState} from "react";


function App() {
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('savedMessages')
        return saved ? JSON.parse(saved) : []
    })
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        localStorage.setItem('savedMessages', JSON.stringify(messages))
    }, [messages])

    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}

export default App
