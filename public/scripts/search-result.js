document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const tag = params.get('tag');

  if (tag) {
      // 가상 데이터베이스에서 태그 검색
      const posts = JSON.parse(localStorage.getItem('posts')) || []; // 게시물 데이터 로컬스토리지에 저장했다고 가정
      const filteredPosts = posts.filter(post => post.tags.includes(tag));

      const resultContainer = document.querySelector('#search-result-container');
      if (filteredPosts.length > 0) {
          filteredPosts.forEach(post => {
              const postElement = document.createElement('div');
              postElement.className = 'post';
              postElement.innerHTML = `
                  <h3>${post.title}</h3>
                  <p>${post.description}</p>
                  <p>태그: ${post.tags.join(', ')}</p>
              `;
              resultContainer.appendChild(postElement);
          });
      } else {
          resultContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
      }
  }
});
