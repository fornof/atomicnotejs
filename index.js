let ConvertNote = require("./src/ConvertNote")
var Midi = require('./src/MidiIO')
// var MidiLive = require('./src/MidiLiveIO')
var Parser = require('./src/Parser')

class AtomicNote{
    constructor(){
        this.midi = new Midi()
        // this.midiLive = new MidiLive()
        this.parser = new Parser()
        this.convert = new ConvertNote()

        console.log('all imported!')
    }
    async readMidi(readString){
        let midi = this.midi
        let parser = this.parser
        let convert = this.convert
        convert.minor_type = convert.type.MAJOR
        convert.start_note = convert.getStartNoteOffset('c', 4)
        let comment = await parser.getWords(readString)
        let notes = []
        let track = midi.newTrack()
        for(const note of comment){
            let word = await parser.translateToMidi(note)
            notes.push(midi.addNoteEvent(convert.get_note(word[0]),word[1]))
        }
        midi.addNotesToTrack(track, notes)
        console.log(await midi.writeBase64(track ))
      //   console.log(notes)
    }

    async readWeb(readString){
        let midi = this.midi
        let parser = this.parser
        let convert = this.convert
        convert.minor_type = convert.type.MAJOR
        convert.start_note = convert.getStartNoteOffset('c', 4)
        let comment = await parser.getWords(readString)
        let notes = []
        let track = midi.newTrack()
        for(const note of comment){
            let word = await parser.translateToMidi(note)
            const pitch = convert.get_note(word[0])
            const   duration = word[1]
            notes.push({pitch, duration})
        }
        
       return notes
      //   console.log(notes)
    }
}

module.exports = AtomicNote

