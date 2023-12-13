//da riscrivere obv, per ora la sua call è commentata nel controller
class Mixer  {
    audioContext;
    channel;
    masterVol;
    masterGain;
    compressor;

    constructor(audioContext, channel, masterVol) {

        this.audioContext = audioContext;
        this.channel = channel;
        this.masterVol = masterVol;

        this.createCompressor();
        this.createMasterChannel(); //crea un master 

        //connettere compressor e mastervolume alla catena di effetti
        //ocio a quando avviene il push, vedi rebuildChain e dove viene chiamata
        this.channel.audioChain.push(this.compressor);
        this.channel.audioChain.push(this.masterGain);
    } 

    createMasterChannel = () => {
        let oldMin = 285,
            oldMax = 0,
            newMin = 0,
            newMax = 1.3,
            newVol = 0;

        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = 1;

        //oldmax e oldmin waht che cazo sono 
        //probabilmente andrebbero sostituiti con this.channel.gain.value ecc
        newVol = ((this.masterVol - oldMin) / (newMin - oldMin)) * (newMax - newMin) + newMin;
        this.masterGain.gain.value = newVol;
    }

    createCompressor = () => {
        this.compressor = new DynamicsCompressorNode(this.audioContext, this.channel.buffer) //not sure su cosa passare yet
        this.compressor.threshold = 10;
        this.compressor.knee = 10;
        this.compressor.ratio = 10;
        this.compressor.reduction = 10;
        this.compressor.attack = 10;
        this.compressor.release = 10;
    }

    getNode = () => { 
        

    }

}

//export { Mixer };