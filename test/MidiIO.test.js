var assert = require('assert');
var MidiIO = require('../src/MidiIO')
var Parser = require('../src/Parser')
let ConvertNote = require("../src/ConvertNote")
describe('MidiIo', async function() {
  describe('IO things', function() {
    it('should return a scale in midi numbers given a note instring ', async function() {
        let parser = new Parser()
        let midi = new MidiIO
        let words = await parser.getWords("1 2 3 4 5 6 7 8")
        console.log(words, typeof words)
        assert(words[0] ===  '1' )
        let track = midi.newTrack()
        let notes = []
        for(const i in words){
        notes.push(midi.addNoteEvent(await parser.translateToMidi(words[i]),4))
        }
        
        
        
        
      });
      it('should return a scale in 8th notes given a note in string ', async function() {
        let parser = new Parser()
        let midi = new MidiIO()
        let words = await parser.getWords("1:16 2 3 4 5:32 6 7 8 9 10")
        console.log(words[0], typeof words)
         assert(words[0] ===  '1:16' )
        let track = midi.newTrack()
        let notes = []
        for(const i in words){        
            let noteMidi = await parser.translateToMidi(words[i])
            console.log(noteMidi)
            notes.push(midi.addNoteEvent(...noteMidi ))
            
        }
       
       //assert(await parser.translateToMidi(words[i]) === parser.offset+ parseInt(words[i]))
  
    });

    it('should play rest in  1.1:4 2 1.1:4 4 5 6 7 8  ', async function() {
        let parser = new Parser()
        let words = await parser.getWords("1.1:4 2 1.1:4 4 5 6 7 8")
        let midi = new MidiIO()
        let track = midi.newTrack()
        let notes = []
        for(const i in words){
          const noteMidi = await parser.translateToMidi(words[i])
          console.log(noteMidi)
          notes.push(midi.addNoteEvent(...noteMidi ))
        }
        
         console.log(notes, typeof notes[0])
         midi.addNotesToTrack(track,notes)
    
      });
      //a C E G chord given 0.4 3 5 , 1.43 3 5
      it('should play a chord ', async function() {
        let parser = new Parser()
        let words = await parser.getWords("1.43:4 3 5 6:4 0 0 0 0 0 0 0")
        let midi = new MidiIO()
        let track = midi.newTrack()
        let convert = new ConvertNote() 
        convert.start_note = convert.getStartNoteOffset('d',3,0, true)
        console.log('startkey = ',convert.start_note)
        let notes = []
        for(const i in words){
          const noteMidi = await parser.translateToMidi(words[i])
          console.log(noteMidi)
          noteMidi[0] = convert.get_note(noteMidi[0])
          notes.push(midi.addNoteEvent(...noteMidi ))
        }
        
         console.log(notes, typeof notes[0])
         midi.addNotesToTrack(track,notes)
         await midi.writeTrack([track],'scale5.mid')
      });

    });
});