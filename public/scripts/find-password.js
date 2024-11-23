document.addEventListener('DOMContentLoaded', () => {
    // 테스트용 초기 데이터 추가
    if (!localStorage.getItem('users')) {
        const sampleUsers = [
            { id: 'user1', password: 'password1' },
            { id: 'user2', password: 'password2' }
        ];
        localStorage.setItem('users', JSON.stringify(sampleUsers));
    }

    const findButton = document.querySelector('#find-password-button');
    const resultContainer = document.querySelector('#password-result');

    findButton.addEventListener('click', () => {
        const userId = document.querySelector('#find-id').value.trim();

        // 결과 메시지 초기화
        resultContainer.textContent = '';

        if (userId) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.id === userId);

            if (user) {
                alert(`비밀번호는 ${user.password} 입니다.`);
                resultContainer.textContent = `비밀번호는 ${user.password} 입니다.`;
            } else {
                resultContainer.textContent = '아이디가 존재하지 않습니다.';
            }
        } else {
            resultContainer.textContent = '아이디를 입력해주세요.';
        }
    });
});
