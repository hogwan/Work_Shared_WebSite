// 가상 데이터
const notices = [
  { id: 521, title: "How to upload image", author: "관리자", date: "24.10.10" },
  { id: 520, title: "24.10.02 Update", author: "관리자", date: "24.09.23" },
  { id: 519, title: "24.09.12 Update", author: "관리자", date: "24.09.05" },
  { id: 518, title: "24.08.31 Update", author: "관리자", date: "24.08.24" },
  { id: 517, title: "24.08.07 Update", author: "관리자", date: "24.07.31" },
  { id: 516, title: "24.07.25 Update", author: "관리자", date: "24.07.25" },
  { id: 515, title: "Feature Announcement", author: "관리자", date: "24.07.18" },
  { id: 514, title: "Bug Fixes Release", author: "관리자", date: "24.07.11" },
  { id: 513, title: "Maintenance Notification", author: "관리자", date: "24.07.04" },
  { id: 512, title: "New Features Release", author: "관리자", date: "24.06.27" },
  { id: 511, title: "Security Patch Update", author: "관리자", date: "24.06.20" },
  { id: 510, title: "System Upgrade Notice", author: "관리자", date: "24.06.13" },
  { id: 509, title: "Holiday Announcement", author: "관리자", date: "24.06.06" },
  { id: 508, title: "Performance Improvements", author: "관리자", date: "24.05.30" },
  { id: 507, title: "Critical Bug Fixes", author: "관리자", date: "24.05.23" },
];

// 페이지네이션 상태
let currentPage = 1;
const itemsPerPage = 5;

// 공지사항 렌더링 함수
function renderNotices() {
  const tbody = document.getElementById("notice-tbody");
  tbody.innerHTML = ""; // 기존 데이터 초기화

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentNotices = notices.slice(startIdx, endIdx);

  currentNotices.forEach((notice) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${notice.id}</td>
          <td>${notice.title}</td>
          <td>${notice.author}</td>
          <td>${notice.date}</td>
      `;
      tbody.appendChild(row);
  });

  renderPagination();
}

// 페이지네이션 렌더링 함수
function renderPagination() {
  const pageIndicators = document.getElementById("page-indicators");
  pageIndicators.innerHTML = ""; // 기존 버튼 초기화

  const totalPages = Math.ceil(notices.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
      const circle = document.createElement("button");
      circle.className = "page-indicator";
      circle.dataset.page = i;
      circle.textContent = i;
      if (i === currentPage) circle.classList.add("active");
      circle.addEventListener("click", () => {
          currentPage = i;
          renderNotices();
      });
      pageIndicators.appendChild(circle);
  }
}

// 이전/다음 버튼 이벤트
document.querySelectorAll(".page-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
      const totalPages = Math.ceil(notices.length / itemsPerPage);

      if (btn.dataset.page === "prev" && currentPage > 1) {
          currentPage--;
      } else if (btn.dataset.page === "next" && currentPage < totalPages) {
          currentPage++;
      }

      renderNotices();
  });
});

// 초기 렌더링
renderNotices();
