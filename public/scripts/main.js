// 가상 데이터 (백엔드에서 가져오는 데이터)
const boards = [
  { id: 1, image: "data:image/jpeg;base64,...", author: "김범수", title: "Doge" },
  { id: 2, image: "data:image/jpeg;base64,...", author: "홍길동", title: "Tree" },
  { id: 3, image: "data:image/jpeg;base64,...", author: "조한이", title: "Tiger" },
  { id: 4, image: "data:image/jpeg;base64,...", author: "채린핑", title: "핑크캐릭터" },
  { id: 5, image: "data:image/jpeg;base64,...", author: "고도균", title: "Police" },
  { id: 6, image: "data:image/jpeg;base64,...", author: "남이래", title: "Cat" },
];

// DOM 요소
const mainWarpBoards = document.getElementById("main-warp-boards");

// 초기 데이터 렌더링
function renderBoards(data) {
  mainWarpBoards.innerHTML = ""; // 기존 내용 삭제
  data.forEach(board => {
      const boardElement = document.createElement("div");
      boardElement.className = "main-warp-boards-board";
      boardElement.innerHTML = `
          <div class="main-warp-boards-board-content">
              <img src="${board.image}" alt="${board.title}">
              <div class="main-warp-boards-board-text">
                  <p>Made by. ${board.author}</p>
              </div>
          </div>
      `;
      mainWarpBoards.appendChild(boardElement);
  });
}

// 검색 기능
function filterBoards() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const filteredBoards = boards.filter(board =>
      board.title.toLowerCase().includes(query) ||
      board.author.toLowerCase().includes(query)
  );
  renderBoards(filteredBoards);
}

// 초기화
renderBoards(boards);
