document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('search-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('search-query').value;
        fetchNews(query);
    });
});

function fetchNews(query = '') {
    fetch(`/news?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            displayNews(data.articles);
        })
        .catch(error => console.error('Error fetching news:', error));
}


// This would remain the same, simply update the displayNews function to output card-style layout.
function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = articles.map(article => `
      <div class="news-item">
        <img src="${article.urlToImage}" alt="${article.title}">
        <div class="news-item-content">
          <h2 class="news-item-title">${article.title}</h2>
          <p class="news-item-description">${article.description}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        </div>
      </div>
    `).join('');
  }
  
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    fetchNews();
  });
  
  function fetchNews() {
    const query = document.getElementById('search-query').value;
    const from = document.getElementById('search-from').value;
    const to = document.getElementById('search-to').value;
    const language = document.getElementById('search-language').value;
    const sortBy = document.getElementById('search-sortby').value;
    const bias = document.getElementById('search-bias').value;

    
  
    let url = '/news?';
    url += query ? `q=${encodeURIComponent(query)}&` : '';
    url += from ? `from=${encodeURIComponent(from)}&` : '';
    url += to ? `to=${encodeURIComponent(to)}&` : '';
    url += language ? `language=${encodeURIComponent(language)}&` : '';
    url += sortBy ? `sortBy=${encodeURIComponent(sortBy)}` : '';
    url += bias ? `bias=${encodeURIComponent(bias)}&` : '';
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayNews(data.articles);
      })
      .catch(error => console.error('Error fetching news:', error));
  }
  