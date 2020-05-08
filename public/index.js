async function playNotes(notes, highlight) {
  
    console.log(notes)
    let jazz = JZZ().or('Cannot start MIDI engine!')
        .openMidiOut().or('Cannot open MIDI Out port!')
        if(highlight){
        for (const note of highlight) {
            note.svg.style.fill = 'rgb(0,0,0)'
        }
    }
        let previous = undefined
    for (const i in  notes) {
        
        JZZ().or('Cannot start MIDI engine!')
            .openMidiOut().or('Cannot open MIDI Out port!')
            .send([0x90, notes[i].pitch, 127]) // note on
            //.wait(1 / note.duration * 1000)
            draw.handleTxtHightlight(i)
      
            if(highlight &&highlight.length > 0){
                if(previous){
                    previous.svg.style.fill = 'rgb(0,0,0)'
                }
                previous = highlight[i]
                highlight[i].svg.style.fill = 'rgb(0, 22, 256)'
                draw.get('txtNote').innerHTML = highlight[i].name
            }
           console.log('duration to sleep',notes[i].duration)
        await sleep((1 / notes[i].duration) * 1500)
     
        JZZ().or('Cannot start MIDI engine!')
            .openMidiOut().or('Cannot open MIDI Out port!')
            .send([0x80, notes[i].pitch, 0]);  // note off
    }
    JZZ().openMidiIn().or('Cannot open MIDI In port!')
        .and(function () { console.log('MIDI-In: ', this.name()); })
        .connect(function (msg) { console.log(msg.toString()); })
        .wait(10000).close();
}

