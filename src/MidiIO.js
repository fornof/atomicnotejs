var MidiWriter = require('midi-writer-js');
var fs = require('fs').promises
var track = new MidiWriter.Track();
 class MidiIO{
     constructor(){
         this.track = new MidiWriter.Track()
         this.midiWriter = MidiWriter
         this.config = {}
         this.config.decimals = { chord: '4' , rest:'1'}
         this.config.chordCases = {one:'1', two: '2', three:'3', four: '4'}
         this.currentTick = 0
         this.remain = {}
         this.remain.chord = 0
     }

     addNoteEvent(pitch, duration,startTick, incrementCurrentTick = true){
         startTick = startTick || this.currentTick
         console.log(pitch, duration, "noteEvent")
         if(pitch && !Number.isInteger(pitch)){
             
            let decimals =  pitch.toString().split('.')[1]
            if(decimals){
                switch(decimals[0]){
                    case this.config.decimals.rest:
                    const wait = duration
                    pitch = Math.floor(pitch)
                    if(incrementCurrentTick){
                        this.currentTick += MidiWriter.Utils.getTickDuration(duration)
                    }
                    return new MidiWriter.NoteEvent({startTick, wait, duration: duration+""});
                
                    case this.config.decimals.chord:
                        switch(decimals[1] || '3'){
                            case this.config.chordCases.one:
                                this.remain.chord = 1
                                break
                            case this.config.chordCases.two :
                                this.remain.chord = 2
                                break
                            case this.config.chordCases.three :
                                this.remain.chord = 3
                                break
                            case this.config.chordCases.four :
                                this.remain.chord = 4
                                break
                        }

                        pitch = Math.floor(pitch)
                        console.log('pitching a chord')
                        incrementCurrentTick = false
                        break;
        }

        }
            pitch = Math.floor(pitch)
         }
         if( typeof pitch === typeof ""){
             pitch = pitch.split("|") // how do I denote a chord? 4|5|6? 
         }
        // console.log('chord', this.remain.chord)
         this.decrement()
         if(!this.remain.chord &&  incrementCurrentTick  ){
            this.currentTick += MidiWriter.Utils.getTickDuration(duration)
        }
          // decrement all that remains

         return new MidiWriter.NoteEvent({startTick, pitch:pitch+"", duration:duration+""})
     }
     decrement(){
         for(const remaining of Object.keys(this.remain)){
             //console.log(this.remain[remaining])
             if( this.remain[remaining] > 0 ){
                 console.log('remain',this.remain, this.remain[remaining])
                this.remain[remaining] = this.remain[remaining] -1
             }
         }
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
     async writeBase64(trackArray){
        var write = new MidiWriter.Writer(trackArray);
         return write.dataUri()
    
     }
 }

 module.exports = MidiIO

