const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// EJS'i view engine olarak ayarla
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 'public' klasörünü statik dosyalar (CSS, JS, resimler) için ayarla
app.use(express.static(path.join(__dirname, 'public')));

// Sayfa Yönlendirmeleri (Routes)
app.get('/', (req, res) => {
    // EJS'ye veri gönderebilirsiniz, örn: { title: 'Ana Sayfa' }
    res.render('home', { title: 'Ana Sayfa' });
});

app.get('/products', (req, res) => {
    res.render('productsPage', { title: 'Ürünler' });
});

app.get('/products/filters', (req, res) => {
    res.render('productPageFilters', { title: 'Filtreler' });
});

// :id parametresi ile dinamik ürün detayı sayfası
app.get('/product/:id', (req, res) => {
    // ID'yi EJS'ye göndererek 'fetch' işleminin bu ID'yi kullanmasını sağlayabilirsiniz
    res.render('productDetails', { title: 'Ürün Detayı', productId: req.params.id });
});

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

// Diğer HTML sayfaları için yönlendirmeler
app.get('/Home.html', (req, res) => res.redirect('/'));
app.get('/ProductsPage.html', (req, res) => res.redirect('/products'));
app.get('/ProductDetails.html', (req, res) => res.redirect('/product/1')); // Örnek bir ID ile
app.get('/ShoppingCart.html', (req, res) => res.redirect('/cart'));
app.get('/Step1.html', (req, res) => res.redirect('/step1'));
app.get('/Step2.html', (req, res) => res.redirect('/step2'));
app.get('/Step3.html', (req, res) => res.redirect('/step3'));
app.get('/ProductPageFilters.html', (req, res) => res.redirect('/products/filters'));


app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});