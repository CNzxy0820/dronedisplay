let player1 = videojs('myVideo1', {

}, function onPlayerReady() {
    this.src({
        src: 'rtmp://qixue.wiki/qixue/stream1' + deviceEmail[0],
        type: 'rtmp/flv'
    });
})
let player2 = videojs('myVideo2', {

}, function onPlayerReady() {
    this.src({
        src: 'rtmp://qixue.wiki/qixue/stream1' + deviceEmail[0],
        type: 'rtmp/flv'
    });
})
let player3 = videojs('myVideo3', {

}, function onPlayerReady() {
    this.src({
        src: 'rtmp://qixue.wiki/qixu e/stream1' + deviceEmail[0],
        type: 'rtmp/flv'
    });
})
let player4 = videojs('myVideo4', {

}, function onPlayerReady() {

    this.src({
        src: 'rtmp://qixue.wiki/qixue/stream1' + deviceEmail[0],
        type: 'rtmp/flv'
    });
})

// src: "rtmp://qixue.wiki/qixue/stream1" + deviceEmail[0],
// rtmp://58.200.131.2:1935/livetv/hunantv