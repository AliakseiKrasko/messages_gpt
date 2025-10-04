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

    const savedMessages = async () => {
        if (!input) return

        const newMessages = [...messages, { role: 'user', content: input }]
        setMessages(newMessages)
        setInput('')
        setLoading(true)

        try {
            const res = await fetch('http://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer YOUR_API`,
                },
                body: JSON.stringify({
                    model: 'gpt-5-Instant',
                    messages: newMessages,
                })
            })
            const data = await res.json()
            console.log(data)
            const reply = data.choices[0].message
            setMessages((prev => [...prev, reply]))
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}

export default App
