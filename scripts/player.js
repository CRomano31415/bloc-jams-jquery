class Player {
  constructor () {
    this.currentlyPlaying = album.songs[0];
    this.playState = 'stopped';
    this.volume = 80;
    this.soundObject = new buzz.sound(this.currentlyPlaying.soundFileUrl);
  }

  getDuration() {
    return this.soundObject.getDuration();
  }

  prettyTime(timeInSeconds,e){
    e = e || false;
    let remainder = Math.trunc(timeInSeconds%60);
    if( remainder < 10) {
        return Math.floor(timeInSeconds/60)+':0'+ remainder;
      }else{
        return Math.floor(timeInSeconds/60)+':'+ remainder;
      }
  }

  getTime() {
    return this.soundObject.getTime();
  }
  
  playPause (song = this.currentlyPlaying) {
    if (this.currentlyPlaying !== song) {
      // Stop the currently playing sound file (even if nothing is playing)
      this.soundObject.stop();
      // Clear classes on the song that's currently playing
      this.currentlyPlaying.element.removeClass('playing paused');
      
      // Update our currentlyPlaying and playState properties
      this.currentlyPlaying = song;
      this.playState = 'stopped';
      this.soundObject = new buzz.sound(this.currentlyPlaying.soundFileUrl);
    }
    if (this.playState === 'paused' || this.playState === 'stopped') {
      this.soundObject.setVolume( this.volume );
      this.soundObject.play();
      this.playState = 'playing';
      this.currentlyPlaying.element.removeClass('paused').addClass('playing');
      this.setPlayerTimes(song.duration);
    } else {
      this.soundObject.pause();
      this.playState = 'paused';
      this.currentlyPlaying.element.removeClass('playing').addClass('paused');
    }
  }
  
  skipTo (percent) {
    if (this.playState !== 'playing') { return }
    this.soundObject.setTime( (percent / 100) * this.soundObject.getDuration() );
  }
  
  setVolume (percent) {
    this.volume = percent;
    this.soundObject.setVolume(percent);
  }

  setPlayerTimes(timeIn){
    $('#time-control .total-time').text(this.prettyTime(timeIn));

  }

}

const player = new Player();

