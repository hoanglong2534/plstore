import React, { useState, useEffect, useRef } from 'react';
import './GlobalAIChatbot.css';

function GlobalAIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Xin chào! Tôi là AI Assistant của PL Store. Tôi có thể giúp bạn:\n\n🤖 Trả lời mọi câu hỏi\n📱 Tư vấn sản phẩm điện thoại\n💰 So sánh giá cả\n🔍 Tìm kiếm thông tin\n💡 Đưa ra gợi ý mua sắm\n\nBạn muốn hỏi gì?",
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

    // Enhanced AI response với OpenAI/Gemini integration
    const getAIResponse = async (userMessage) => {
        setIsTyping(true);
        
        try {
            // Call backend AI API
            const response = await fetch('http://localhost:4000/genai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: userMessage,
                    temperature: 0.7,
                    maxOutputTokens: 1024
                })
            });

            if (!response.ok) {
                throw new Error('API call failed');
            }

            const data = await response.json();
            return data?.data?.text || data?.data?.raw?.text ||
                (data?.data?.raw?.candidates && data.data.raw.candidates.map(c=>c.output||'').join('\n')) ||
                'Xin lỗi, tôi chưa nhận được phản hồi từ AI.';
            
        } catch (error) {
            console.error('AI API Error:', error);
            
            // Fallback to enhanced local responses
            return getEnhancedLocalResponse(userMessage);
        } finally {
            setIsTyping(false);
        }
    };

    // Enhanced local responses (fallback)
    const getEnhancedLocalResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();
        
        // General knowledge questions
        if (lowerMessage.includes('thời tiết') || lowerMessage.includes('weather')) {
            return `🌤️ Tôi không thể cung cấp thông tin thời tiết thời gian thực, nhưng bạn có thể:\n\n• Kiểm tra ứng dụng thời tiết trên điện thoại\n• Hỏi Google Assistant hoặc Siri\n• Truy cập trang web thời tiết\n\nTôi có thể giúp bạn tìm điện thoại có ứng dụng thời tiết tốt! 📱`;
        }
        
        if (lowerMessage.includes('giờ') || lowerMessage.includes('time')) {
            const now = new Date();
            return `🕐 Hiện tại là ${now.toLocaleTimeString('vi-VN')} ngày ${now.toLocaleDateString('vi-VN')}\n\nBạn có cần điện thoại có đồng hồ đẹp không? Tôi có thể gợi ý! ⏰`;
        }
        
        if (lowerMessage.includes('học') || lowerMessage.includes('study') || lowerMessage.includes('học tập')) {
            return `📚 Tôi có thể giúp bạn tìm điện thoại phù hợp cho việc học tập:\n\n📱 **Điện thoại học tập tốt:**\n• iPhone SE - Compact, hiệu năng tốt\n• Samsung Galaxy A54 - Màn hình lớn, pin tốt\n• Xiaomi Redmi Note 12 - Giá rẻ, đầy đủ tính năng\n\n💡 **Tính năng hữu ích:**\n• Màn hình lớn để đọc sách\n• Pin tốt để học cả ngày\n• Camera tốt để chụp bài giảng\n• Bộ nhớ lớn để lưu tài liệu\n\nBạn học ngành gì? Tôi sẽ gợi ý phù hợp! 🎓`;
        }
        
        if (lowerMessage.includes('làm việc') || lowerMessage.includes('work') || lowerMessage.includes('công việc')) {
            return `💼 Để làm việc hiệu quả, bạn cần điện thoại có:\n\n📱 **Điện thoại làm việc tốt:**\n• iPhone 15 Pro - Hiệu năng cao, camera chuyên nghiệp\n• Samsung Galaxy S23 Ultra - S Pen, đa nhiệm tốt\n• Google Pixel 8 Pro - AI tích hợp, camera xuất sắc\n\n💼 **Tính năng quan trọng:**\n• Email, calendar tích hợp\n• Video call chất lượng cao\n• Chụp ảnh tài liệu rõ nét\n• Pin cả ngày\n• Bảo mật cao\n\nBạn làm nghề gì? Tôi sẽ tư vấn cụ thể! 🏢`;
        }
        
        if (lowerMessage.includes('chơi game') || lowerMessage.includes('gaming')) {
            return `🎮 Điện thoại gaming tốt nhất:\n\n📱 **Top Gaming Phones:**\n• iPhone 15 Pro Max - Chip A17 Pro mạnh nhất\n• Samsung Galaxy S23 Ultra - Snapdragon 8 Gen 2\n• ASUS ROG Phone 7 - Chuyên gaming\n• Xiaomi Black Shark 5 Pro - Giá tốt\n\n🎯 **Tính năng gaming:**\n• Chip xử lý mạnh\n• RAM lớn (8GB+)\n• Màn hình 120Hz+\n• Pin lớn\n• Tản nhiệt tốt\n• Âm thanh stereo\n\nBạn chơi game gì? PUBG, Mobile Legends, hay game khác? 🕹️`;
        }
        
        if (lowerMessage.includes('chụp ảnh') || lowerMessage.includes('camera') || lowerMessage.includes('photo')) {
            return `📸 Điện thoại camera tốt nhất:\n\n📱 **Top Camera Phones:**\n• iPhone 15 Pro Max - Camera 48MP, zoom 5x\n• Samsung Galaxy S23 Ultra - Camera 200MP\n• Google Pixel 8 Pro - AI Magic Eraser\n• Xiaomi 13 Ultra - Leica camera\n\n📷 **Tính năng camera:**\n• Chụp đêm xuất sắc\n• Zoom quang học\n• Video 4K/8K\n• Chế độ chuyên nghiệp\n• AI scene detection\n\nBạn thích chụp gì? Chân dung, phong cảnh, hay macro? 🌅`;
        }
        
        if (lowerMessage.includes('pin') || lowerMessage.includes('battery')) {
            return `🔋 Điện thoại pin tốt nhất:\n\n📱 **Top Battery Life:**\n• Samsung Galaxy S23 Ultra - 5000mAh\n• iPhone 15 Plus - Pin cả ngày\n• Xiaomi Redmi Note 12 - 5000mAh giá rẻ\n• OnePlus 11 - Sạc nhanh 100W\n\n⚡ **Tính năng pin:**\n• Dung lượng lớn (4000mAh+)\n• Sạc nhanh (30W+)\n• Sạc không dây\n• Tiết kiệm điện\n• Reverse charging\n\nBạn cần pin dùng được bao lâu? 1 ngày hay nhiều hơn? ⏰`;
        }
        
        if (lowerMessage.includes('giá rẻ') || lowerMessage.includes('budget') || lowerMessage.includes('tiết kiệm')) {
            return `💰 Điện thoại giá rẻ tốt nhất:\n\n📱 **Budget Phones:**\n• Xiaomi Redmi Note 12 - 4.290.000đ\n• Samsung Galaxy A14 - 3.990.000đ\n• iPhone SE (2022) - 9.990.000đ\n• Realme C55 - 3.490.000đ\n\n💡 **Lời khuyên:**\n• Dưới 5tr: Xiaomi, Realme\n• 5-10tr: Samsung A series\n• 10-15tr: iPhone SE, Samsung S\n• Trên 15tr: Flagship models\n\nBạn có ngân sách bao nhiêu? Tôi sẽ gợi ý phù hợp! 💸`;
        }
        
        if (lowerMessage.includes('so sánh') || lowerMessage.includes('compare')) {
            return `📊 Tôi có thể so sánh điện thoại cho bạn!\n\n🔍 **Hãy cho tôi biết:**\n• 2-3 điện thoại bạn muốn so sánh\n• Tiêu chí quan trọng (giá, camera, pin, hiệu năng)\n• Ngân sách của bạn\n\n📈 **Tôi sẽ so sánh:**\n• Giá cả\n• Thông số kỹ thuật\n• Camera\n• Pin\n• Hiệu năng\n• Tính năng đặc biệt\n\nVí dụ: "So sánh iPhone 15 Pro và Galaxy S23 Ultra" 📱`;
        }
        
        if (lowerMessage.includes('khuyến mãi') || lowerMessage.includes('sale') || lowerMessage.includes('giảm giá')) {
            return `🎉 Thông tin khuyến mãi hiện tại:\n\n💰 **Khuyến mãi đang diễn ra:**\n• iPhone 15 series - Giảm đến 2 triệu\n• Samsung Galaxy S23 - Tặng Galaxy Buds\n• Xiaomi Redmi Note 12 - Giảm 500k\n• Accessories - Giảm 30%\n\n🎁 **Ưu đãi đặc biệt:**\n• Trả góp 0% lãi suất\n• Tặng phụ kiện\n• Bảo hành mở rộng\n• Đổi cũ lấy mới\n\nBạn quan tâm sản phẩm nào? Tôi sẽ kiểm tra khuyến mãi cụ thể! 🛒`;
        }
        
        // Default response for unknown questions
        return `🤖 Tôi hiểu bạn đang hỏi về "${userMessage}". 

Để tôi có thể hỗ trợ tốt nhất, bạn có thể hỏi về:

📱 **Sản phẩm:** iPhone, Samsung, Xiaomi, Google Pixel...
💰 **Giá cả:** Dưới 5tr, 5-10tr, 10-20tr, trên 20tr...
🔍 **Tính năng:** Camera, pin, hiệu năng, gaming...
📊 **So sánh:** Giữa các sản phẩm
🎯 **Mục đích:** Học tập, làm việc, chụp ảnh, gaming...
🎉 **Khuyến mãi:** Sale, giảm giá, trả góp...

Hoặc bạn có thể hỏi bất kỳ câu hỏi nào khác! Tôi sẽ cố gắng trả lời tốt nhất có thể! 😊`;
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
        "Điện thoại nào tốt nhất?",
        "So sánh iPhone và Samsung",
        "Điện thoại nào pin tốt?",
        "Camera nào chụp đêm tốt?",
        "Điện thoại gaming tốt nhất?",
        "Khuyến mãi gì đang có?"
    ];

    return (
        <div className={`global-ai-chatbot ${isOpen ? 'open' : ''}`}>
            {/* Chat Button */}
            <button 
                className="chat-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="chat-icon">🤖</span>
                <span className="chat-text">AI Assistant</span>
                <span className="chat-badge">NEW</span>
            </button>

            {/* Chat Window */}
            <div className="chat-window">
                <div className="chat-header">
                    <div className="bot-info">
                        <div className="bot-avatar">🤖</div>
                        <div className="bot-details">
                            <h3>AI Assistant</h3>
                            <span className="status">Luôn sẵn sàng</span>
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
                        placeholder="Hỏi tôi bất kỳ điều gì..."
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

export default GlobalAIChatbot;
