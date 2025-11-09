import React, { useState, useEffect, useRef } from 'react';
import './AIChatbot.css';

function AIChatbot({ products = [] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Xin chào! Tôi là AI Assistant của PL Store. Tôi có thể giúp bạn tìm hiểu về các sản phẩm điện thoại, so sánh tính năng, và đưa ra gợi ý phù hợp. Bạn muốn hỏi gì?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Real AI responses using server-side GenAI proxy
    const getAIResponse = async (userMessage) => {
        setIsTyping(true);
        try {
            const resp = await fetch('http://localhost:4000/genai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userMessage })
            });

            const json = await resp.json();
            // Try to extract a sensible text field from responses
            const aiText = json?.data?.text || json?.data?.raw?.text ||
                (json?.data?.raw?.candidates && json.data.raw.candidates.map(c=>c.output||'').join('\n')) ||
                'Xin lỗi, tôi chưa nhận được phản hồi từ AI.';

            return aiText;
        } catch (err) {
            console.error('AI fetch error', err);
            return 'Lỗi khi gọi AI, thử lại sau.';
        } finally {
            setIsTyping(false);
        }
    };

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');

        const botResponse = await getAIResponse(inputText);
        
        const botMessage = {
            id: Date.now() + 1,
            text: botResponse,
            sender: 'bot',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const quickQuestions = [
        "iPhone nào tốt nhất?",
        "So sánh Samsung và iPhone",
        "Điện thoại nào pin tốt?",
        "Camera nào chụp đêm tốt?"
    ];

    return (
        <div className={`ai-chatbot ${isOpen ? 'open' : ''}`}>
            {/* Chat Button */}
            <button 
                className="chat-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="chat-icon">🤖</span>
                <span className="chat-text">AI Assistant</span>
            </button>

            {/* Chat Window */}
            <div className="chat-window">
                <div className="chat-header">
                    <div className="bot-info">
                        <div className="bot-avatar">🤖</div>
                        <div className="bot-details">
                            <h3>AI Assistant</h3>
                            <span className="status">Đang hoạt động</span>
                        </div>
                    </div>
                    <button 
                        className="close-btn"
                        onClick={() => setIsOpen(false)}
                    >
                        ✕
                    </button>
                </div>

                <div className="chat-messages">
                    {messages.map((message) => (
                        <div 
                            key={message.id} 
                            className={`message ${message.sender}`}
                        >
                            <div className="message-content">
                                <div className="message-text">
                                    {message.text.split('\n').map((line, index) => (
                                        <div key={index}>
                                            {line}
                                            {index < message.text.split('\n').length - 1 && <br />}
                                        </div>
                                    ))}
                                </div>
                                <div className="message-time">
                                    {message.timestamp.toLocaleTimeString('vi-VN', { 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="message bot">
                            <div className="message-content">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                {messages.length === 1 && (
                    <div className="quick-questions">
                        <h4>Câu hỏi thường gặp:</h4>
                        <div className="question-buttons">
                            {quickQuestions.map((question, index) => (
                                <button 
                                    key={index}
                                    className="question-btn"
                                    onClick={() => setInputText(question)}
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="chat-input">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Nhập câu hỏi của bạn..."
                        className="message-input"
                    />
                    <button 
                        onClick={handleSendMessage}
                        className="send-btn"
                        disabled={!inputText.trim()}
                    >
                        <span>📤</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AIChatbot;