class DrawNote {
    constructor() {
        this.txtArray = [] // contains all text in the song
        this.notes = []// contains all the notes in the song,
        this.noteOffset = {}
        this.id = {}
        this.id.stave = 0
        this.staves = []
        this.staveNoteMax = 15
        this.midiToLetter = {
            0: "c0",
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
        this.octaveY = 42
       this.noteY = 6
        this.noteX = 30
        this.crossThreshold = 30
        // this is c3
        this.letterToY = {}

        
        this.letterToY['b'] =-1 *this.noteY,
        this.letterToY['a'] =0 *this.noteY,
        this.letterToY['g'] =this.noteY,
        this.letterToY['f'] =2 *this.noteY,
        this.letterToY['e'] =3 *this.noteY,
        this.letterToY['d'] =4 *this.noteY,
        this.letterToY['c'] = 5 *this.noteY,
        
        
        this.YToLetter = {}
        // +18 , -18  ||-  x %36 -18
        this.YToLetter[-3 *this.noteY] = 'd'
        this.YToLetter[-2 *this.noteY] = 'c'
        this.YToLetter[-1 *this.noteY] = 'b'
        this.YToLetter[0 *this.noteY] = 'a'
        this.YToLetter[1 *this.noteY] = 'g'
        this.YToLetter[2 *this.noteY] = 'f'
        this.YToLetter[2 *this.noteY] = 'e'
        this.previousNote = undefined
    }
    //spits out highlight of current index
    handleTxtHightlight(index){
        
        const highlighter = this.get('txtHighlight')
        highlighter.innerHTML =""
        

        // todo - redo this so its not so iterative - so highlight is removed from the previous and added to the current span
        for(let i = 0 ; i <  this.txtArray.length; i++){
            // console.log('inex',index, this.txtArray, typeof index === typeof i)
            if(i == index){
                console.log('index hit!',index, i)
                highlighter.innerHTML +=  ` <span class="highlighted">${this.txtArray[i]}</span>`
            }
            else{
                highlighter.innerHTML += ` <span>${this.txtArray[i]}</span>`
            }
            
        }
        
    }
    calculateY(midiNote, duration) {
        let letter = this.midiToLetter[midiNote]
        const calculation = this.letterToY[letter[0]] - this.octaveY *( parseInt(letter[1])-4)
        console.log('letters',letter[0],this.octaveY *( parseInt(letter[1])-4),this.letterToY[letter[0]] - this.octaveY *( parseInt(letter[1])-4))
        return [calculation, letter]
    }

    get(id) {
        return document.getElementById(id)
    }
    getTag(parent, id) {
        let doc = this.get(parent)
        return doc.getElementsByTagName(id)
    }
    clone(obj) {
        const newGuy = obj.cloneNode(true)
        return newGuy
    }
    async  loadSvg(id, svgUrl, parent = 'container', addToParent = true) {
        let data = (await axios.get(svgUrl)).data
        let el = document.createElement("div")
        if (!this.get(id)) {
            el.setAttribute('id', id)
        }
        el.innerHTML = data
        if (addToParent) {
            let rent = this.get(parent)
            if (rent) {
                rent.appendChild(el)
            }
            else {
                console.log(parent, 'not found')
            }

            let svg = this.getTag(id, 'svg')[0]
            return svg
        }
        console.log(el.getElementsByTagName('svg')[0]
            , 'childnodes')
        return el.getElementsByTagName('svg')[0]
    }

    translate(obj, x, y) {
        //  obj.setAttribute(style)
        //  let g =obj.getElementsByTagName('g')[0]
        //  console.log('g', g.getAttribute('transform'))
        //  g.setAttribute('transform', `translate(${x} ${y})`)
    }
    scale(obj, x = 500, y = 50, width = 1000, height = 50) {
        obj.setAttribute('preserveAspectRatio', "none")
        obj.setAttribute('width', `${width}`)
        obj.setAttribute('height', `${height}`)
        obj.setAttribute('x', `${x}`)
        obj.setAttribute('y', `${y}`)

        //obj.setAttribute('style', "transform: scale(400, 50);")
        //obj.setAttribute('viewBox', "0 0 200 100 ")
    }
    // draw.onClick.bind(draw, quarter, pitchDurationArray[i],draw.notes.length - 1,calculationY[1])
    onClick(svg, pitchDuration,notesIndex, noteMidi) {
        playNotes([pitchDuration])
        console.log('note ',noteMidi)
        this.get('txtNote').innerHTML = noteMidi
        this.handleTxtHightlight(notesIndex)
        //console.log(noteMidi, pitchDuration.pitch)
        // todo : redo so lesss iterative, so previously selected gets set , and then this gets set. 
        for (const note of this.notes) {
            note.svg.style.fill = 'rgb(0,0,0)'
        }
        svg.style.fill = 'rgb(0, 256, 0)'
    }
    async clearNotes(){
        for(let note of this.notes){
            (note.svg).parentNode.removeChild(note.svg)
        }
        this.notes = []
    }
    async drawNotes(pitchDurationArray) {
        console.log('pitchdurationarray drawnotes',pitchDurationArray)
        if (!this.quarter_up) {
            this.quarter_up = await this.loadSvg('quarter', "/img/quarter_up.svg", 'container', false)
            this.sharp = await this.loadSvg('quarter', "/img/sharp.svg", 'container', false)
            this.flat = await this.loadSvg('quarter', "/img/flat.svg", 'container', false)
            console.log('sharpflat',this.sharp, this.flat)
        }
        if(this.notes.length > 0 ){
            this.clearNotes()
        }
        let left = 0
        for (let i = 0; i < pitchDurationArray.length; i++) {
            const quarter = this.clone(this.quarter_up)
            console.log(this.get('container'))
            this.get('container').appendChild(quarter)
            let calculationY = this.calculateY(pitchDurationArray[i].pitch,pitchDurationArray[i].duration)
            this.notes.push({ svg: quarter, name: calculationY[1] })
        
            if(calculationY[1]){
               // let i = 0 
                let item = calculationY[1][0]
                    
                    console.log(item)
                    
                    if(pitchDurationArray[i].pitch <  this.getStaveOffset()+this.crossThreshold){
                       
                    
                    switch(item){
                        case 'c':
                            quarter.innerHTML+= `<line id="ccross${item}" x1="2" y1="${39}" x2="104" y2="${39}" style="stroke:rgb(0,0,0);stroke-width:2"></line>`
                            break;
                        case 'b':
                            console.log('b!')
                            quarter.innerHTML+= `<line id="ccross${item}" x1="2" y1="${33}" x2="104" y2="${33}" style="stroke:rgb(0,0,0);stroke-width:2"></line>`
                            break;
                        case 'a':
                            console.log('a!')
                            //quarter.innerHTML+= `<line id="ccross${item}" x1="2" y1="${33}" x2="104" y2="${33}" style="stroke:rgb(0,0,0);stroke-width:2"></line>`
                            //quarter.innerHTML+= `<line id="ccross${item}" x1="2" y1="${39}" x2="104" y2="${39}" style="stroke:rgb(0,0,0);stroke-width:2"></line>`
                            break;
                        }
                    }
                   //i++;
                }
                // onClick(svg, pitchDuration,notesIndex, noteMidi) {
                quarter.onclick = draw.onClick.bind(draw, quarter, pitchDurationArray[i],this.notes.length - 1,calculationY[1])
                let transform = "transform: rotate(180deg);transform-origin: 65.5% 55.5%;"
                if(pitchDurationArray[i].pitch < 60){
                    transform = ''
                }

               
               
            quarter.setAttribute('style', `position:absolute;top:${this.getStaveOffset()+calculationY[0]}px;left:${40 + left }px;${transform}`) //background:rgb(${50+i*30},${60+i*15},22)
            if(this.notes.length % (this.staveNoteMax -1 )== 0 ){
                left =  0
             }
             else{
                 left += 30 
             }
        }
    }
    getStaveOffset(){
        if(this.notes.length < this.staveNoteMax){
            return this.staves[0]
        }
        else{
            return this.staves[1]
        }
    }
    async createStave(topOffset=50){

        let parentStave = document.createElement("div")
        parentStave.id =  'parentStave'+this.id.stave
        console.log(parentStave, 'ps')
        this.get('container').appendChild(parentStave)
        let stave = await this.loadSvg( 'stave'+this.id.stave, "/img/stave.svg", parentStave.id)
       
        await this.scale(stave, 100, 50, 1600, 50)
        let treble = await draw.loadSvg("treble"+this.id.stave, "/img/treble.svg", parentStave.id)
        parentStave.setAttribute("style", `position:relative;top:${topOffset}px`)
        treble.setAttribute('viewBox', '0 0 1000 1300')
        await this.scale(treble, 10, -55, 60, 70)
        treble.parentNode.classList.add("treble-parent")
        treble.classList.add("treble")
        this.id.stave += 1
        console.log(this.id.stave)
        if(this.staves.length == 0){
            this.staves.push(topOffset)
        } else{
            this.staves.push(topOffset + 50)
        }
        this.get('controls').setAttribute('style', `position:relative;top:${topOffset+30}px`)
        return parentStave
    }
}
let atomic = new AtomicNote()
let draw = new DrawNote()

async function main() {
    //id, svgUrl, parent = 'container'
  
    // if (!draw.quarter_up) {
    //     draw.quarter_up = await draw.loadSvg('quarter', "/img/quarter_up.svg", 'container', false)
    // }
    // draw.quarter_up.setAttribute('viewBox', '0 0 25 70')
    // draw.quarter_up.setAttribute('class', 'note')
    // draw.quarter_up.setAttribute('style', `fill:green`) //background:rgb(${50+i*30},${60+i*15},22)
    // draw.scale(draw.quarter_up, 20, 30, 25, 70)
    await draw.createStave(50)
    await draw.createStave(100)
}


async function onSubmit() {
    let element = document.getElementById('txtInput')
    if (!element.value) { return }
    let result = await atomic.readWeb(element.value)
    draw.txtArray = element.value.split(" ")
    draw.drawNotes(result)
    playNotes(result, draw.notes)
}
async function sleep(ms) {
    return new Promise((resolve) => { setTimeout(resolve, ms) })
}
