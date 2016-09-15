

var bpm, bpms, bpms_safari, canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height, centerX, centerY, time, text;

window.setTimeout(function () {
    mubert();
}, 4500);




/*
 *
 *
 * Main Mubert() function
 * http://mubert.com:49994/1750_Cmin_mp3
 *
 */
var bpms            = new Array(1225, 1400, 1440, 1500, 1750, 600);
var bpm_count       = bpms.length - 1;
var tones           = new Array('C', 'F');

function mubert(bpm){


    if (!bpm) {
        bpm = bpms[rand(0,bpm_count)];
    }

    if      (bpm == 1400) { tone = 'D'; }
    else if (bpm == 1750) { tone = 'Cmin'; }
    else if (bpm == 600) { tone = 'C'; }
    else    { tone = tones[rand(0,1)]; }

    port    = (bpm == 1750 || bpm == 600) ? 49994 : 49995;


    jQuery('#audio').remove();

    var audio = new Audio();
    var sourceMpeg = document.createElement('source');
    var sourceOgg  = document.createElement('source');

    sourceMpeg.src              = 'http://mubert.com:' + port + '/' + bpm + '_' + tone + '_mp3';
    sourceMpeg.type             = 'audio/mpeg';
    sourceMpeg.id               = 'sourceMpeg';

    sourceOgg.src               = 'http://mubert.com:' + port + '/' + bpm + '_' + tone + '_ogg';
    sourceOgg.type              = 'audio/ogg';
    sourceOgg.id                = 'sourceOgg';


    sourceMpeg.crossOrigin      = "anonymous";
    sourceOgg.crossOrigin       = "anonymous";
    audio.crossOrigin           = "anonymous";

    audio.autoplay  = true;
    audio.loop      = true;
    audio.controls  = false;
    audio.preload   = 'none';
    audio.volume    = 1;
    audio.id        = 'audio';


    // Создаем элемент внутри #audio_box
    document.getElementById('audio_box').appendChild(audio);
    document.getElementById('audio').appendChild(sourceMpeg);
    document.getElementById('audio').appendChild(sourceOgg);

    var stream = document.getElementById('audio');

    stream.play();

    if(isAndroid || isFirefox || IsSafari()) {  }
    else {
        mubertAnimation(audio);
    }

}


/*
 *
 *
 * Function changeStyle();
 *
 *
 */

function changeStyle(bpm){

    var stream      = document.getElementById('audio');
    var sourceMpeg  = document.getElementById('sourceMpeg');
    var sourceOgg   = document.getElementById('sourceOgg');

    stream.pause();


    if (!bpm) {
        bpm = bpms[rand(0,bpm_count)];
    }

    if      (bpm == 1400) { tone = 'D'; }
    else if (bpm == 1750) { tone = 'Cmin'; }
    else if (bpm == 600) { tone = 'C'; }
    else    { tone = tones[rand(0,1)]; }

    port    = (bpm == 1750 || bpm == 600) ? 49994 : 49995;

    sourceOgg.remove();
    sourceMpeg.remove();

    sourceMpeg.src              = 'http://mubert.com:' + port + '/' + bpm + '_' + tone + '_mp3';
    sourceMpeg.type             = 'audio/mpeg';
    sourceMpeg.id               = 'sourceMpeg';

    sourceOgg.src               = 'http://mubert.com:' + port + '/' + bpm + '_' + tone + '_ogg';
    sourceOgg.type              = 'audio/ogg';
    sourceOgg.id                = 'sourceOgg';

    sourceMpeg.crossOrigin      = "anonymous";
    sourceOgg.crossOrigin       = "anonymous";
    audio.crossOrigin           = "anonymous";

    document.getElementById('audio').appendChild(sourceMpeg);
    document.getElementById('audio').appendChild(sourceOgg);

    stream.load();
    stream.play();
}


/*
 *
 *
 * Function mubertAnimation();
 *
 *
 */
var __rmn;

if(isAndroid || isFirefox || IsSafari()) {   }
else {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = context.createAnalyser();
}


function mubertAnimation(myAudio){

    // Инициализируем AudioContext() и анализатор


    // Рисуем канвас
    canvas = document.getElementById('analyser_render');
    ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle = 'rgba(255,255,255,0.02)';
    bars = 5;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    if(!isFirefox || !isAndroid) {
        // Re-route audio playback into the processing graph of the AudioContext
        source = context.createMediaElementSource(myAudio);
        source.crossOrigin = "use-credentials";
        source.connect(analyser);
        analyser.connect(context.destination);

        __rmn = true;
        window.requestAnimationFrame(frameLooper);
    }

}


function toggleAnimation(){
    __rmn = !__rmn;
    if (__rmn)
        window.requestAnimationFrame(frameLooper);
}




/*
 *
 *
 * Function mubertAnimation();
 *
 * Функция анимации в канвасе
 *
 */
function frameLooper(){

    // Создаем массив с нужной длиной
    fbc_array = new Uint8Array(analyser.frequencyBinCount);

    analyser.getByteFrequencyData(fbc_array);

    // console.log(fbc_array);

    // Чистим канвас
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    var x = 100,
        y = 75,
        innerRadius = 5,
        outerRadius = 70,
        radius = 60;

    var gradient = ctx.createLinearGradient(10, 90, 200, 90);


    // Рисуем красоту
    for (var i = 1; i < bars; i++) {
        var j=i*10;
        bar_radius = fbc_array[j]*1.4;

        ctx.beginPath();
        ctx.arc(centerX, centerY, bar_radius, 0, 360);

        ctx.lineWidth = 1;
        //ctx.fillStyle = 'rgba('+randomInteger(0, 20)+','+randomInteger(0, 20)+','+randomInteger(0, 20)+',0.06)';
        ctx.strokeStyle = 'rgba('+randomInteger(0, 255)+','+randomInteger(0, 255)+','+randomInteger(0, 255)+',0)';
        ctx.fill();
        ctx.stroke();

    }


    // Залупим анимацию
    if (__rmn)
        window.requestAnimationFrame(frameLooper);

}