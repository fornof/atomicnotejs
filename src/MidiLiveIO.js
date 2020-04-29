let easymidi = require('easymidi')

class MidiLiveIO {
    constructor() {
        this.inflight = new Set()
        this.output = undefined
        this.quarter = 1000
       
    }
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    addNoteEvent(pitch, duration) {
       return { pitch, duration }
    }
    async addNotesToTrack(track, notes){
        track = notes
    }
    newTrack(){
        return []
    }
    async writeTrack(trackArray, synthName = 'fornof'){
        this.output = new easymidi.Output('fornof 1', false);
        this.output.send('start');
        for(const track of trackArray){
            this.output.send('noteon', {
                note: track.pitch,
                velocity: track.velocity || 127,
                channel: track.channel || 0
            });
            await this.sleep(this.quarter / track.duration)
    
            this.output.send('noteoff', {
                note: track.pitch,
                velocity: 0,
                channel: 0
            });
        }
    
     }

}
module.exports = MidiLiveIO

if (typeof require !== 'undefined' && require.main === module) {

   main()
}
async function main (){
    let live = new MidiLiveIO()
    await live.addNoteEvent(64, 1)
    await live.addNoteEvent(64, 1)
    await live.addNoteEvent(64, 1)
    await live.addNoteEvent(64, 1)
    let pitch = 55
    let time = 8
    await live.addNoteEvent(pitch, time)
    await live.addNoteEvent(pitch, time)
    await live.addNoteEvent(pitch, time)
    await live.addNoteEvent(pitch, time)
    await live.addNoteEvent(pitch, time)
     pitch = 44
     time = 16
    await live.addNoteEvent(pitch, time)
    await live.addNoteEvent(pitch, time)
    await live.addNoteEvent(pitch, time)
    await live.addNoteEvent(pitch, time)
    await live.addNoteEvent(pitch, time)
}