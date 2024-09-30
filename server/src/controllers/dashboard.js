// src/controllers/dashboard.js
const Category = require('../models/category');
const Product = require('../models/product');
const User = require('../models/user');
const Brand = require('../models/brand');

// Get counts for Users, Products, Categories, and Brands
const getCounts = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const productCount = await Product.countDocuments();
        const categoryCount = await Category.countDocuments();
        const brandCount = await Brand.countDocuments();
        const salesCount = 0;
        const ordersCount = 0;

        res.json({
            users: { title: 'Users', count: userCount },
            products: { title: 'Products', count: productCount },
            categories: { title: 'Categories', count: categoryCount },
            brands: { title: 'Brands', count: brandCount },
            sales: { title: 'Sales', count: salesCount },
            orders: { title: 'Orders', count: ordersCount }
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching counts', error });
    }
};

module.exports = { getCounts };
