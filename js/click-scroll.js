//jquery-click-scroll
//by syamsul'isul' Arifin

var sectionArray = [1, 2, 3, 4, 5, 6];

$.each(sectionArray, function(index, value){
          
     $(document).scroll(function(){
         var offsetSection = $('#' + 'section_' + value).offset().top - 83;
         var docScroll = $(document).scrollTop();
         var docScroll1 = docScroll + 1;
         
        
         if ( docScroll1 >= offsetSection ){
             $('.navbar-nav .nav-item .nav-link').removeClass('active');
             $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');  
             $('.navbar-nav .nav-item .nav-link').eq(index).addClass('active');
             $('.navbar-nav .nav-item .nav-link').eq(index).removeClass('inactive');
         }
         
     });
    
    $('.click-scroll').eq(index).click(function(e){
        var offsetClick = $('#' + 'section_' + value).offset().top - 83;
        e.preventDefault();
        $('html, body').animate({
            'scrollTop':offsetClick
        }, 300)
    });
    
});

$(document).ready(function(){
    $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');    
    $('.navbar-nav .nav-item .nav-link').eq(0).addClass('active');
    $('.navbar-nav .nav-item .nav-link:link').eq(0).removeClass('inactive');
});

document.addEventListener("DOMContentLoaded", function() {
  var music = document.getElementById("bg-music");
  var control = document.getElementById("audio-control");
  var nextSongBtn = document.getElementById("next-song");
  var prevSongBtn = document.getElementById("prev-song");

  // 设置音乐循环播放
  music.loop = true;
  
  // 设置音乐自动播放，但请注意，这可能不会在所有浏览器上有效
  music.autoplay = true;

  // 初始音量设置为0，然后使用setTimeout逐渐增加音量
  music.volume = 0;
  setTimeout(function() {
    music.volume = 1; // 假设你希望音量为1
  }, 500); // 1秒后音量增加到1

  // 检查音乐是否被暂停，如果是，则尝试重新播放
  if (music.paused) {
    music.play().catch(function() {
      // 如果自动播放失败，可以在这里处理，例如显示提示
      console.log("自动播放被阻止，显示播放按钮提示");
    });
  }

  // 播放/暂停切换
  control.addEventListener("click", function() {
    if (music.paused) {
      music.play();
      control.classList.remove("mute");
      control.setAttribute("data-hover-text", "关闭背景音乐");
    } else {
      music.pause();
      control.classList.add("mute");
      control.setAttribute("data-hover-text", "开启背景音乐");
    }
  });

  // 下一首切换
  nextSongBtn.addEventListener("click", function() {
    var sources = music.getElementsByTagName("source");
    var currentSource = music.currentSrc;
    
    for (var i = 0; i < sources.length; i++) {
      if (sources[i].src === currentSource) {
        if (i < sources.length - 1) {
          music.src = sources[i + 1].src;
        } else {
          music.src = sources[0].src; // 循环到第一首
        }
        music.load();
        music.play();
        break;
      }
    }
  });

  // 上一首切换
  prevSongBtn.addEventListener("click", function() {
    var sources = music.getElementsByTagName("source");
    var currentSource = music.currentSrc;
    
    for (var i = 0; i < sources.length; i++) {
      if (sources[i].src === currentSource) {
        if (i > 0) {
          music.src = sources[i - 1].src; // 切换到上一首
        } else {
          music.src = sources[sources.length - 1].src; // 循环到最后一首
        }
        music.load();
        music.play();
        break;
      }
    }
  });

  // 监听音乐播放错误
  music.addEventListener('error', function(e) {
    console.error('Media error:', e);
    // 这里可以添加更多的错误处理逻辑
  });
});