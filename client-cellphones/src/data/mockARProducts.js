// Mock data với một số sản phẩm có 3D models demo
export const mockProductsWithAR = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        image: "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-1-1.jpg",
        arModel: "https://modelviewer.dev/shared-assets/models/Astronaut.glb", // Demo model
        model3D: "https://modelviewer.dev/shared-assets/models/Astronaut.glb", // Demo model
        price: 29990000,
        description: "iPhone 15 Pro Max với chip A17 Pro mạnh mẽ",
        brand: "Apple",
        specs: {
            screen: "6.7 inch Super Retina XDR",
            chip: "A17 Pro",
            camera: "48MP + 12MP + 12MP",
            battery: "4441 mAh",
            storage: "256GB"
        }
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        image: "https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-grey-1-1.jpg",
        arModel: "https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb", // Demo model
        model3D: "https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb", // Demo model
        price: 27990000,
        description: "Galaxy S24 Ultra với S Pen tích hợp AI",
        brand: "Samsung",
        specs: {
            screen: "6.8 inch Dynamic AMOLED 2X",
            chip: "Snapdragon 8 Gen 3",
            camera: "200MP + 50MP + 12MP + 10MP",
            battery: "5000 mAh",
            storage: "512GB"
        }
    },
    {
        id: 3,
        name: "Google Pixel 8 Pro",
        image: "https://cdn.tgdd.vn/Products/Images/42/307533/google-pixel-8-pro-blue-1-1.jpg",
        arModel: "https://modelviewer.dev/shared-assets/models/shishkebab.glb", // Demo model
        model3D: "https://modelviewer.dev/shared-assets/models/shishkebab.glb", // Demo model
        price: 21990000,
        description: "Pixel 8 Pro với AI Photography tiên tiến",
        brand: "Google",
        specs: {
            screen: "6.7 inch LTPO OLED",
            chip: "Google Tensor G3",
            camera: "50MP + 48MP + 48MP",
            battery: "5050 mAh",
            storage: "128GB"
        }
    },
    {
        id: 4,
        name: "Xiaomi 14 Ultra",
        image: "https://cdn.tgdd.vn/Products/Images/42/320721/xiaomi-14-ultra-black-1-1.jpg",
        modelUrl: null, // Không có 3D model
        price: 23990000,
        description: "Xiaomi 14 Ultra với camera Leica",
        brand: "Xiaomi",
        specs: {
            screen: "6.73 inch LTPO AMOLED",
            chip: "Snapdragon 8 Gen 3",
            camera: "50MP + 50MP + 50MP + 50MP",
            battery: "5300 mAh",
            storage: "512GB"
        }
    },
    {
        id: 5,
        name: "OnePlus 12",
        image: "https://cdn.tgdd.vn/Products/Images/42/320158/oneplus-12-green-1-1.jpg",
        modelUrl: "https://modelviewer.dev/shared-assets/models/Horse.glb", // Demo model
        price: 18990000,
        description: "OnePlus 12 với sạc nhanh 100W",
        brand: "OnePlus",
        specs: {
            screen: "6.82 inch LTPO AMOLED",
            chip: "Snapdragon 8 Gen 3",
            camera: "50MP + 64MP + 48MP",
            battery: "5400 mAh",
            storage: "256GB"
        }
    }
];

// Helper function để get random product
export const getRandomARProduct = () => {
    const products = mockProductsWithAR.filter(p => p.modelUrl); // Chỉ lấy sản phẩm có 3D model
    return products[Math.floor(Math.random() * products.length)];
};

// Helper function để get product by ID
export const getARProductById = (id) => {
    return mockProductsWithAR.find(p => p.id === parseInt(id));
};
