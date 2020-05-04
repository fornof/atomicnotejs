class ConvertNote {
    constructor() {
       
        this.type = { MAJOR: "MAJOR", MINOR: "MINOR", MELODIC: "MELODIC", NATURAL: "NATURAL", HARMONIC: "HARMONIC" }
        this.minor_type = this.type.MAJOR
      
        this.track = {} 
        this.track.offset = 0
        this.track.midi_offset = 0
        this.midi_note = {
            "c0": 0 ,
            "c1": 12,
            "c2": 24,
            "c3": 36,
            "c4": 48,
            "c5": 60,
            "c6": 72,
            "c7": 84,
            "c8": 96,
            "c9": 108,
            "c10": 120,
    
            "c0#": 1,
            "c1#": 13,
            "c2#": 25,
            "c3#": 37,
            "c4#": 49,
            "c5#": 61,
            "c6#": 73,
            "c7#": 85,
            "c8#": 97,
            "c9#": 109,
            "c10#": 121,
    
            "d0@": 1,
            "d1@": 13,
            "d2@": 25,
            "d3@": 37,
            "d4@": 49,
            "d5@": 61,
            "d6@": 73,
            "d7@": 85,
            "d8@": 97,
            "d9@": 109,
            "d10@": 121,
    
            "d0": 2,
            "d1": 14,
            "d2": 26,
            "d3": 38,
            "d4": 50,
            "d5": 62,
            "d6": 74,
            "d7": 86,
            "d8": 98,
            "d9": 110,
            "d10": 122,
    
            "d0#": 3,
            "d1#": 15,
            "d2#": 27,
            "d3#": 39,
            "d4#": 51,
            "d5#": 63,
            "d6#": 75,
            "d7#": 87,
            "d8#": 99,
            "d9#": 111,
            "d10#": 123,
    
            "e0@": 3,
            "e1@": 15,
            "e2@": 27,
            "e3@": 39,
            "e4@": 51,
            "e5@": 63,
            "e6@": 75,
            "e7@": 87,
            "e8@": 99,
            "e9@": 111,
            "e10@": 123,
    
            "e0": 4,
            "e1": 16,
            "e2": 28,
            "e3": 40,
            "e4": 52,
            "e5": 64,
            "e6": 76,
            "e7": 88,
            "e8": 100,
            "e9": 112,
            "e10": 124,
    
            "f0": 5,
            "f1": 17,
            "f2": 29,
            "f3": 41,
            "f4": 53,
            "f5": 65,
            "f6": 77,
            "f7": 89,
            "f8": 101,
            "f9": 113,
            "f10": 125,
    
            "f0#": 6,
            "f1#": 18,
            "f2#": 30,
            "f3#": 42,
            "f4#": 54,
            "f5#": 66,
            "f6#": 78,
            "f7#": 90,
            "f8#": 102,
            "f9#": 114,
            "f10#": 126,
    
            "g0@": 6,
            "g1@": 18,
            "g2@": 30,
            "g3@": 42,
            "g4@": 54,
            "g5@": 66,
            "g6@": 78,
            "g7@": 90,
            "g8@": 102,
            "g9@": 114,
            "g10@": 126,
    
            "g0": 7,
            "g1": 19,
            "g2": 31,
            "g3": 43,
            "g4": 55,
            "g5": 67,
            "g6": 79,
            "g7": 91,
            "g8": 103,
            "g9": 115,
            "g10": 127,
    
            "g0#": 8,
            "g1#": 20,
            "g2#": 32,
            "g3#": 44,
            "g4#": 56,
            "g5#": 68,
            "g6#": 80,
            "g7#": 92,
            "g8#": 104,
            "g9#": 116,
    
            "a0@": 8,
            "a1@": 20,
            "a2@": 32,
            "a3@": 44,
            "a4@": 56,
            "a5@": 68,
            "a6@": 80,
            "a7@": 92,
            "a8@": 104,
            "a9@": 116,
    
            "a0": 9,
            "a1": 21,
            "a2": 33,
            "a3": 45,
            "a4": 57,
            "a5": 69,
            "a6": 81,
            "a7": 93,
            "a8": 105,
            "a9": 117,
    
            "a0#": 10,
            "a1#": 22,
            "a2#": 34,
            "a3#": 46,
            "a4#": 58,
            "a5#": 70,
            "a6#": 82,
            "a7#": 94,
            "a8#": 106,
            "a9#": 118,
    
            "b0@": 10,
            "b1@": 22,
            "b2@": 34,
            "b3@": 46,
            "b4@": 58,
            "b5@": 70,
            "b6@": 82,
            "b7@": 94,
            "b8@": 106,
            "b9@": 118,
    
            "b0": 11,
            "b1": 23,
            "b2": 35,
            "b3": 47,
            "b4": 59,
            "b5": 71,
            "b6": 83,
            "b7": 95,
            "b8": 107,
            "b9": 119
            }
            this.midi_to_letter = {
            0 : "c0",
            12: "c1",
            24: "c2",
            36: "c3",
            48: "c4",
            60: "c5",
            72: "c6",
            84: "c7",
            96: "c8",
            108: "c9",
            120: "c10",
    
            1: "c0#",
            13: "c1#",
            25: "c2#",
            37: "c3#",
            49: "c4#",
            61: "c5#",
            73: "c6#",
            85: "c7#",
            97: "c8#",
            109: "c9#",
            121: "c10#",
    
            1: "d0@",
            13: "d1@",
            25: "d2@",
            37: "d3@",
            49: "d4@",
            61: "d5@",
            73: "d6@",
            85: "d7@",
            97: "d8@",
            109: "d9@",
            121: "d10@",
    
            2: "d0",
            14: "d1",
            26: "d2",
            38: "d3",
            50: "d4",
            62: "d5",
            74: "d6",
            86: "d7",
            98: "d8",
            110: "d9",
            122: "d10",
    
            3: "d0#",
            15: "d1#",
            27: "d2#",
            39: "d3#",
            51: "d4#",
            63: "d5#",
            75: "d6#",
            87: "d7#",
            99: "d8#",
            111: "d9#",
            123: "d10#",
    
            3: "e0@",
            15: "e1@",
            27: "e2@",
            39: "e3@",
            51: "e4@",
            63: "e5@",
            75: "e6@",
            87: "e7@",
            99: "e8@",
            111: "e9@",
            123: "e10@",
    
            4: "e0",
            16: "e1",
            28: "e2",
            40: "e3",
            52: "e4",
            64: "e5",
            76: "e6",
            88: "e7",
            100: "e8",
            112: "e9",
            124: "e10",
    
            5: "f0",
            17: "f1",
            29: "f2",
            41: "f3",
            53: "f4",
            65: "f5",
            77: "f6",
            89: "f7",
            101: "f8",
            113: "f9",
            125: "f10",
    
            6: "f0#",
            18: "f1#",
            30: "f2#",
            42: "f3#",
            54: "f4#",
            66: "f5#",
            78: "f6#",
            90: "f7#",
            102: "f8#",
            114: "f9#",
            126: "f10#",
    
            6: "g0@",
            18: "g1@",
            30: "g2@",
            42: "g3@",
            54: "g4@",
            66: "g5@",
            78: "g6@",
            90: "g7@",
            102: "g8@",
            114: "g9@",
            126: "g10@",
    
            7: "g0",
            19: "g1",
            31: "g2",
            43: "g3",
            55: "g4",
            67: "g5",
            79: "g6",
            91: "g7",
            103: "g8",
            115: "g9",
            127: "g10",
    
            8: "g0#",
            20: "g1#",
            32: "g2#",
            44: "g3#",
            56: "g4#",
            68: "g5#",
            80: "g6#",
            92: "g7#",
            104: "g8#",
            116: "g9#",
    
            8: "a0@",
            20: "a1@",
            32: "a2@",
            44: "a3@",
            56: "a4@",
            68: "a5@",
            80: "a6@",
            92: "a7@",
            104: "a8@",
            116: "a9@",
    
            9: "a0",
            21: "a1",
            33: "a2",
            45: "a3",
            57: "a4",
            69: "a5",
            81: "a6",
            93: "a7",
            105: "a8",
            117: "a9",
    
            10: "a0#",
            22: "a1#",
            34: "a2#",
            46: "a3#",
            58: "a4#",
            70: "a5#",
            82: "a6#",
            94: "a7#",
            106: "a8#",
            118: "a9#",
    
            10: "b0@",
            22: "b1@",
            34: "b2@",
            46: "b3@",
            58: "b4@",
            70: "b5@",
            82: "b6@",
            94: "b7@",
            106: "b8@",
            118: "b9@",
    
            11: "b0",
            23: "b1",
            35: "b2",
            47: "b3",
            59: "b4",
            71: "b5",
            83: "b6",
            95: "b7",
            107: "b8",
            119: "b9"
            }
            this.start_note = this.getStartNoteOffset('d',3,0, true)
    }
    print(msg) {
        console.log(msg)
    }

    
    getStartNoteOffset(key, octave=3, sharp_flat = 0, zeroOffset = true ){
        if (typeof octave  === typeof 0){
            octave = octave.toString()
        }
        if (typeof key == typeof 0){
            if (zeroOffset && key > -1 ){
                key -=2
            }
        }
        if (sharp_flat == 0 ){
            return this.midi_note[key+''+octave]
            
        }        
        else{
            let step = ['@','#'][sharp_flat != -1]
            console.log('step', step)
            if (step == '@') {
                if( key == 'f' || key == 'c'){
                    step = ''
                    key  = String.fromCharCode(key.charCodeAt(0)-1) // decrement by one half step
                }
                
            }
            if (step == '#'){
                if (key == 'e' || key == 'd'){
                    step = ''
                    key  = String.fromCharCode(key.charCodeAt(0)+1) // increment by one half step
            
                }
            }
            // if(zeroOffset){
            //     key = String.fromCharCode(key.charCodeAt(0)-1)
            // }
            return self.midi_note[ key+""+octave+step]
        }
    
    }
    isAlpha(ch){
        return /^[A-Z]$/i.test(ch);
    }

    get_place( decimal = undefined, place = 0) {
        let minus = 1

        if (decimal == undefined) {
            return undefined
        }
        if (decimal < 0) {
            minus = -1
        }
        if (place == 0) {
            return parseInt(decimal)
        }
    
    return Math.floor(Math.abs(decimal) * 10 ** place) % 10 * minus
}
round(number, times=1000){
    return Math.round(times*number)/times
}

calculateOffset(my_note, minus){
    let note = Math.floor(my_note) % 7 

    let offset = 0
    
    if (minus === 1) {
        //offset = Math.floor((my_note - note) / 7) * 12
        offset = Math.floor((my_note - note) / 7) *12
    }
    else {
        //offset = (Math.abs(my_note - note) / 7) * 12
        offset = Math.floor((Math.abs(my_note - note) / 7)) *12
    }
    console.log([offset,note])
    return [offset, note] 
}

get_note(my_note, zeroOffset = true) {
    if(my_note === undefined){
        return undefined
    }
    let minus = 1
    let [whole,decimals] =  my_note.toString().split('.')
    let left = parseInt(whole)
    if(left < 0){
        minus = -1
    }
  
     if(zeroOffset){

        if( left > 0){
            left -= 1
        } 
        else{
           // left +=1
        // say hi to your momma!
        }
    }
  
    
     
    let [offset,note] = this.calculateOffset(left, minus)
    // if (offset != 0) {
    //     continue
    // }
    // if (typeof note === typeof "letter") {
    //     continue
    // }
    
    let decimal = parseFloat(decimals) || 0
    let sharpflat = 0
    //console.log('getnote, decimal' , decimal,'decimals', decimals,'mynote', left, 'note',note)
    console.log(left, zeroOffset, decimal)
 
    if (this.minor_type == this.type.MAJOR) {
        return this.handle_major(note, offset, minus, sharpflat, decimal)
    }
    if (this.minor_type == this.type.MELODIC) {
        return this.handle_melodic(note, offset, minus, sharpflat, decimal)
    }
    if (this.minor_type == this.type.NATURAL) {
        return this.handle_natural(note, offset, minus, sharpflat, decimal)
    }
    if (this.minor_type == this.type.HARMONIC) {
        return this.handle_harmonic(note, offset, minus, sharpflat, decimal)
    }
}

handle_melodic(note, offset = 0, minus = 1, sharpflat = 0, decimal = 0) {
    //W H W W W W
    let W = 2
    let H = 1
    //descending :W W H W W H
    let added_offsets = this.start_note + (offset) * minus + sharpflat + this.track.midi_offset + decimal
    if (note == 0) {
        return added_offsets //starting note
    }
    else if (note == 1) {
        return W + added_offsets
    }
    else if (note == 2) {
        return W + H + added_offsets
    }
    else if (note == 3) {
        return W + H + W + added_offsets
    }
    else if (note == 4) {
        return W + H + W + W + added_offsets
    }
    else if (note == 5) {
        return W + H + W + W + W + added_offsets
    }
    else if (note == 6) {
        return W + H + W + W + W + W + added_offsets
    }
    else if (note == -1) {
        return W + added_offsets //NOT DONE
    }
    else if (note == -2) {
        return W + W + H + added_offsets //NOT DONE
    }
    else if (note == -3) {
        return W + W + H + W + added_offsets
    }
    else if (note == -4) {
        return W + W + H + W + added_offsets
    }
    else if (note == -5) {
        return W + W + H + W + W + added_offsets
    }
    else if (note == -6) {
        return W + W + H + W + W + H + added_offsets
    }
}
handle_harmonic(note, offset = 0, minus = 1, sharpflat = 0, decimal = 0) {
    let W = 2
    let H  = 1
    let error = 125
    let added_offsets = this.start_note + (offset) * minus + sharpflat + this.track.midi_offset + decimal
    if (note == 0) {

        return added_offsets //starting note
    }
    else if (note == 1) {
        return W + added_offsets
    }
    else if (note == 2) {
        return W + H + added_offsets
    }
    else if (note == 3) {
        return W + H + W + added_offsets
    }
    else if (note == 4) {
        return W + H + W + W + + added_offsets
    }
    else if (note == 5) {
        return W + H + W + W + H + added_offsets
    }
    else if (note == 6) {
        return W + H + W + W + H + (W + H) + added_offsets
    }
    else if (note == -1) {
        return error //NOT DONE
    }
    else if (note == -2) {
        return error //NOT DONE
    }
    else if (note == -3) {
        return error
    }
    else if (note == -4) {
        return error
    }
    else if (note == -5) {
        return error
    }
    else if (note == -6) {
        return error
    }
}
handle_natural(note, offset = 0, minus = 1, sharpflat = 0, decimal = 0) {
    let whole_step = 2
    let half_step = 1
    let error = 99
    let added_offsets = this.start_note + (offset) * minus + sharpflat + this.track.midi_offset + decimal
    if (note == 0) {
        return added_offsets //starting note
    } else if (note == 1) {
        return whole_step + added_offsets
    } else if (note == 2) {
        return whole_step + half_step + added_offsets
    } else if (note == 3) {
        return whole_step + half_step + whole_step + added_offsets
    } else if (note == 4) {
        return whole_step + half_step + whole_step + half_step + added_offsets
    } else if (note == 5) {
        return whole_step + half_step + whole_step + half_step + whole_step * 1 + added_offsets
    } else if (note == 6) {
        return whole_step + half_step + whole_step + half_step + whole_step * 2 + added_offsets
    } else if (note == -1) {
        return error
    } else if (note == -2) {
        return error //NOT DONE
    } else if (note == -3) {
        return error
    } else if (note == -4) {
        return error
    } else if (note == -5) {
        return error
    } else if (note == -6) {
        return error
    }
}
handle_major(note, offset = 0, minus = 1, sharpflat = 0, decimal = 0) {
   let  whole_step = 2
   let  half_step = 1
   // console.log('handle major',note, offset, decimal, this.start_note)
    //added_offsets = this.start_note + (offset)*minus + sharpflat + decimal
    note = Math.floor(note)
    if (note == 0) {
        return this.start_note + (offset) * minus + sharpflat + this.track.midi_offset + decimal
    } else if (note == 1) {
        return this.start_note + (whole_step * 1 + offset) + sharpflat + this.track.midi_offset + decimal
    } else if (note == 2) {
        return this.start_note + (whole_step * 2 + offset) + sharpflat + this.track.midi_offset + decimal
    } else if (note == 3) {
        return this.start_note + (whole_step * 2 + half_step + offset) + sharpflat + this.track.midi_offset + decimal
    } else if (note == 4) {
        return this.start_note + (whole_step * 2 + half_step + whole_step * 1 + offset) + sharpflat + this.track.midi_offset + decimal
    } else if (note == 5) {
        return this.start_note + (whole_step * 2 + half_step + whole_step * 2 + offset) + sharpflat + this.track.midi_offset + decimal
    } else if (note == 6) {
        return this.start_note + (whole_step * 2 + half_step + whole_step * 3 + offset) + sharpflat + this.track.midi_offset + decimal
    } else if (note == -1) {
        return  this.start_note + (half_step * 1 + offset) * minus + sharpflat + this.track.midi_offset + decimal
    } else if (note == -2) {
        return  this.start_note + (half_step * 1 + whole_step * 1 + offset) * minus + sharpflat + this.track.midi_offset + decimal
    } else if (note == -3) {
        return  this.start_note + (half_step * 1 + whole_step * 2 + offset) * minus + sharpflat + this.track.midi_offset + decimal
    } else if (note == -4) {
        return  this.start_note + (half_step * 1 + whole_step * 3 + offset) * minus + sharpflat + this.track.midi_offset + decimal
    } else if (note == -5) {
        return  this.start_note + (half_step * 1 + whole_step * 3 + half_step * 1 + offset) * minus + sharpflat + this.track.midi_offset + decimal
    } else if (note == -6) {
        return this.start_note + (half_step * 1 + whole_step * 3 + half_step * 1 + whole_step + offset) * minus + sharpflat + this.track.midi_offset + decimal
    }
    // if(note == 0 ){
    //     return  added_offsets
    // else if(note == 1){
    //     return whole_step*1  + added_offsets
    // else if(note == 2){
    //     return  whole_step*2 + added_offsets
    // else if(note == 3 ){
    //     return  whole_step*2 + half_step + added_offsets
    // else if(note == 4){
    //     return  whole_step*2 + half_step + whole_step*1 + added_offsets
    // else if(note == 5 ){
    //     return  whole_step*2 + half_step + whole_step*2  +added_offsets
    // else if(note == 6 ){
    //     return  whole_step*2 + half_step + whole_step*3  + added_offsets
    // else if(note == -1){
    //     return  (half_step*1 + offset)*minus + added_offsets
    // else if(note == -2){
    //     return  (half_step*1 + whole_step*1)*minus + added_offsets
    // else if(note == -3){
    //     return  (half_step*1 + whole_step*2)*minus + added_offsets
    // else if(note == -4){
    //     return  (half_step*1 + whole_step*3)*minus  + added_offsets
    // else if(note == -5){
    //     return  (half_step*1 + whole_step*3+ half_step*1)*minus + added_offsets
    // else if(note == -6){
    //     return  (half_step*1 + whole_step*3+half_step*1+whole_step)*minus + added_offsets
}
}
module.exports = ConvertNote