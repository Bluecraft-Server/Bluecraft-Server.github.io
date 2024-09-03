function show_date_time() {
    window.setTimeout("show_date_time()", 1000);
    var BirthDay = new Date("August 25, 2024 00:00:00");
    var today = new Date();
    var timeold = today.getTime() - BirthDay.getTime();
    var sectimeold = timeold / 1000; // 总秒数
    var msPerDay = 24 * 60 * 60 * 1000;
    var msPerHour = 60 * 60 * 1000;

    // 计算天数
    var days = Math.floor(timeold / msPerDay);
    // 计算剩余的毫秒数（减去已经计算过的天数）
    timeold -= days * msPerDay;
    var hours = Math.floor(timeold / msPerHour);
    // 计算剩余的毫秒数（减去已经计算过的小时数）
    timeold -= hours * msPerHour;
    var minutes = Math.floor(timeold / (1000 * 60));
    // 计算剩余的秒数
    var seconds = Math.floor((timeold % (1000 * 60)) / 1000);

    // 创建运行天数显示的HTML，为每个时间单位单独设置颜色
    var runtimeDisplay =
        '<span style="color: #00fff2;">' + days + '</span> 天 ' +
        '<span style="color: #00fff2;">' + hours + '</span> 小时 ' +
        '<span style="color: #00fff2;">' + minutes + '</span> 分 ' +
        '<span style="color: #00fff2;">' + seconds + '</span> 秒';

    // 设置页面元素的innerHTML
    document.getElementById("span_dt_dt").innerHTML = runtimeDisplay;
}

show_date_time();