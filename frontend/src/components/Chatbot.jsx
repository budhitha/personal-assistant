import React, {useState, useRef, useEffect} from "react";
import axios from "axios";

export default function Chatbot() {
    const [messages, setMessages] = useState([
        {sender: "bot", text: "Hi! How can I help you today?"},
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = {sender: "user", text: input};
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);
        setInput("");

        try {
            const res = await axios.post("/api/chat", {message: userMessage.text});
            setMessages((prev) => [
                ...prev,
                {sender: "bot", text: res.data.reply || "No reply."},
            ]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {sender: "bot", text: "Error: Could not get response."},
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages, loading]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col h-[600px]">
                <div className="flex-1 overflow-y-auto mb-4 space-y-2">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`px-4 py-2 rounded-2xl max-w-[80%] break-words ${
                                    msg.sender === "user"
                                        ? "bg-blue-500 text-white rounded-br-none"
                                        : "bg-gray-200 text-gray-900 rounded-bl-none"
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start items-center space-x-2">
                            <span
                                className="animate-spin inline-block w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full"></span>
                            <span className="text-gray-500 text-sm">Assistant is thinking…</span>
                        </div>
                    )}
                    <div ref={messagesEndRef}/>
                </div>
                <form onSubmit={sendMessage} className="flex gap-2">
                    <input
                        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message…"
                        disabled={loading}
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className={`px-4 py-2 rounded-full bg-blue-500 text-white font-semibold transition ${
                            loading || !input.trim()
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-blue-600"
                        }`}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}