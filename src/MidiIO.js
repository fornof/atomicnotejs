var MidiWriter = require('midi-writer-js');
var fs = require('fs').promises
var track = new MidiWriter.Track();
 class MidiIO{
     constructor(){
         this.track = new MidiWriter.Track()
     }

     addNoteEvent(pitch, duration = 4){
         console.log(pitch, duration, "noteEvent")
         if(!Number.isInteger(pitch)){
            let decimals =  pitch.toString().split('.')[1]
            if(decimals && decimals[0] === '1'){
                const wait = duration
                pitch = Math.floor(pitch)
               return new MidiWriter.NoteEvent({wait, duration: duration+""});
                
            }
            pitch = Math.floor(pitch)
         }
         if( typeof pitch === typeof ""){
             pitch = pitch.split("|") // how do I denote a chord? 4|5|6? 
         }
         return new MidiWriter.NoteEvent({pitch:pitch+"", duration:duration+""})
     }

     addNotesToTrack(track, NoteEventArray){
        track.addEvent(NoteEventArray, function(event, index) {
        return {sequential: true};
      })
     }

    newTrack(){
         return new MidiWriter.Track()
     }

     async writeTrack(trackArray, filename){
        var write = new MidiWriter.Writer(trackArray);
        await fs.writeFile(filename|| 'tracker.mid', await write.buildFile())
    
     }
 }

 module.exports = MidiIO

