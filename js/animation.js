// 获取ul元素
const ulElement = document.querySelector('.player-list ul');

// 定义一个变量来存储动画的播放状态
let isPaused = false;

// 为ul元素添加鼠标悬停和鼠标离开事件
ulElement.addEventListener('mouseenter', () => {
    // 当鼠标悬停在ul元素上时，暂停动画
    if (!isPaused) {
        isPaused = true;
        ulElement.style.animationPlayState = 'paused';
    }
});

ulElement.addEventListener('mouseleave', () => {
    // 当鼠标离开ul元素时，1秒后恢复动画
    if (isPaused) {
        isPaused = false;
        setTimeout(() => {
            ulElement.style.animationPlayState = 'running';
        }, 500);
    }
});