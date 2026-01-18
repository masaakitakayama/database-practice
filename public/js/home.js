const container = document.getElementById("userContainer");
const searchInput = document.getElementById("userSearchInput");
const searchButton = document.getElementById("searchButton");

let allUsers = [];

async function loadUsers() {
    try {
        // fetch urlはショートカット記載では動作出来なかったので、フルパスにて表記した。
        const response = await fetch('/database_practice/api/users');
        if (!response.ok) throw new Error('Network error');
        
        allUsers = await response.json();
        displayUsers(allUsers);
        
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = `<p style="color:#d9534f; grid-column: 1/-1; text-align: center; padding: 50px;">
            データの取得に失敗しました。サーバーの状態を確認してください。</p>`;
    }
}

function displayUsers(users) {
    container.innerHTML = "";
    
    users.forEach(user => {
        const firstChar = user.user_name ? user.user_name.charAt(0) : '?';
        const card = document.createElement('a');
        card.className = 'group';
        card.href = `detail.html?id=${user.id}`;

        card.innerHTML = `
            <div class="card-top">
                <div class="avatar">${firstChar}</div>
                <div class="name-area">
                    <div class="kana">${user.user_name_kana || ''}</div>
                    <h3>${user.user_name}</h3>
                </div>
            </div>
            <div class="card-body">
                <div class="info-row">
                    <span class="label">所属部署：</span>
                    <span>${user.Department || user.department || '未設定'}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    const found = allUsers.find(u => 
        (u.user_name && u.user_name.includes(query)) || 
        (u.user_name_kana && u.user_name_kana.includes(query)) ||
        (u.user_name_ruby && u.user_name_ruby.includes(query))
    );

    if (found) {
        window.location.href = `detail.html?id=${found.id}`;
    } else {
        alert("該当するユーザーが見つかりませんでした。");
    }
}

searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

loadUsers();