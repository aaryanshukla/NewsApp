document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('search-form');
  form.addEventListener('submit', function(event) {
      event.preventDefault();
      fetchNews();
  });
  
  // Fetch breaking and top news on page load
  fetchBreakingNews();
  fetchTopStories();
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
  url += sortBy ? `sortBy=${encodeURIComponent(sortBy)}&` : ''; // Fixed missing '&' at the end
  url += bias ? `bias=${encodeURIComponent(bias)}&` : ''; // Fixed missing '&' at the end

  fetch(url)
      .then(response => response.json())
      .then(data => {
          if (data && data.articles) {
              displayNews(data.articles);
          } else {
              console.error('No articles returned from the API:', data);
              newsContainer.innerHTML = '<p>No news articles found. Try a different search.</p>';
          }
      })
      .catch(error => {
          console.error('Error fetching news:', error);
          newsContainer.innerHTML = '<p>Error fetching news. Please try again later.</p>';
      });
}

ffunction displayNews(articles, containerId) {
  const newsContainer = document.getElementById(containerId);
  if (articles.length === 0) {
      newsContainer.innerHTML = '<p>No news articles found. Try a different search.</p>';
      return;
  }
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

function fetchBreakingNews() {
  // Placeholder URL, replace with your actual API endpoint for breaking news
  let url = '/news?category=breaking';

  fetch(url)
      .then(response => response.json())
      .then(data => {
          if (data && data.articles) {
              displayNews(data.articles, 'breaking-news-container');
          } else {
              console.error('No breaking news articles returned from the API:', data);
          }
      })
      .catch(error => {
          console.error('Error fetching breaking news:', error);
      });
}

function fetchTopStories() {
  // Placeholder URL, replace with your actual API endpoint for top stories
  let url = '/news?category=top';

  fetch(url)
      .then(response => response.json())
      .then(data => {
          if (data && data.articles) {
              displayNews(data.articles, 'top-stories-container');
          } else {
              console.error('No top stories articles returned from the API:', data);
          }
      })
      .catch(error => {
          console.error('Error fetching top stories:', error);
      });
}