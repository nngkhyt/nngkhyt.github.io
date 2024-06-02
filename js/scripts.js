function filterNewsByTag(tag) {
    var newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(function(item) {
        if (tag === 'All' || item.getAttribute('data-tags').includes(tag)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function filterNewsByDate(date) {
    var newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(function(item) {
        if (item.getAttribute('data-date').startsWith(date)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
