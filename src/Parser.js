class Parser{
    constructor(offset){
        this.offset = offset || 50
        this.last ={}
        this.last.duration = 16
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
            note = this.last.note
        }
        this.last.note = note
        
        return [this.last.note,this.last.duration ]
    }
    async getWords(inString){
        
        let words = inString.split(" ")
        return words
    }
    async handleStep(wordArray){
        if(Number.isInteger(wordArray[0])){
            return
        }
       let decimals =  wordArray[0].toString().split('.')[1]
       if(decimals && decimals[0] === '2'){
           wordArray[0] = Math.floor(wordArray[0]) -1
       }
       if(decimals && decimals[0] === '3'){
        wordArray[0] =Math.floor(wordArray[0])+ 1
    }
    }
    async translateToMidi(inWordString){
        let word = (await this.wordStringToArray(inWordString))
        await this.handleStep(word)
        console.log([word[0] + this.offset, word[1]], 'nnotee')
        return [word[0] + this.offset, word[1]]
    }
}
module.exports = Parser