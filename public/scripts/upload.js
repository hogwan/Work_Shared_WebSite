// 사진 미리보기 및 드래그 기능
document.getElementById('file-upload').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (!file) return; // 파일이 없으면 종료

  const reader = new FileReader();
  reader.onload = function(e) {
      const previewContainer = document.getElementById('image-preview-container');
      previewContainer.innerHTML = ''; // 이전 미리보기 지우기

      const img = document.createElement('img');
      img.src = e.target.result; // 이미지 파일을 Base64로 변환
      img.alt = 'Image Preview';
      img.style.maxWidth = '100%'; // 최대 너비 100%
      img.style.maxHeight = '100%'; // 최대 높이 100%
      img.style.objectFit = 'contain'; // 이미지 비율 유지
      previewContainer.appendChild(img);

      enableDrag(img); // 이미지 드래그 기능 활성화
  };

  // 파일이 존재하면 읽기
  if (file) {
      reader.readAsDataURL(file);
  }
});

// 드래그 기능 활성화
function enableDrag(element) {
  let isDragging = false, startX, startY, initialX, initialY;

  element.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialX = parseInt(window.getComputedStyle(element).left) || 0;
      initialY = parseInt(window.getComputedStyle(element).top) || 0;
  });

  document.addEventListener('mousemove', (e) => {
      if (isDragging) {
          const dx = e.clientX - startX;
          const dy = e.clientY - startY;
          element.style.left = `${initialX + dx}px`;
          element.style.top = `${initialY + dy}px`;
      }
  });

  document.addEventListener('mouseup', () => {
      isDragging = false;
  });
}
