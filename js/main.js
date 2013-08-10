function SoundManager() {
	this.prefix = 'audio/';
	this.audioFiles = [
		'Synth.mp3',
		'Bass.mp3',
		'DemoBeats1.mp3',
		'DemoFx1.mp3',
		'FX2.wav',
		'guitar1.mp3',
		'guitar2.mp3',
		'dloop.wav',
		'gangnam.mp3',
		'Hardwell.mp3',
		'GetDown.mp3',
		'jagger.mp3'
	];
	
	this.loadedFiles = 0;
	this.totalFiles = this.audioFiles.length;

	this.audio = [];
	this.keyMap = {
		'q' : 0,
		'w' : 1,
		'e' : 2,
		'r' : 3
	};
}

SoundManager.prototype = {
	init : function() {
		var that = this;

		for(var i=0; i<this.audioFiles.length; i++) {
			var ae = document.createElement('audio');
			ae.className = "afile";

			ae.addEventListener('loadeddata', function() {
				that.loadedFiles += 1;
				var loaded = (that.loadedFiles * 100) / that.totalFiles;
				document.querySelector('.progress-bar').style.width = loaded.toString() + "%";

				if (that.loadedFiles == that.totalFiles) {
					$('#loadingScreen').modal('hide');
					that.start();
				}
			}, true);			
			
			ae.src = this.prefix + this.audioFiles[i];
			ae.load();
			this.audio.push(ae);
			document.body.appendChild(ae);
		}
	},

	start : function () {
		var that = this;
		document.addEventListener('keydown', function(e) {
			var code = (e.keyCode ? e.keyCode : e.which);
		    if (code) {
		    	var key = String.fromCharCode(code).toLowerCase();
		    	if (that.keyMap[key]) {
		    		that.audio[that.keyMap[key]].play();
		    	}
		    }
		}, false);
	}
}

window.onload = function() {
	$('#loadingScreen').modal('show');
	var soundManager = new SoundManager();
	soundManager.init();
}