export function loadHeader(containerId) {
    const isLoggedIn = Boolean(sessionStorage.getItem('isLoggedIn')); // 로그인 여부
    const myPageLink = isLoggedIn ? '../pages/mypage.html' : '../pages/login.html';

    const headerHTML = `
        <div class="Header">
            <div class="Header-Warp">
                <div class="Header-Warp-Left">
                    <img src="../assets/추가로고.png" alt="추가 로고" onclick="location.href='../pages/upload.html'">
                </div>
                <div class="Header-Warp-Center">
                    <img src="../assets/로고.png" alt="메인 로고" onclick="location.href='../pages/main.html'">
                </div>
                <div class="Header-Warp-Right">
                    <div class="Header-Warp-Right-LeftImg">
                        <img src="../assets/공지사항 로고.png" alt="공지사항" onclick="location.href='../pages/notice.html'">
                    </div>
                    <div class="Header-Warp-Right-RightImg">
                        <img src="../assets/마이페이지 로고.png" alt="마이페이지" onclick="location.href='${myPageLink}'">
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById(containerId).innerHTML = headerHTML;
}


// 로그인 상태 확인 함수
export function checkLoginStatus() {
    const user = localStorage.getItem('loggedInUser'); // 로컬스토리지에서 로그인 상태 확인
    return user !== null; // 로그인되어 있으면 true 반환
}

// 마이페이지 로고 클릭 이벤트
document.addEventListener('DOMContentLoaded', () => {
    const myPageLogo = document.querySelector('.Header-Warp-Right-RightImg img');
    if (myPageLogo) {
        myPageLogo.addEventListener('click', () => {
            const isLoggedIn = checkLoginStatus();
            if (isLoggedIn) {
                location.href = '../pages/mypage.html'; // 로그인 상태라면 마이페이지로 이동
            } else {
                location.href = '../pages/login.html'; // 비로그인 상태라면 로그인 페이지로 이동
            }
        });
    }
});


// 검색 처리 함수
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('#search-input'); // 검색창 ID
    const searchButton = document.querySelector('#search-button'); // 검색 버튼 ID

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                location.href = `../pages/search-result.html?tag=${encodeURIComponent(query)}`;
            } else {
                alert('검색어를 입력해주세요.');
            }
        });
    }
});
