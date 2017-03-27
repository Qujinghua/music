 // var musicList = [{
    //   src: 'http://cloud.hunger-valley.com/music/ifyou.mp3',
    //   title: 'IF YOU',
    //   auther: 'Big Bang'
    // }, {
    //   src: 'http://cloud.hunger-valley.com/music/玫瑰.mp3',
    //   title: '玫瑰',
    //   auther: '贰佰'
    // }]
    // console.log(musicList);


    /*
        function Player(ct, musicList){
          this.ct = ct
          this.musicList = musicList
          this.init()
          this.bind()
          this.start()
        }
        Player.prototype = {
          init: function(){
              this.backBtn = this.ct.querySelector('.back')
          },
          bind: function(){
          },
          start: function(){
          }
        }
        new Player(musicList)
    */
  /*
    var musicList = [{
        src: 'http://cloud.hunger-valley.com/music/玫瑰.mp3',
        title: '玫瑰',
        auther: '贰佰'
      }, {
        src: 'http://cloud.hunger-valley.com/music/ifyou.mp3',
        title: 'IF YOU',
        auther: 'Big Bang'
      }
    ]
    */
    var backBtn = document.querySelector('.musicbox .back')
    var playBtn = document.querySelector('.musicbox .play')
    var forwardBtn = document.querySelector('.musicbox .forward')
    var titleNode = document.querySelector('.musicbox .title')
    var authorNode = document.querySelector('.musicbox .auther')
    var timeNode = document.querySelector('.musicbox .time')
    var progressBarNode = document.querySelector('.musicbox .progress .bar')
    var progressNowNode = document.querySelector('.musicbox .progress-now')
    var timer
    var music = new Audio()
    music.autoplay = true
    var musicIndex = 0

    getMusic(function(musicList){
      loadMusic(musicList[musicIndex])
    })
    
    //播放状态切换
    playBtn.onclick = function() {
      var icon = this.querySelector('.fa')
      if (icon.classList.contains('fa-play')) {
        music.play()
      } else {
        music.pause()
      }
      //播放按钮图标切换
      icon.classList.toggle('fa-play')
      icon.classList.toggle('fa-pause')
    }
    //下一曲按钮 
    forwardBtn.onclick = loadNextMusic
    //上一曲按钮
    backBtn.onclick = loadLastMusic
    //一曲完结就下一曲
    music.onended = loadNextMusic
    music.shouldUpdate = true
    //音乐时间进度条
    music.onplaying = function() {
      timer = setInterval(function() {
        updateProgress()
      }, 1000)
      console.log('play')
    }
    //暂停停止进度条计时器
    music.onpause = function() {
        console.log('pause')
        clearInterval(timer)
      }
      /*
      music.ontimeupdate = function(){
        var _this = this
        if(_this.shouldUpdate) { 
           updateProgress()
           _this.shouldUpdate = false
          setTimeout(function(){
            _this.shouldUpdate = true
          }, 1000)
        }
      }
      */

    //点击音乐进度条某位置，音乐跳转播放相应位置
    progressBarNode.onclick = function(e) {
      var percent = e.offsetX / parseInt(getComputedStyle(this).width)
      music.currentTime = percent * music.duration
      progressNowNode.style.width = percent * 100 + "%"
    }

    function loadMusic(songObj) {
      music.src = songObj.src
      titleNode.innerText = songObj.title
      authorNode.innerText = songObj.auther
    }
    //下一曲
    function loadNextMusic() {
      musicIndex++
      musicIndex = musicIndex % musicList.length
      loadMusic(musicList[musicIndex])
    }
    //上一曲
    function loadLastMusic() {
      musicIndex--
      musicIndex = (musicIndex + musicList.length) % musicList.length
      loadMusic(musicList[musicIndex])
    }
    //播放时间更新
    function updateProgress() {
      var percent = (music.currentTime / music.duration) * 100 + '%'
      progressNowNode.style.width = percent
      var minutes = parseInt(music.currentTime / 60)
      var seconds = parseInt(music.currentTime % 60) + ''
      seconds = seconds.length == 2 ? seconds : '0' + seconds
      timeNode.innerText = minutes + ':' + seconds
    }
    //通过回调函数(异步编程的最基本方法)获取歌单
    function getMusic(callback) {
      var xhr = new XMLHttpRequest()
      xhr.open('get', 'music.json', true)
      xhr.send()
      xhr.onload = function() {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          callback(JSON.parse(xhr.responseText))
          //console.log(xhr.responseText)
          //console.log(JSON.parse(xhr.responseText))
          musicList = JSON.parse(xhr.responseText)
          //console.log(musicList)
          //console.log(JSON.parse(xhr.responseText))
        }
      }
    }


//introduce
var markdown = `
## 音乐播放器
----------
## API
----------

## 属性

1、audioObject

创建或者获取的audio对象，可通过以下两种方式得到

### 方法1：
    <audio id="music" src="http://cloud.hunger-valley.com/music/玫瑰.mp3">你的浏览器不支持喔！</audio>
    <script>
    var audioObject = document.querySelector('#music')
    </script>
### 方法2：
    var audioObject = new Audio('http://cloud.hunger-valley.com/music/玫瑰.mp3')

2、audioObject.play()

开始播放

3、audioObject.pause()

暂停播放

4、audioObject.autoPlay

设置或者获取自动播放状态

    audioObject.autoPlay = true  //设置为自动播放，下次更换 audioObject.src 后会自动播放音乐
    audioObject.autoPlay = false //设置不自动播放
    console.log(audioObject.autoPlay)

5、audioObject.src

设置或者获取音乐地址

    audioObject.src = "http://cloud.hunger-valley.com/music/ifyou.mp3"
    console.log(audioObject.src)

6、audioObject.volume

设置或者获取音量，最大值为1，0为静音

    audioObject.volume = 0.5
    audioObject.volume = 1
    console.log(audioObject.volume)

7、audioObject.loop

设置或者获取循环状态

    audioObject.loop = true
    console.log(audioObject.loop)

8、audioObject.duration

获取音乐长度，单位为秒

    console.log(audioObject.duration)

9、audioObject.currentTime

设置或者获取播放时间

    console.log(audioObject.currentTime)

10、audioObject.ended

判断音乐是否播放完毕，只读属性

## 事件

1、playing

当音乐开始播放，暂停后重新开始播放，设置currentTime后开始播放时触发

    audioObject.addEventListener('playing', function(){
        console.log('playing')
    })

2、pause

当音乐暂停时和结束时触发

    audioObject.addEventListener('pause', function(){
        console.log('pause')
    })

3、ended

当音乐结束时触发

    audioObject.addEventListener('ended', function(){
        console.log('ended')
    })

4、timeupdate

当currentTime更新时会触发timeupdate事件,这个事件的触发频率由系统决定，但是会保证每秒触发4-66次（前提是每次事件处理不会超过250ms.

    //如下代码设置 每1秒左右执行一次
    audioObject.shouldUpdate = true
    audioObject.ontimeupdate = function(){
        var _this = this
        if(_this.shouldUpdate) {
            //do something
            console.log('update')
            _this.shouldUpdate = false
            setTimeout(function(){
            _this.shouldUpdate = true
            }, 1000)
        }
    }

5、volumechange

当音量改变时触发

    audioObject.onvolumechange = function(){
        console.log('volumechange')
    }

`
var html = marked(markdown)
document.getElementById('introduce').innerHTML = html