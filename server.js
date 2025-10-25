const express = require('express');
const path = require('path');
const fetch = require('node-fetch'); // Yeni ekledik
const app = express();
const port = 3000; // Frontend 3000'de çalışıyor
const backend_url = 'http://localhost:4000'; // Backend adresimiz

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Ana Sayfa Route
app.get('/', async (req, res) => {
    try {
        // Backend'den verileri çek (limit kullanarak)
        const productsRes = await fetch(`${backend_url}/products?_limit=8`);
        const products = await productsRes.json();
        
        const discountRes = await fetch(`${backend_url}/products?_limit=4`);
        const discountProducts = await discountRes.json();
        
        // Verileri EJS'ye yolla
        res.render('home', { 
            title: 'Ana Sayfa',
            products: products, // home.ejs'de 'products' değişkeni
            discountProducts: discountProducts // home.ejs'de 'discountProducts' değişkeni
        });
    } catch (error) {
        console.error("Ana sayfa verisi alınamadı:", error);
        res.status(500).send("Sunucu Hatası");
    }
});

// Ürünler Sayfası Route
app.get('/products', async (req, res) => {
     try {
        const productsRes = await fetch(`${backend_url}/products?_limit=9`);
        const products = await productsRes.json();
        
        res.render('productsPage', { 
            title: 'Ürünler',
            products: products // productsPage.ejs'de 'products' değişkeni
        });
    } catch (error) {
        console.error("Ürünler sayfası verisi alınamadı:", error);
        res.status(500).send("Sunucu Hatası");
    }
});

// Ürün Detay Sayfası Route
app.get('/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        
        // Ana ürünü ID ile çek
        const productRes = await fetch(`${backend_url}/products/${productId}`);
        const product = await productRes.json();

        // İlgili ürünleri çek (limit 4)
        const relatedRes = await fetch(`${backend_url}/products?_limit=4`);
        const relatedProducts = await relatedRes.json();

        res.render('productDetails', { 
            title: product.title || 'Ürün Detayı',
            product: product, // 'product' objesi
            relatedProducts: relatedProducts // 'relatedProducts' dizisi
        });
    } catch (error) {
        console.error("Ürün detayı alınamadı:", error);
        res.status(500).send("Sunucu Hatası");
    }
});

// Diğer statik sayfalar (Sepet, Adımlar)
app.get('/cart', (req, res) => {
    res.render('shoppingCart', { title: 'Alışveriş Sepeti' });
});
app.get('/step1', (req, res) => {
    res.render('step1', { title: 'Adres - Adım 1' });
});
app.get('/step2', (req, res) => {
    res.render('step2', { title: 'Gönderim - Adım 2' });
});
app.get('/step3', (req, res) => {
    res.render('step3', { title: 'Ödeme - Adım 3' });
});
app.get('/products/filters', (req, res) => {
    res.render('productPageFilters', { title: 'Filtreler' });
});

// Yönlendirmeler
app.get('/Home.html', (req, res) => res.redirect('/'));
app.get('/ProductsPage.html', (req, res) => res.redirect('/products'));
app.get('/ProductDetails.html', (req, res) => res.redirect('/product/1'));
app.get('/ShoppingCart.html', (req, res) => res.redirect('/cart'));
app.get('/Step1.html', (req, res) => res.redirect('/step1'));
app.get('/Step2.html', (req, res) => res.redirect('/step2'));
app.get('/Step3.html', (req, res) => res.redirect('/step3'));
app.get('/ProductPageFilters.html', (req, res) => res.redirect('/products/filters'));


app.listen(port, () => {
    console.log(`Frontend sunucusu http://localhost:${port} adresinde çalışıyor`);
    console.log(`Backend sunucusunun http://localhost:4000 adresinde çalıştığından emin olun.`);
});