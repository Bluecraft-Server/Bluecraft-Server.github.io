document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("modal");
    var modalTitle = document.getElementById("modal-title");
    var modalText = document.getElementById("modal-text");
    var close = document.getElementsByClassName("close")[0];
    var players = document.querySelectorAll('.player-list li');

    // 点击 li 元素显示模态框
    players.forEach(function (player) {
        player.addEventListener('click', function () {
            // 获取 li 元素的文本内容和 title 属性内容
            var textContent = this.textContent.trim();
            var titleContent = this.getAttribute('title') || "该玩家并未评价，可能是上学去了~wwwww"; // 如果没有 title 属性，显示“无标题”

            // 设置模态框的标题为 li 元素的文本内容
            modalTitle.textContent = "玩家ID: " + textContent;
            // 设置模态框的文本内容为 li 元素的 title 属性内容
            modalText.textContent = "评论: " + titleContent;

            // 显示模态框
            modal.style.display = "block";
        });
    });

    // 模态框关闭逻辑
    close.onclick = function () {
        modal.style.display = "none";
    }

    // 点击模态框外部区域关闭模态框
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // 懒加载图片
    var lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'));
    var config = {
        root: null,  // 观察相对于视口
        rootMargin: '0px',
        threshold: 0.1  // 目标元素有10%进入视口时触发
    };

    var observer = new IntersectionObserver(handleIntersect, config);

    lazyImages.forEach(function (image) {
        observer.observe(image);
    });

    function handleIntersect(entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);  // 加载后停止观察
            }
        });
    }
});

document.addEventListener('contextmenu', function (e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});