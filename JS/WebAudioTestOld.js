function playSound(audioContext, buffer, time) {
	let source = audioContext.createBufferSource();
	source.buffer = buffer;
	source.connect(audioContext.destination);
	source.start(time);
	//https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/start 
}


		//let time = startTime + iBar * 8 * note8;
		//console.log (time,  new Date (time)); 
		//console.log (time/1000, (time + 4 * note8)/1000, 0+iBar); 
		//playSound (audioContext, kickBuffer, 0); 

		//sampleSource1.start(audioContext.currentTime,0,0.1);	
		//sampleSource2.start(audioContext.currentTime+1);		
		//sampleSource3.start(audioContext.currentTime+2);

	//playSound (audioContext, audioBuffer1, 0); 
	//playSound (audioContext, audioBuffer2, 0); 
	//playSound (audioContext, audioBuffer3, 0); 

function CACA() {
	for (var bar = 0; bar < 2; bar++) {
		var time = startTime + bar * 8 * eighthNoteTime;
		playSound(kick, time);
		playSound(kick, time + 4 * eighthNoteTime);
	}
}

var audioContext = new AudioContext();
var response1; 
var arrayBuffer1;
var audioBuffer1; 
var buffer1; 
var source1; 

fetch("Audio/kick.mp3")
  .then(response1 => response1.arrayBuffer())
  .then(arrayBuffer1 => audioContext.decodeAudioData(arrayBuffer1))
  .then(audioBuffer1 => {
    buffer1 = audioBuffer1;
  });


async function StartLoop(){
	console.log ("Start!"); 

	let eighthNoteTime=1; 

	for (let bar = 0; bar < 2; bar++) {
		var time = 0 + bar * 8 * eighthNoteTime;
		playSound(buffer1, time);
		playSound(buffer1, time + 4 * eighthNoteTime);
	}
}


async function StopLoop(){
	console.log ("Stop!"); 
	source1.stop();
}

function playSound(buffer, time) {
    let source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(time);
}


async function TEST (){
	PlayDrums (60, 4, 4); 
}

async function PlayDrums (iTempo, iBeats, iMeasure){
	console.log ("Hello Drums");	
		
	//60 BPM -->  60 beats en 60s --> 1 BPS  
		//Quarter = 1s 
		//Eight = 0.5s 
		
	//120 BPM --> 120 Beats por Minuto --> 120 Beats por 60 secs --> 120 Beats por 60000 msec --> 1 beat dura 60000/120 = 500 msec
		
	//this means that if your beat is a quarter note—as in 4/4 or 3/4—a tempo of 60 BPM means there are 60 quarter notes per minute, or one quarter note every second. If your beat is an eighth note, as in 6/8 or 12/8, a tempo of 60 BPM means there are 60 eighth notes per minute, which means there are 30 quarter notes per minute, or one quarter note every two seconds
	
	//https://toolstud.io/music/bpm.php?bpm=69&bpm_unit=3%2F4
	//Beats-per-minute: 120 BPM
	//Beats-per-second: 2 Hz
	//Length of 1 beat: 0.5 second = 500 msec
	//Length of 1 bar (8 beats): 4 second	

	//Whole note = 4 beats. In 4/4 time, this corresponds to a whole measure 
	//Half note = half of a whole note, so 2 beats
	//Quarter note = 1 beat 
	
	//Consider 4/4 time with a tempo marking of q = 60 (bpm). This one is simple, there are 60 quarter notes per minute, and 4 quarter notes per measure.
	
	//As you can see, 1/4 is a quarter note. Therefore, if you see a 4/4 metric, it means that the unit of measure of the beat will be a quarter. Think about it this way: 4 x 1/4.
	//And this happens with all the other notes. The number 8 means that the unit of the beat is an octave. And so on.
	
	//http://bradthemad.org/guitar/tempo_explanation.php#:~:text=Note%20durations&text=A%20quarter%20note%20at%2060bpm,exactly%201%20second%20(1000ms).&text=So%2C%20if%20you%20have%20a,set%20your%20delay%20time%20to. 

	let note2 	= 120 / iTempo	*1000	//half note
	let note4	= 60 / iTempo 	*1000	//Quarter note
	let note8	= 30 / iTempo	*1000	//Eighth note
	let note16	= 15 / iTempo	*1000	//Sixteenth note
	let note0 	= note2*2
	//let note 	= 90 / iTempo //Dotted-quarter note
	//let note	= 45 / iTempo //Dotted-eighth note
	//let note 	= 22.5 / iTempo //Dotted-sixteenth note  
	//let note    = 40 / iTempo //Triplet-quarter note   
	//let note 	= 20 / iTempo //Triplet-eighth note  
	//let note	=  10 / iTempo //Triplet-sixteenth note  
	
		
	//let beatDuration = (60000/iTempo *  iBeats*1/iMeasure); 

	console.log (note0, note2, note4, note8); 
	
	
	window.AudioContext = window.AudioContext||window.webkitAudioContext;
	let audioContext = new AudioContext();
	
	const source1 = await fetch("Audio/kick.mp3"); 
	const arrayBuffer1 = await source1.arrayBuffer();
	const audioBuffer1 = await audioContext.decodeAudioData(arrayBuffer1);
	const sampleSource1 = audioContext.createBufferSource();
	sampleSource1.buffer = audioBuffer1;
	//sampleSource1.loop = true;
	sampleSource1.connect(audioContext.destination); 
	
	const source2 = await fetch("Audio/snare.mp3"); 
	const arrayBuffer2 = await source2.arrayBuffer();
	const audioBuffer2 = await audioContext.decodeAudioData(arrayBuffer2);
	const sampleSource2 = audioContext.createBufferSource();
	sampleSource2.buffer = audioBuffer2;
	sampleSource2.connect(audioContext.destination); 
	
	const source3 = await fetch("Audio/hihat.mp3"); 
	const arrayBuffer3 = await source3.arrayBuffer();
	const audioBuffer3 = await audioContext.decodeAudioData(arrayBuffer3);
	const sampleSource3 = audioContext.createBufferSource();
	sampleSource3.buffer = audioBuffer3;
	sampleSource3.connect(audioContext.destination); 
	
	audioContext.resume(); 

	sampleSource1.start(audioContext.currentTime);	
	
	sampleSource2.start(audioContext.currentTime+1);		
	sampleSource3.start(audioContext.currentTime+2);		
	
	//audioCtx.currentTime + 1, 3, 10
	
	audioContext.resume(); 

	sampleSource1.start(audioContext.currentTime);	
	sampleSource2.start(audioContext.currentTime+1);		
	sampleSource3.start(audioContext.currentTime+2);	
	
}










