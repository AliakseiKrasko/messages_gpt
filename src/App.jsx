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

    const sendMessage = async () => {
        if (!input) return

        const newMessages = [...messages, {role: 'user', content: input}]
        setMessages(newMessages)
        setInput('')
        setLoading(true)

        try {
            const res = await fetch("http://localhost:3001/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messages: newMessages }),
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
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message, i) => (
                    <div key={i} className={`mb-2 p-3 rounded-lg max-w-lg ${
                        message.role === 'user'
                            ? 'bg-blue-500 text-white ml-auto'
                            : 'bg-gray-300 text-black mr-auto'
                    }`}>
                        {message.content}
                    </div>
                ))}
                {loading && <p className='italic text-gray-500'>Loading...</p>}
            </div>
            <div className="p-4 bg-white flex gap-2 border-t">
                <input
                    type="text"
                    className='flex-1 border rounded-lg px-3 py-2'
                    placeholder='Write your answer'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    disabled={loading}
                    className='bg-green-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400'
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default App
