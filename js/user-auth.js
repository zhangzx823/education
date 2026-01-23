// 用户认证和状态管理

// 获取当前登录用户
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

// 获取所有注册用户（用于管理员功能）
function getAllUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// 检查用户是否已登录
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// 检查是否为正式用户（已登录）
function isRegisteredUser() {
    return isLoggedIn();
}

// 退出登录
function logout() {
    localStorage.removeItem('currentUser');
    if (typeof updateUserMenu === 'function') {
        updateUserMenu();
    }
    // 刷新页面
    window.location.reload();
}

// 更新导航栏用户菜单
function updateUserMenu() {
    const userMenu = document.getElementById('userMenu');
    if (!userMenu) return;
    
    const currentUser = getCurrentUser();
    
    if (currentUser) {
        // 显示用户信息
        const firstChar = currentUser.username.charAt(0).toUpperCase();
        userMenu.innerHTML = `
            <div class="user-info">
                <div class="user-avatar">${firstChar}</div>
                <span>${currentUser.username}</span>
                <span class="user-badge">正式用户</span>
            </div>
            <a href="#" class="btn-logout" onclick="logout(); return false;">退出</a>
        `;
    } else {
        // 显示登录/注册按钮
        userMenu.innerHTML = `
            <div class="auth-buttons">
                <a href="login.html" class="btn-login">登录</a>
                <a href="register.html" class="btn-register">注册</a>
            </div>
        `;
    }
}

// 更新用户状态横幅（如果存在）
function updateUserStatusBanner() {
    const currentUser = getCurrentUser();
    const guestBanner = document.getElementById('guestBanner');
    const registeredBanner = document.getElementById('registeredBanner');
    
    if (!guestBanner && !registeredBanner) return; // 页面没有状态横幅
    
    if (currentUser) {
        // 正式用户
        if (guestBanner) {
            guestBanner.style.display = 'none';
            guestBanner.classList.remove('show');
        }
        if (registeredBanner) {
            registeredBanner.style.display = 'block';
            registeredBanner.classList.add('show');
        }
    } else {
        // 游客
        if (guestBanner) {
            guestBanner.style.display = 'block';
            guestBanner.classList.add('show');
        }
        if (registeredBanner) {
            registeredBanner.style.display = 'none';
            registeredBanner.classList.remove('show');
        }
    }
}

// 页面加载时自动更新用户菜单和状态横幅
function initUserAuth() {
    updateUserMenu();
    updateUserStatusBanner();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUserAuth);
} else {
    initUserAuth();
}

