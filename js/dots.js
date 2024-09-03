document.addEventListener('DOMContentLoaded', function () {
    const AUTO_PLAY_SECOND = 2500; // 自动播放的时间间隔
    const carousel = document.querySelector('.carousel');
    const slidesContainer = carousel.querySelector('.slides'); // 获取.slides容器
    const slideCount = slidesContainer.children.length;
    const slideWidth = slidesContainer.children[0].clientWidth;

    let autoPlayTimer = null;
    let initialTouchX = 0;
    let touchStartTime = 0;

// 初始化点状导航的激活状态
    const dots = document.querySelectorAll('.dot');
    const setActiveDot = (index) => {
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
        });
    };

// 停止自动播放
    const stopAutoPlay = () => {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    };

// 恢复自动播放
    const resumeAutoPlay = () => {
        if (!autoPlayTimer) {
            autoPlayTimer = setInterval(scrollRight, AUTO_PLAY_SECOND);
        }
    };

    const scrollRight = () => {
        let currentLeft = slidesContainer.scrollLeft;
        if (currentLeft + slideWidth > slideWidth * (slideCount - 1)) { // 修改此处的比较条件
            slidesContainer.scrollLeft = 0; // 循环到第一张
        } else {
            slidesContainer.scrollLeft = currentLeft + slideWidth;
        }
        setActiveDot((currentLeft + slideWidth) / slideWidth % slideCount); // 修改此处的索引计算
    };

    const scrollLeft = () => {
        let currentLeft = slidesContainer.scrollLeft;
        if (currentLeft - slideWidth < 0) {
            slidesContainer.scrollLeft = slideWidth * (slideCount - 1); // 确保这里是倒数第二张，而不是最后一张
        } else {
            slidesContainer.scrollLeft = currentLeft - slideWidth;
        }
        setActiveDot(Math.floor(currentLeft / slideWidth));
    };

// 触摸事件处理
    slidesContainer.addEventListener('touchstart', (e) => {
        initialTouchX = e.touches[0].clientX;
        touchStartTime = e.timeStamp;
        stopAutoPlay();
    });

    slidesContainer.addEventListener('touchmove', (e) => {
        e.preventDefault(); // 阻止默认滚动行为
    });

    slidesContainer.addEventListener('touchend', (e) => {
        const touchDeltaX = e.changedTouches[0].clientX - initialTouchX;
        if (touchDeltaX > 10) { // 向右滑动
            scrollLeft();
        } else if (touchDeltaX < -10) { // 向左滑动
            scrollRight();
        }
        resumeAutoPlay();
    });

// 箭头按钮点击事件
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');
    leftArrow.addEventListener('click', scrollLeft);
    rightArrow.addEventListener('click', scrollRight);

// 初始化
    setActiveDot(0);
    resumeAutoPlay(); // 页面加载完成后开始自动播放
});