async function TESTOld2(){
	window.AudioContext = window.AudioContext||window.webkitAudioContext;
	let audioContext = new AudioContext();
	
	const source1 = await fetch("Audio/D3.mp3"); 
	const arrayBuffer1 = await source1.arrayBuffer();
	const audioBuffer1 = await audioContext.decodeAudioData(arrayBuffer1);
	const sampleSource1 = audioContext.createBufferSource();
	sampleSource1.buffer = audioBuffer1;
	sampleSource1.connect(audioContext.destination); 
	
	const source2 = await fetch("Audio/D6.mp3"); 
	const arrayBuffer2 = await source2.arrayBuffer();
	const audioBuffer2 = await audioContext.decodeAudioData(arrayBuffer2);
	const sampleSource2 = audioContext.createBufferSource();
	sampleSource2.buffer = audioBuffer2;
	sampleSource2.connect(audioContext.destination); 
		
	audioContext.resume(); 
	sampleSource1.start(0);	
	sampleSource2.start(0);	
	
	console.log ("%c-----------------------------------------------------------------------------------------------------------------------------------", 'color: cyan'); 	
	console.log ("Source:"); 
	console.log (source1); 
	console.log ("%c-----------------------------------------------------------------------------------------------------------------------------------", 'color: cyan'); 	
	console.log ("arrayBuffer:"); 
	console.log (arrayBuffer1); 	
	console.log ("%c-----------------------------------------------------------------------------------------------------------------------------------", 'color: cyan'); 	
	console.log ("audioBuffer:"); 
	console.log (audioBuffer1); 
	console.log ("%c-----------------------------------------------------------------------------------------------------------------------------------", 'color: cyan'); 	
	console.log ("sampleSource:"); 
	console.log (sampleSource1); 	
}


async function TESTOld(){
	window.AudioContext = window.AudioContext||window.webkitAudioContext;
	let audioContext = new AudioContext();
	const source1 = await fetch("Audio/D3.mp3"); 
	const arrayBuffer = await source1.arrayBuffer();
	const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
	const sampleSource = audioContext.createBufferSource();
	sampleSource.buffer = audioBuffer;
	sampleSource.connect(audioContext.destination)
	audioContext.resume(); 
	sampleSource.start(0);
}




function SAMPLE (){
	var context = system.AudioContext();
	var source = context.createBufferSource();
	var source2 = context.createBufferSource();

	var audioBuffer1 = context.createBuffer(1, float32Array_1.length, context.sampleRate);
	audioBuffer1.getChannelData(0).set(float32Array_1);

	var audioBuffer2 = context.createBuffer(1, float32Array_2.length, context.sampleRate);
	audioBuffer2.getChannelData(0).set(float32Array_2);

	source.buffer = audioBuffer1;
	source.connect(context.destination);

	source2.buffer = audioBuffer2;
	source2.connect(context.destination);

	var time = context.currentTime;

	source.start(time);
	source2.start(time+audioBuffer1.duration);
}