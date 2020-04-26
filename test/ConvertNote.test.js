ConvertNote = require("../src/ConvertNote")
var Midi = require('../src/MidiIO')
var Parser = require('../src/Parser')
var assert = require('assert');
var Parser = require('../src/Parser')
describe('ConvertNote', async function() {
  describe('converting things', function() {
    it.only('plays a scale in midi', async function() {
      let midi = new Midi()
      let parser = new Parser()
      let convert = new ConvertNote()
      convert.minor_type = convert.type.MAJOR
      let comment = await parser.getWords('1 2 3 4 5 6 7 8')
      let notes = []
      let track = midi.newTrack()
      for(const note of comment){
          notes.push(midi.addNoteEvent(convert.get_note(note),4))
      }
      midi.addNotesToTrack(track, notes)
      midi.writeTrack(track, 'coolness.mid' )
      console.log(notes)

    });

})
})