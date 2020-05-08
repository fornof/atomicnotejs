var assert = require('assert');
let ConvertNote = require("../src/ConvertNote")
var Parser = require('../src/Parser')
describe('Parser', async function() {
  describe('Handling things', function() {
    it('handleCommentsShouldPrint only return the comment', async function() {
      let parser = new Parser()
      let comment = await parser.getComment("ThisIs a test//this should output now")
      assert(comment === "this should output now" )
    });
    it('should return a note in midi numbers given a note instring ', async function() {
        let parser = new Parser()
        let offset = 50
        let words = await parser.getWords("1")
        console.log(words, typeof words)
        assert(words[0] ===  '1' )
        assert((await parser.translateToMidi(words[0]))[0] === parseInt(words[0]))
        
        
      });
      it('should return a scale in midi numbers given a note instring ', async function() {
        let parser = new Parser()
        let offset = 50
        let words = await parser.getWords("1 2 3 4 5 6 7 8")
        assert(words[0] ===  '1' )
        for(const i in words){
          assert((await parser.translateToMidi(words[i]))[0] === parseInt(words[i]))
        }
       
  
      
    
  });
  it('should return all the same number given 1 0 0 0 0 0  ', async function() {
    let parser = new Parser()
    let words = await parser.getWords("1 0 0 0 0 0 0 0")
   
    let notes = []
    assert(words[0] ===  '1' )
    await parser.translateToMidi('2')
    let lastCall = (await parser.translateToMidi('0'))[0]
    //console.log(notes, 'last call', lastCall)
    assert(lastCall === 2) 

});

it('should return all the same number with different beats given 1 0:16 0 0 0 0  ', async function() {
  let parser = new Parser()
  let words = await parser.getWords("1:8 0:16 0 0 0 0 0 0")
 
  let notes = []
  for(const i in words){
    notes.push(await parser.translateToMidi(words[i]))
  }
  
  // console.log(notes, notes[0], typeof notes[0],[51,8])
  assert(notes[0][1] === 8) 
  assert(notes[7][1] === 16) 
});
it('should go down halfstep 1.2 1.2 1 1.2  ', async function() {
  let parser = new Parser()
  let words = await parser.getWords("1.2 1.2 1 1.2")
  let convert = new ConvertNote()
  let notes = []
  for(const i in words){
    const noteMidi = await parser.translateToMidi(words[i])
   
    noteMidi[0] = convert.get_note(noteMidi[0])
    notes.push(noteMidi )
  }
  console.log(notes[0], notes[3])
  assert(notes[0][0] === 39) 
  assert(notes[3][0] === 39) 
});
it('should go up halfstep 1.3 1.3 1 1.3  ', async function() {
  let parser = new Parser()
  let words = await parser.getWords("1.3 1.3 1 1.3")
  let convert = new ConvertNote()
  let notes = []
  for(const i in words){
    const noteMidi = await parser.translateToMidi(words[i])
          //console.log(noteMidi)
          noteMidi[0] = convert.get_note(noteMidi[0])
          notes.push(noteMidi )
  }
  //console.log(notes[0][0], notes[3][0])
  assert(notes[0][0] === 43) 
   assert(notes[3][0] === 43) 
});

// it.only('should go down halfstep 1.1:4 1.1:8  ', async function() {
//   let parser = new Parser()
//   let words = await parser.getWords("1:1:4 1.1:8")
 
//   let notes = []
//   for(const i in words){
//     notes.push(await parser.translateToMidi(words[i]))
//   }
  
//    console.log(notes, notes[0], typeof notes[0],[51,8])
//   assert(notes[0][0] === 52) 
//   assert(notes[3][0] === 52) 
// });
    
});

      
    
});


