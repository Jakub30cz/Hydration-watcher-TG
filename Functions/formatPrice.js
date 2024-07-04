function formatPrice(price) {
    if (price < 0.000001) {
        return price.toFixed(10);
    } else if (price < 0.001) {
        return price.toFixed(8);
    } else if (price < 0.1) {
        return price.toFixed(6);
    } else if (price < 1) {
        return price.toFixed(5);
    } else if (price < 10) {
        return price.toFixed(4);
    } else if (price < 100) {
        return price.toFixed(3);
    } else {
        return price.toFixed(2);
    }
}

module.exports = { formatPrice };