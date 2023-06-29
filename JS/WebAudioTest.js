"use strict";
let audioContext = new AudioContext();
AddListeners();

function AddListeners(){
	if (document.getElementById("selTempo")){
		document.getElementById("selTempo").addEventListener("change", DrumMachineMain, false);
	}
	if (document.getElementById("selBeats")){
		document.getElementById("selBeats").addEventListener("change", DrumMachineMain, false);
	}
	if (document.getElementById("selMeaure")){
		document.getElementById("selMeasure").addEventListener("change", DrumMachineMain, false);
	}	
}

function DrumMachineMain(){
	console.log ("PLACEHOLDER"); 
}

function StartLoop (){
	let iTempo =  document.getElementById("selTempo").value; 
	let iBeats = document.getElementById("selBeats").value; 
	let iMeasure  = document.getElementById("selMeasure").value; 
	console.log (iTempo, iBeats.toString() +"/"+iMeasure.toString()); 	

	PlayDrums (+iTempo, +iBeats, +iMeasure);
}

function StopLoop (){
	audioContext.close(); 
}

async function PlayDrums (iTempo, iBeats, iMeasure){
	if (arguments.length !== 3) {console.log ("ERROR: Invalid number of arguments"); return}; 
	if (typeof(iTempo) !== "number") {console.log ("ERROR: Invalid type"); return}; 
	if (typeof(iBeats) !== "number") {console.error ("ERROR: Invalid type"); return}; 
	if (typeof(iMeasure) !== "number") {console.error ("ERROR: Invalid type"); return}; 

	//http://bradthemad.org/guitar/tempo_calculator.php
	//https://toolstud.io/music/bpm.php

	//1. Tempo thing
	//notes duration in SECONDS
	let note2 			= 120 / iTempo	//half note
	let note0 			= note2*2	
	let note4			= 60 / iTempo 	//Quarter note
	let note8			= 30 / iTempo	//Eighth note
	let note16			= 15 / iTempo	//Sixteenth note
	let note4dot 		= 90 / iTempo 	//Dotted-quarter note
	let note8dot		= 45 / iTempo 	//Dotted-eighth note
	let note16dot		= 22.5 / iTempo //Dotted-sixteenth note  
	let note4triplet    = 40 / iTempo 	//Triplet-quarter note   
	let note8triplet 	= 20 / iTempo 	//Triplet-eighth note  
	let note16triplet	= 10 / iTempo 	//Triplet-sixteenth note  

	//hertz
    let note2HZ				= iTempo / 120;		//"half_hz"
    let note4HZ 			= iTempo / 60;		//"quarter_hz"
    let note8HZ				= iTempo / 30;		//"eighth_hz"
    let note16HZ			= iTempo / 15;		//"sixteenth_hz"
    let note4dotHZ			= iTempo / 90;		//"dotted_quarter_hz"
    let note8dotHZ			= iTempo / 45;		//"dotted_eighth_hz"
    let note16dotHZ			= iTempo / 22.5;	//"dotted_sixteenth_hz" 
    let note4tripletHZ		= iTempo / 40;		//"triplet_quarter_hz"
    let note8tripletHZ		= iTempo / 20; 		//"triplet_eighth_hz"
    let note16tripletHZ		= iTempo / 10;		//"triplet_sixteenth_hz"   

	let iBeatLength = 0; 
	let iBarLength = 0; 
	switch (iMeasure){
		case 4: 
			iBeatLength = 60/iTempo*1000; 
			iBarLength = iBeats*60/iTempo*1000;
			break; 
		case 8: 
			iBeatLength = 60/iTempo*1000/2; 
			iBarLength = iBeats*60/iTempo*1000/2;			
			break; 
	}

	console.clear(); 
	console.log ("Beats per minute			:", iTempo); 
	console.log ("Length of 1 beat (ms)			:", iBeatLength); 
	console.log ("Length of 1 bar (",iBeats,"beats)		:", iBarLength); 
	//console.log (note0);
	//console.log (note2, note4, note8, note16, note4dot, note8dot, note16dot, note4triplet, note8triplet, note16triplet); 
	//console.log (note2HZ, note4HZ, note8HZ, note16HZ, note4dotHZ, note8dotHZ, note16dotHZ, note4tripletHZ, note8tripletHZ, note16tripletHZ); 

	//2. Prepare audio files 
	const source1 = await fetch("Audio/kick.wav"); 
	const arrayBuffer1 = await source1.arrayBuffer();
	const kickBuffer = await audioContext.decodeAudioData(arrayBuffer1);
	
	const source2 = await fetch("Audio/snare.wav"); 
	const arrayBuffer2 = await source2.arrayBuffer();
	const snareBuffer = await audioContext.decodeAudioData(arrayBuffer2);
	
	const source3 = await fetch("Audio/hihat.wav"); 
	const arrayBuffer3 = await source3.arrayBuffer();
	const hihatBuffer = await audioContext.decodeAudioData(arrayBuffer3);
	
	//3. Play the loop 
	audioContext = new AudioContext();
	audioContext.resume(); 
	
	let timeDiv = 0; 
	let time = 0; 

	time = 0; 
	timeDiv = iBarLength/iBeats/1000; 		
	for (let iBar=0; iBar < 4; iBar++){
		if (iBeats === 3 && iMeasure === 4){
			console.log (time); 
			console.log (time+timeDiv); 
			console.log (time+timeDiv*2); 

			playSound (kickBuffer,  time); 	
			playSound (snareBuffer, time + timeDiv);
			playSound (snareBuffer, time + timeDiv*2);
			
			for (let i=0; i<6; i++){
				playSound (hihatBuffer, time + timeDiv/2*i);	
			}			
		
		}
		if (iBeats === 4 && iMeasure === 4){
			console.log (time); 
			console.log (time+timeDiv); 
			console.log (time+timeDiv*2); 

			playSound (kickBuffer,  time); 	
			playSound (snareBuffer, time + timeDiv);
			playSound (kickBuffer, time + timeDiv*2);
			playSound (snareBuffer, time + timeDiv*3);
			
			for (let i=0; i<8; i++){
				playSound (hihatBuffer, time + timeDiv/2*i);	
			}
					
		}		
		time = time + iBeatLength/1000*iBeats; 	
	}
}

function playSound(buffer, time) {
	let source = audioContext.createBufferSource();
	source.buffer = buffer;
	source.connect(audioContext.destination);
	source.start(time);
	//https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/start 
}

