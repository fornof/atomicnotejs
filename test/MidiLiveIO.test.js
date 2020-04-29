let ConvertNote = require("../src/ConvertNote")
var Midi = require('../src/MidiLiveIO')
var Parser = require('../src/Parser')
var assert = require('assert');
var Parser = require('../src/Parser')
describe('Convert Live', async function() {
  describe('converting things', function() {
    it('plays a scale in midi live', async function() {
      let midi = new Midi()
      let parser = new Parser()
      let convert = new ConvertNote()
      convert.minor_type = convert.type.MAJOR
      convert.start_note = convert.getStartNoteOffset('d',3,0, true)
      let comment = await parser.getWords('1 2 3 4 5 6 7 8')

      let notes = []
      let track = midi.newTrack()
      for(const note of comment){
          notes.push(midi.addNoteEvent(convert.get_note(note),4))
      }
      console.log('notes', notes)
       midi.writeTrack(notes, 'fornof 1' )
    //   console.log(notes)

    });
})
})