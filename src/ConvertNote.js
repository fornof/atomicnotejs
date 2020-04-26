class ConvertNote {
    constructor() {
        this.type = { MAJOR: "MAJOR", MINOR: "MINOR", MELODIC: "MELODIC", NATURAL: "NATURAL", HARMONIC: "HARMONIC" }
        this.minor_type = this.type.MAJOR
        this.start_note = 40
        this.track = {} 
        this.track.offset = 0
        this.track.midi_offset = 0
    }
    print(msg) {
        console.log(msg)
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

get_note(my_note, offset) {
    let minus = 1
    if(my_note < 1){
        minus = -1
    }
    let note = my_note % 7 
     if (minus === 1) {
         offset = Math.floor((my_note - note) / 7) * 12
     }
     else {
         offset = parseInt(Math.fabs(my_note - note) / 7) * 12
     }
    // if (offset != 0) {
    //     continue
    // }
    // if (typeof note === typeof "letter") {
    //     continue
    // }
  
    let sharpflat = 0
    let decimal = 0
 
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
    let W = whole_step = 2
    let H = half_step = 1
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
    let W = whole_step = 2
    let H = half_step = 1
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


    //added_offsets = this.start_note + (offset)*minus + sharpflat + decimal

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
        return this.start_note + (half_step * 1 + offset) * minus + sharpflat + this.track.midi_offset + decimal
    } else if (note == -2) {
        return this.start_note + (half_step * 1 + whole_step * 1 + offset) * minus + sharpflat + this.track.midi_offset + decimal
    } else if (note == -3) {
        return this.start_note + (half_step * 1 + whole_step * 2 + offset) * minus + sharpflat + this.track.midi_offset + decimal
    } else if (note == -4) {
        return this.start_note + (half_step * 1 + whole_step * 3 + offset) * minus + sharpflat + this.track.midi_offset + decimal
    } else if (note == -5) {
        return this.start_note + (half_step * 1 + whole_step * 3 + half_step * 1 + offset) * minus + sharpflat + this.track.midi_offset + decimal
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