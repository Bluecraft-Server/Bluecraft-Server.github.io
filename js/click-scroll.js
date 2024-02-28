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

var music = document.getElementById("bg-music");
var control = document.getElementById("audio-control");

music.loop = true;

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

var audio = document.getElementById("bg-music");
var nextSongBtn = document.getElementById("next-song");
var prevSongBtn = document.getElementById("prev-song");

// 给“下一首”按钮添加点击事件监听器
nextSongBtn.addEventListener("click", function() {
  var sources = audio.getElementsByTagName("source");
  var currentSource = audio.currentSrc;
  
  for(let i = 0; i < sources.length; i++) {
    if(sources[i].src === currentSource) {
      if(i < sources.length - 1) {
        audio.src = sources[i + 1].src;
      } else {
        audio.src = sources[0].src; // 循环到第一首
      }
      audio.load();
      audio.play();
      break;
    }
  }
});

// 给“上一首”按钮添加点击事件监听器
prevSongBtn.addEventListener("click", function() {
  var sources = audio.getElementsByTagName("source");
  var currentSource = audio.currentSrc;
  
  for(let i = 0; i < sources.length; i++) {
    if(sources[i].src === currentSource) {
      if(i > 0) {
        audio.src = sources[i - 1].src; // 切换到上一首
      } else {
        audio.src = sources[sources.length - 1].src; // 循环到最后一首
      }
      audio.load();
      audio.play();
      break;
    }
  }
});