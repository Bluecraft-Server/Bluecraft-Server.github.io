// 检查是否已经设置了特定的Cookie
var refreshCount = parseInt(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*refreshCount\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || 0;

// 如果是第一次加载页面，设置Cookie并刷新页面
if (refreshCount === 0) {
    // 设置Cookie，使其在浏览器关闭时过期
    document.cookie = "refreshCount=1; path=/";

    // 刷新页面
    location.reload();
} else if (refreshCount === 1) {
    // 如果是第二次刷新，再次刷新页面
    document.cookie = "refreshCount=2; path=/"; // 更新Cookie值为2
    location.reload();
} else {
    // 如果已经刷新了两次，不再刷新页面
    document.cookie = "refreshCount=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; // 删除Cookie
}