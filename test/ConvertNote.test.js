let ConvertNote = require("../src/ConvertNote")
var Midi = require('../src/MidiIO')
var Parser = require('../src/Parser')
var assert = require('assert');
var Parser = require('../src/Parser')
describe('ConvertNote', async function() {
  describe('converting things', function() {
    it('plays a scale in midi', async function() {
      let midi = new Midi()
      let parser = new Parser()
      let convert = new ConvertNote()
      convert.start_note = convert.getStartNoteOffset('c',3,0, true)
      convert.minor_type = convert.type.MAJOR
      let comment = await parser.getWords('1 2 3 4 5 6 7 8')
      let notes = []
      let track = midi.newTrack()
      for(const note of comment){
          notes.push(midi.addNoteEvent(convert.get_note(note),4))
      }
      midi.addNotesToTrack(track, notes)
    //   midi.writeTrack(track, 'coolness.mid' )
       console.log(notes)

    });

    it('plays a c scale', async function() {
        let midi = new Midi()
        let parser = new Parser()
        let convert = new ConvertNote()
        convert.minor_type = convert.type.MAJOR
        convert.start_note = convert.getStartNoteOffset('c',3,0, true)
        console.log('startkey = ',convert.start_note)
        let comment = await parser.getWords('1 2 3 4 5 6 7 8')
        let notes = []
        let track = midi.newTrack()
        for(const note of comment){
            notes.push(midi.addNoteEvent(convert.get_note(note),4))
        }
        midi.addNotesToTrack(track, notes)
    
  
      });
      
    it('plays a c harmonic minor scale', async function() {
        let midi = new Midi()
        let parser = new Parser()
        let convert = new ConvertNote()
        convert.minor_type = convert.type.HARMONIC
        convert.start_note = convert.getStartNoteOffset('c',3,0, true)
        console.log('startkey = ',convert.start_note)
        let comment = await parser.getWords('1 2 3 4 5 6 7 8')
        let notes = []
        let track = midi.newTrack()
        for(const note of comment){
            notes.push(midi.addNoteEvent(convert.get_note(note),4))
        }
        midi.addNotesToTrack(track, notes)
       
  
      });
      it('plays a c melodic minor scale', async function() {
        let midi = new Midi()
        let parser = new Parser()
        let convert = new ConvertNote()
        convert.minor_type = convert.type.MELODIC
        convert.start_note = convert.getStartNoteOffset('c',3,0, true)
        console.log('startkey = ',convert.start_note)
        let comment = await parser.getWords('1 -1')
        let notes = []
        let track = midi.newTrack()
        for(const note of comment){
            notes.push(midi.addNoteEvent(convert.get_note(note),1))
        }
        midi.addNotesToTrack(track, notes)
        //midi.writeTrack(track, 'coolness.mid' )
        //console.log(notes)
      
      });

      it('give me a scale in major', async function() {
        let midi = new Midi()
        let parser = new Parser()
        let convert = new ConvertNote()
        convert.minor_type = convert.type.MAJOR
        convert.start_note = convert.getStartNoteOffset('c',4,0, true)
        console.log('startkey = ',convert.start_note)
        let comment = await parser.getWords('1 -1')
        let notes = []
        let track = midi.newTrack()
        for(const note of comment){
            notes.push(midi.addNoteEvent(convert.get_note(note),1))
        }
        midi.addNotesToTrack(track, notes)
        //midi.writeTrack(track, 'coolness.mid' )
        //console.log(notes)
      
      });

})
})