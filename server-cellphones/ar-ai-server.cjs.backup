const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const OpenAI = require('openai');
const { data } = require('./data.js');

const app = express();
const PORT = process.env.PORT || 4000;

// Initialize OpenAI với API key thực tế
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-proj-your-actual-openai-key-here'
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/plstore_ar_ai', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Schemas
const ProductSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
    description: String,
    specifications: Object,
    arModel: String, // URL to 3D model
    vrModel: String, // URL to VR model
    images: [String],
    category: String,
    features: [String],
    createdAt: { type: Date, default: Date.now }
});

const ChatSchema = new mongoose.Schema({
    sessionId: String,
    messages: [{
        role: String, // 'user' or 'assistant'
        content: String,
        timestamp: { type: Date, default: Date.now }
    }],
    productContext: String, // Product ID being discussed
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', ProductSchema);
const Chat = mongoose.model('Chat', ChatSchema);

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'public/uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Routes

// Product Routes - Sử dụng data thực tế
app.get('/api/products', async (req, res) => {
    try {
        // Sử dụng data từ data.js thay vì MongoDB
        const products = data.products.map(product => ({
            ...product,
            specifications: getProductSpecifications(product.name),
            features: getProductFeatures(product.name),
            arModel: getARModelUrl(product.name),
            vrModel: getVRModelUrl(product.name)
        }));
        
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = data.products.find(p => p.id === productId);
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        // Thêm thông số kỹ thuật chi tiết
        const enhancedProduct = {
            ...product,
            specifications: getProductSpecifications(product.name),
            features: getProductFeatures(product.name),
            arModel: getARModelUrl(product.name),
            vrModel: getVRModelUrl(product.name),
            detailedSpecs: getDetailedSpecifications(product.name)
        };
        
        res.json(enhancedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Helper functions để lấy thông số kỹ thuật chi tiết
function getProductSpecifications(productName) {
    const specs = {
        "iPhone 12 Pro Max 128GB": {
            "Màn hình": "6.7 inch Super Retina XDR OLED",
            "Chip": "A14 Bionic",
            "Camera": "12MP + 12MP + 12MP + LiDAR",
            "Pin": "3687 mAh",
            "RAM": "6GB",
            "Bộ nhớ": "128GB",
            "Hệ điều hành": "iOS 14",
            "Kết nối": "5G, WiFi 6, Bluetooth 5.0",
            "Chống nước": "IP68",
            "Kích thước": "160.8 x 78.1 x 7.4 mm",
            "Trọng lượng": "228g"
        },
        "iPhone XR 128GB": {
            "Màn hình": "6.1 inch Liquid Retina LCD",
            "Chip": "A12 Bionic",
            "Camera": "12MP",
            "Pin": "2942 mAh",
            "RAM": "3GB",
            "Bộ nhớ": "128GB",
            "Hệ điều hành": "iOS 12",
            "Kết nối": "4G LTE, WiFi 802.11ac, Bluetooth 5.0",
            "Chống nước": "IP67",
            "Kích thước": "150.9 x 75.7 x 8.3 mm",
            "Trọng lượng": "194g"
        },
        "Samsung Galaxy S21 Ultra 5G 128GB": {
            "Màn hình": "6.8 inch Dynamic AMOLED 2X",
            "Chip": "Exynos 2100",
            "Camera": "108MP + 12MP + 10MP + 10MP",
            "Pin": "5000 mAh",
            "RAM": "12GB",
            "Bộ nhớ": "128GB",
            "Hệ điều hành": "Android 11",
            "Kết nối": "5G, WiFi 6E, Bluetooth 5.2",
            "Chống nước": "IP68",
            "Kích thước": "165.1 x 75.6 x 8.9 mm",
            "Trọng lượng": "229g"
        }
    };
    
    return specs[productName] || {
        "Màn hình": "Đang cập nhật",
        "Chip": "Đang cập nhật",
        "Camera": "Đang cập nhật",
        "Pin": "Đang cập nhật",
        "RAM": "Đang cập nhật",
        "Bộ nhớ": "Đang cập nhật",
        "Hệ điều hành": "Đang cập nhật",
        "Kết nối": "Đang cập nhật"
    };
}

function getProductFeatures(productName) {
    const features = {
        "iPhone 12 Pro Max 128GB": [
            "Face ID bảo mật cao",
            "MagSafe sạc không dây",
            "Dolby Vision HDR",
            "Spatial Audio",
            "LiDAR Scanner",
            "Night Mode",
            "ProRAW",
            "5G Ultra Wideband"
        ],
        "iPhone XR 128GB": [
            "Face ID",
            "Wireless Charging",
            "TrueDepth Camera",
            "Portrait Mode",
            "Smart HDR",
            "A12 Bionic Neural Engine",
            "Liquid Retina Display",
            "Spatial Audio"
        ],
        "Samsung Galaxy S21 Ultra 5G 128GB": [
            "S Pen Support",
            "100x Space Zoom",
            "8K Video Recording",
            "120Hz Adaptive Refresh Rate",
            "Wireless PowerShare",
            "Samsung DeX",
            "Bixby Voice Assistant",
            "Samsung Pay"
        ]
    };
    
    return features[productName] || [
        "Tính năng đang cập nhật",
        "Bảo hành chính hãng",
        "Hỗ trợ 24/7"
    ];
}

function getDetailedSpecifications(productName) {
    return {
        display: getProductSpecifications(productName),
        performance: {
            "CPU": "Đang cập nhật",
            "GPU": "Đang cập nhật",
            "Neural Engine": "Đang cập nhật"
        },
        camera: {
            "Main Camera": "Đang cập nhật",
            "Front Camera": "Đang cập nhật",
            "Video Recording": "Đang cập nhật",
            "Camera Features": "Đang cập nhật"
        },
        connectivity: {
            "5G": "Có",
            "WiFi": "WiFi 6",
            "Bluetooth": "5.0+",
            "NFC": "Có",
            "GPS": "Có"
        }
    };
}

function getARModelUrl(productName) {
    return `/models/ar/${productName.toLowerCase().replace(/\s+/g, '-')}.glb`;
}

function getVRModelUrl(productName) {
    return `/models/vr/${productName.toLowerCase().replace(/\s+/g, '-')}.glb`;
}

// AR/VR Routes
app.get('/api/ar-model/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        // Return AR model data
        const arData = {
            productId: product._id,
            productName: product.name,
            modelUrl: product.arModel,
            components: product.specifications?.components || [],
            textures: product.specifications?.textures || [],
            animations: product.specifications?.animations || []
        };
        
        res.json(arData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/vr-model/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        // Return VR model data
        const vrData = {
            productId: product._id,
            productName: product.name,
            modelUrl: product.vrModel,
            environment: 'showroom', // or 'home', 'office'
            lighting: 'studio',
            interactions: ['rotate', 'zoom', 'explode', 'highlight']
        };
        
        res.json(vrData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Upload 3D models
app.post('/api/upload-model', upload.single('model'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        const fileUrl = `/uploads/${req.file.filename}`;
        res.json({ 
            success: true, 
            fileUrl: fileUrl,
            filename: req.file.filename 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// AI Chatbot Routes
app.post('/api/chat', async (req, res) => {
    try {
        const { sessionId, message, productContext } = req.body;
        
        // Find or create chat session
        let chat = await Chat.findOne({ sessionId });
        if (!chat) {
            chat = new Chat({ 
                sessionId, 
                messages: [],
                productContext 
            });
        }
        
        // Add user message
        chat.messages.push({
            role: 'user',
            content: message
        });
        
        // Generate AI response (simplified - sẽ tích hợp OpenAI API)
        const aiResponse = await generateAIResponse(message, productContext);
        
        // Add AI response
        chat.messages.push({
            role: 'assistant',
            content: aiResponse
        });
        
        await chat.save();
        
        res.json({
            response: aiResponse,
            sessionId: sessionId
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/chat/:sessionId', async (req, res) => {
    try {
        const chat = await Chat.findOne({ sessionId: req.params.sessionId });
        if (!chat) {
            return res.json({ messages: [] });
        }
        res.json({ messages: chat.messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// AI Response Generation với OpenAI và data thực tế
async function generateAIResponse(message, productContext) {
    try {
        // Lấy thông tin sản phẩm từ data thực tế
        let product = null;
        if (productContext) {
            const productId = parseInt(productContext);
            product = data.products.find(p => p.id === productId);
        }

        // Tìm sản phẩm trong message nếu không có context
        if (!product) {
            const productName = findProductInMessage(message);
            if (productName) {
                product = data.products.find(p => 
                    p.name.toLowerCase().includes(productName.toLowerCase()) ||
                    productName.toLowerCase().includes(p.name.toLowerCase())
                );
            }
        }

        // Chuẩn bị context cho AI với data thực tế
        const productsList = data.products.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            salePrice: p.salePrice,
            type: p.type,
            rating: p.rating
        }));

        const systemPrompt = `Bạn là AI Assistant chuyên gia của PL Store - cửa hàng điện thoại hàng đầu Việt Nam.

DANH SÁCH SẢN PHẨM HIỆN CÓ:
${JSON.stringify(productsList, null, 2)}

THÔNG TIN SẢN PHẨM HIỆN TẠI: ${product ? JSON.stringify(product, null, 2) : 'Không có'}

NHIỆM VỤ CỦA BẠN:
- Tư vấn sản phẩm điện thoại cụ thể từ danh sách trên
- So sánh các sản phẩm với thông tin thực tế
- Đưa ra gợi ý phù hợp với ngân sách
- Trả lời câu hỏi về thông số kỹ thuật
- Hỗ trợ khách hàng mua sắm

QUY TẮC:
- Luôn sử dụng thông tin sản phẩm thực tế từ danh sách
- Trả lời bằng tiếng Việt, thân thiện và chuyên nghiệp
- Đưa ra thông tin chính xác về giá cả và tính năng
- Nếu không tìm thấy sản phẩm, gợi ý sản phẩm tương tự`;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ],
            max_tokens: 1500,
            temperature: 0.7,
        });

        return completion.choices[0].message.content;

    } catch (error) {
        console.error('OpenAI API Error:', error);
        
        // Fallback với data thực tế
        return getEnhancedResponseWithRealData(message, productContext);
    }
}

// Helper function để tìm sản phẩm trong message
function findProductInMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Tìm iPhone
    if (lowerMessage.includes('iphone')) {
        if (lowerMessage.includes('12 pro max')) return 'iPhone 12 Pro Max';
        if (lowerMessage.includes('xr')) return 'iPhone XR';
        if (lowerMessage.includes('se')) return 'iPhone SE';
        return 'iPhone';
    }
    
    // Tìm Samsung
    if (lowerMessage.includes('samsung') || lowerMessage.includes('galaxy')) {
        if (lowerMessage.includes('s21 ultra')) return 'Samsung Galaxy S21 Ultra';
        if (lowerMessage.includes('s21')) return 'Samsung Galaxy S21';
        return 'Samsung';
    }
    
    // Tìm Xiaomi
    if (lowerMessage.includes('xiaomi') || lowerMessage.includes('redmi')) {
        return 'Xiaomi';
    }
    
    return null;
}

// Enhanced response với data thực tế
async function getEnhancedResponseWithRealData(message, productContext) {
    const lowerMessage = message.toLowerCase();
    
    // Lấy thông tin sản phẩm thực tế
    let product = null;
    if (productContext) {
        const productId = parseInt(productContext);
        product = data.products.find(p => p.id === productId);
    }
    
    // Tìm sản phẩm trong message
    if (!product) {
        const productName = findProductInMessage(message);
        if (productName) {
            product = data.products.find(p => 
                p.name.toLowerCase().includes(productName.toLowerCase()) ||
                productName.toLowerCase().includes(p.name.toLowerCase())
            );
        }
    }
    
    // Trả lời cụ thể về sản phẩm
    if (product) {
        const specs = getProductSpecifications(product.name);
        const features = getProductFeatures(product.name);
        
        return `📱 **${product.name}**

💰 **Giá cả:**
• Giá gốc: ${product.price.toLocaleString('vi-VN')}đ
• Giá khuyến mãi: ${product.salePrice.toLocaleString('vi-VN')}đ
• Tiết kiệm: ${(product.price - product.salePrice).toLocaleString('vi-VN')}đ

🔧 **Thông số kỹ thuật:**
${Object.entries(specs).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

⭐ **Tính năng nổi bật:**
${features.map(feature => `• ${feature}`).join('\n')}

📊 **Đánh giá:** ${product.rating}/5 ⭐ (${product.numReviews} đánh giá)

Bạn muốn biết thêm về tính năng nào cụ thể? Hoặc so sánh với sản phẩm khác?`;
    }
    
    // Trả lời về danh sách sản phẩm
    if (lowerMessage.includes('danh sách') || lowerMessage.includes('sản phẩm') || lowerMessage.includes('có gì')) {
        const productList = data.products.map(p => 
            `• ${p.name} - ${p.salePrice.toLocaleString('vi-VN')}đ`
        ).join('\n');
        
        return `📱 **DANH SÁCH SẢN PHẨM HIỆN CÓ:**

${productList}

Bạn quan tâm sản phẩm nào? Tôi sẽ cung cấp thông tin chi tiết!`;
    }
    
    // Trả lời về giá cả
    if (lowerMessage.includes('giá') || lowerMessage.includes('price')) {
        const budgetRanges = {
            "dưới 10 triệu": data.products.filter(p => p.salePrice < 10000000),
            "10-20 triệu": data.products.filter(p => p.salePrice >= 10000000 && p.salePrice < 20000000),
            "20-30 triệu": data.products.filter(p => p.salePrice >= 20000000 && p.salePrice < 30000000),
            "trên 30 triệu": data.products.filter(p => p.salePrice >= 30000000)
        };
        
        let response = `💰 **SẢN PHẨM THEO NGÂN SÁCH:**\n\n`;
        
        Object.entries(budgetRanges).forEach(([range, products]) => {
            if (products.length > 0) {
                response += `**${range.toUpperCase()}:**\n`;
                products.forEach(p => {
                    response += `• ${p.name} - ${p.salePrice.toLocaleString('vi-VN')}đ\n`;
                });
                response += '\n';
            }
        });
        
        return response + 'Bạn có ngân sách bao nhiêu? Tôi sẽ gợi ý phù hợp!';
    }
    
    // Trả lời về iPhone
    if (lowerMessage.includes('iphone')) {
        const iphones = data.products.filter(p => p.type === 'iphone');
        let response = `🍎 **DANH SÁCH IPHONE:**\n\n`;
        
        iphones.forEach(iphone => {
            response += `📱 **${iphone.name}**\n`;
            response += `• Giá: ${iphone.salePrice.toLocaleString('vi-VN')}đ\n`;
            response += `• Đánh giá: ${iphone.rating}/5 ⭐\n\n`;
        });
        
        return response + 'Bạn quan tâm iPhone nào? Tôi sẽ cung cấp thông tin chi tiết!';
    }
    
    // Trả lời về Samsung
    if (lowerMessage.includes('samsung') || lowerMessage.includes('galaxy')) {
        const samsungs = data.products.filter(p => p.type === 'samsung');
        let response = `📱 **DANH SÁCH SAMSUNG GALAXY:**\n\n`;
        
        samsungs.forEach(samsung => {
            response += `📱 **${samsung.name}**\n`;
            response += `• Giá: ${samsung.salePrice.toLocaleString('vi-VN')}đ\n`;
            response += `• Đánh giá: ${samsung.rating}/5 ⭐\n\n`;
        });
        
        return response + 'Bạn quan tâm Galaxy nào? Tôi sẽ cung cấp thông tin chi tiết!';
    }
    
    // Default response
    return `🤖 Tôi hiểu bạn đang hỏi về "${message}". 

Để tôi có thể hỗ trợ tốt nhất, bạn có thể hỏi về:

📱 **Sản phẩm cụ thể:** iPhone 12 Pro Max, Galaxy S21 Ultra...
💰 **Ngân sách:** Dưới 10tr, 10-20tr, 20-30tr...
🔍 **So sánh:** Giữa các sản phẩm
📊 **Thông số:** Camera, pin, hiệu năng...

Hoặc bạn có thể hỏi "danh sách sản phẩm" để xem tất cả! 😊`;
}

// Enhanced local responses (fallback)
async function getEnhancedLocalResponse(message, productContext) {
    const lowerMessage = message.toLowerCase();
    
    // Get product context if available
    let product = null;
    if (productContext) {
        product = await Product.findById(productContext);
    }
    
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
    
    // Product-specific responses
    if (product) {
        return `Về sản phẩm ${product.name}:\n\n📱 **Thông tin cơ bản:**\n• Giá: ${product.price?.toLocaleString('vi-VN')}đ\n• Thương hiệu: ${product.brand}\n• Mô tả: ${product.description}\n\n🔧 **Tính năng nổi bật:**\n${product.features?.map(feature => `• ${feature}`).join('\n') || '• Đang cập nhật...'}\n\nBạn muốn biết thêm về tính năng nào cụ thể?`;
    }
    
    // Default response for unknown questions
    return `🤖 Tôi hiểu bạn đang hỏi về "${message}". 

Để tôi có thể hỗ trợ tốt nhất, bạn có thể hỏi về:

📱 **Sản phẩm:** iPhone, Samsung, Xiaomi, Google Pixel...
💰 **Giá cả:** Dưới 5tr, 5-10tr, 10-20tr, trên 20tr...
🔍 **Tính năng:** Camera, pin, hiệu năng, gaming...
📊 **So sánh:** Giữa các sản phẩm
🎯 **Mục đích:** Học tập, làm việc, chụp ảnh, gaming...
🎉 **Khuyến mãi:** Sale, giảm giá, trả góp...

Hoặc bạn có thể hỏi bất kỳ câu hỏi nào khác! Tôi sẽ cố gắng trả lời tốt nhất có thể! 😊`;
}

// Error handling middleware
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`AR/VR & AI API ready at http://localhost:${PORT}`);
});

module.exports = app;
