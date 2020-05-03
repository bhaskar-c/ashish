import pianoSoundSamples from './base64PianoSamples.js'

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}


function _base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}



/*
window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
	return false;
}*/

function Synth() {
	try {
			new AudioContext()
		} catch (e) {
			alert('No web audio support in this browser. Try latest version of Google Chrome or Firefox');
		}
	this.audioContext = new AudioContext()		
    this.pianoBuffer = null
    this.pianoBuffers = {}
    
    this.pianoGain = this.audioContext.createGain()
    this.pianoGain.gain.value = 0.5;
    
    this.compressorNode = this.audioContext.createDynamicsCompressor();
	this.compressorNode.threshold.value = -10;
	this.compressorNode.knee.value = 0;
	this.compressorNode.ratio.value = 20;
	this.compressorNode.attack.value = 0;
	this.compressorNode.release.value = 0.1;

    this.convolverNode = this.audioContext.createConvolver();
    this.pianoGain.connect(this.compressorNode);
	this.compressorNode.connect(this.audioContext.destination);
    this.addAllSamplesToBuffer(this.receiveAudioBuffer);
    
}


Synth.prototype = {
	
	changeEffect: function(id){
		console.log(id)
		id == 'soft' ? this.changeToSoft(): null
		id == 'normal' ? this.changeToNormal(): null
		id == 'reverb' ? this.changeToReverb(): null
		},

	changeToSoft: function(){
			this.pianoGain.disconnect(this.compressorNode);
			this.pianoGain.connect(this.convolverNode);
			this.convolverNode.connect(this.compressorNode);
		},

	changeToNormal: function(){
			this.pianoGain.connect(this.compressorNode);
			this.pianoGain.disconnect(this.convolverNode);
			this.convolverNode.disconnect(this.compressorNode);
		},
		
	changeToReverb: function(){
		 var delay = this.audioContext.createDelay();
		 delay.delayTime.value = 0.25;
		 
		 
		this.pianoGain.connect(delay);
		delay.connect(this.compressorNode)
    	this.pianoGain.connect(this.convolverNode);
		this.pianoGain.connect(this.compressorNode);
		this.convolverNode.connect(this.compressorNode);
		},

	addAllSamplesToBuffer: function(callback) {
			var samples = pianoSoundSamples;
			var self = this;
			for(var number = 9; number <= 97; number++) {
				// remeber 97 is the impulse response of piano sound board
				var audioData = _base64ToArrayBuffer(samples.pianoSoundSamples[number])
				this.decodeAudioFile(number, audioData, callback, self);
        	}
	
		},


	decodeAudioFile(number, audioData, callback, self){
				this.audioContext.decodeAudioData(audioData, function(buffer) {
						callback(number, buffer, self)
						
					});		
		
		
		},
		
   receiveAudioBuffer: function(key, buffer, obj) {
	   if(key === 97) { // this is the convolver buffer so add it to the convolver node
			obj.convolverNode.buffer = buffer;
			
		   }
	    obj.pianoBuffers[key] = buffer
        var loader = document.getElementById('loader');
        var synthContainer = document.getElementById('synthContainer');
        if(obj.pianoBuffers.length < 88) {loader.style.display = "inline"; synthContainer.style.display = "none";}
				else {loader.style.display = "none"; synthContainer.style.display = "block";}
		
      },


    release: function(noteNumber) {
        var key = document.getElementById(noteNumber);
        key.classList.remove('highlightPlayedKey');
        key.classList.remove('active');
		},



	highlightKey: function(noteNumber){
		var key = document.getElementById(noteNumber);
		if(key !== null) {
			key.classList.add('highlightPlayedKey');
			key.classList.add('active');
			};
			
		},

   
    press: function(noteNumber, velocity) {
      //var vel = -1/(2 * Math.log (velocity/127));
      //console.log(vel);
	    var buffers = this.pianoBuffers
      this.pianoBufferSourceNode = this.audioContext.createBufferSource();
	    this.pianoBufferSourceNode.buffer = buffers[noteNumber];
	    var now = this.audioContext.currentTime;
      this.keyGain = this.audioContext.createGain();
      this.keyGain.gain.value = velocity
      this.keyGain.gain.cancelScheduledValues(now);
      this.pianoBufferSourceNode.connect(this.keyGain)
	  this.keyGain.connect(this.pianoGain);
      
	  this.pianoBufferSourceNode.start();
      this.highlightKey(noteNumber);    

    },

}
module.exports = Synth;
	
