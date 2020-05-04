class Parser{
    constructor(offset){
        this.offset = offset || 50
        this.last ={}
        this.last.duration = 4
        this.config = {}
        this.config.decimals = {  rest:'1', flat:'2', sharp:'3' ,chord: '4'}
        this.config.single = {one:'1', two: '2', three:'3', four: '4', five: '5', six: '6' , seven: '7'
        , eight:'8', nine:'9', zero:'0'}
        this.mode = {}
        this.mode.passthrough = 0
    }
    async getComment(commentString){
        return commentString.split("//")[1]
    }
    async wordStringToArray(inWordString){
        if(typeof inWordString === typeof 0  ){
            inWordString = inWordString.toString()
        }
        let array = inWordString.split(":")
        this.last.duration = parseFloat(array[1]) || this.last.duration
        let note = parseFloat(array[0]) 
        if(note === 0 ){
            if(this.mode.passthrough === 0){
            note = this.last.note
            }
            else{
                return [undefined,undefined]
            }

        }
        this.last.note = note
        
        return [this.last.note,this.last.duration ]
    }
    async getWords(inString){
        
        let words = inString.split(" ")
        return words
    }
    round(number, times=1000){
        return Math.round(times*number)/times
    }
    handleNoteDecimals(wordArray){
        let [whole,decimals] =  wordArray[0].toString().split('.')
        let left = parseInt(whole)
        if(decimals){
            let steps = 1
            let stepIn = decimals[1] || 1
            if (stepIn){
                steps = parseInt(stepIn)
            }
            switch(decimals[0]){
                case this.config.decimals.flat:
                    left -= steps
                    if(left === 0 ){  left--  }
                    break
                case this.config.decimals.sharp:
                    left += steps
                    if(left === 0 ){  left++ }
                    break
            }
        }
    
        wordArray[0]= parseFloat(left.toString() + "." + decimals)
    }
    async handleStep(wordArray){
        if(Number.isInteger(wordArray[0]) || wordArray[0] === undefined){
            return
        }
      this.handleNoteDecimals(wordArray)
    // this is by reference so no returning, wordArray[0] returns for us
    }
    async translateToMidi(inWordString){
        let word = (await this.wordStringToArray(inWordString))
        //console.log('translate to midi', word)
        await this.handleStep(word)
        //console.log('translate to midi2', word)
        return word
    }
}
module.exports = Parser