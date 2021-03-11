var vidQualityLevels = [];
var hls = {};
export function addHLSScript() {
  var hlsScript = document.createElement("script");
  hlsScript.setAttribute(
    "src",
    "https://cdnjs.cloudflare.com/ajax/libs/hls.js/0.5.14/hls.min.js"
  );
  document.getElementsByTagName("head")[0].appendChild(hlsScript);
}
function addPlayerToDOM(elementId) {
  var player = document.getElementById(elementId);
  player.innerHTML = `<div class="Twrapper">
            <video id="Tplayer">
                <source src="https://www.w3schools.com/tags/movie.mp4" type="video/mp4">
            </video>
            <div style="width: 0%;display: none;" id="Tplayer_adverts">
                <img src="https://mailbakery.s3.amazonaws.com/wp-content/uploads/2015/06/26160320/neiman_marcus.gif"
                    style="width: 100%;" />
            </div>
            <div class="Tplayer_main_wrapper">
                <div class="Tplayer_main_btns">
                    <div class="Tplayer_main_play">
                        <img src="images/play-main.png" width="100px"
                            alt="play-image" />
                    </div>
                    <div class="Tplayer_main_buffer">
                        <div class="loader-6 center"><span></span></div>
                    </div>
          
                </div>
                <div class="Tplayer_quality_switcher">
                    <div class="Tplayer_quality_box">
                        <ul class="Tplayer_quality_ul">
                            <li class="Tplayer_quality_list_styles" onclick="switchQualityToAuto(this)">Auto <span
                                    id="Tplayer_current_auto_quality"></span></li>
                        </ul>
                    </div>
                </div>
                <div class="Tplayer_controls">
                    <div class="Tplayer_buttons">
                        <div class="Tplayer_buttons_container">
                            <div class="Tplayer_btn_space">
                                <button class="Tplayer_btn Tplayer_10_sec_rewind">
                                    <img src="images/rewind.svg" class="Tplayer_seekable_btn" />
                                </button>
                            </div>
                            <div class="Tplayer_btn_space" style="margin: auto">
                                <button class="Tplayer_btn Tplayer_play">
                                    <img src="images/play.svg" width="15px" />
                                </button>
                                <button class="Tplayer_btn Tplayer_pause">
                                    <img src="images/pause.svg" width="15px" />
                                </button>
                                <button class="Tplayer_btn Tplayer_replay">
                                    <img src="images/replay.svg" width="15px" />
                                </button>
                            </div>
                            <div class="Tplayer_btn_space">
                                <button class="Tplayer_btn Tplayer_10_sec_forward">
                                    <img src="images/forward.svg" class="Tplayer_seekable_btn" />
                                </button>
                            </div>
          
                        </div>
                    </div>
                    <div class="Tplayer_bar">
                        <div class="Tplayer_timer">
                            <div class="Tplayer_current_time">0:00</div>
                        </div>
                        <div class="Tplayer_bar_container">
                            <div class="Tplayer_progress"></div>
                            <div class="Tplayer_buffered"></div>
                        </div>
                        <div class="Tplayer_timer">
                            <div class="Tplayer_total_time">0:00</div>
                        </div>
                    </div>
                    <div class="Tplayer_resolution">
                        <div class="Tplayer_btn_space">
          
                            <button class="Tplayer_btn " id="Tplayer_volume">
                                <img src="images/volume.svg" class="Tplayer_volume_btn" />
                            </button>
                        </div>
                        <div class="Tplayer_btn_space">
                            <button class="Tplayer_btn " id="Tplayer_settings">
                                <img src="images/cog.svg" class="Tplayer_setting_btn" />
                            </button>
                        </div>
                        <div class="Tplayer_btn_space">
                            <button class="Tplayer_btn " id="Tplayer_fullScr">
                                <img src="images/expand.svg" class="Tplayer_expand_btn" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          </div>`;
  return player;
}

function checkIfHlsAvailable(obj) {
  var hlsAvailable = false;
  var interval = setInterval(() => {
    if (window.Hls) {
      hlsAvailable = waitForHLS();
      loadHlsVideo.call(obj);
      clearInterval(interval);
    }
  }, 1000);
}
function loadHlsVideo() {
  if (hls.currentLevel) {
    hls.destroy();
  }
  this.playerRef = document.getElementById("Tplayer");
  var videoSrc = this.url;
  if (Hls.isSupported()) {
    hls = new Hls({ maxMaxBufferLength: 30, startFragPrefetch: true });
    hls.loadSource(videoSrc);
    hls.attachMedia(this.playerRef);
    hls.on(Hls.Events.MANIFEST_LOADING, function () {
      //   TplayerHideBuffer("block");
    });
    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
      //   addQualitiesInPlayer(data.levels);
      //   realTimeVideoQualityChecker();
    });
    hls.on(Hls.Events.ERROR, (e) => {
      //   TplayerHideBuffer("block");
      if (e.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR) {
      }
    });
  } else if (this.playerRef.canPlayType("application/vnd.apple.mpegurl")) {
    this.playerRef.src = videoSrc;
  }
}
function waitForHLS() {
  if (window.Hls) {
    hls = new Hls({ maxMaxBufferLength: 30, startFragPrefetch: true });
    return true;
  } else {
    return false;
  }
}

export function _initializePlayer(id, obj) {
  addPlayerToDOM(id);
  checkIfHlsAvailable(obj);
}
