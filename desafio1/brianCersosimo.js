const data = require('./data.js');

const extractLength = data => data.match(/\d+:\d+/g);
const extractName = data => data.match(/(F|R)\w+ {1}\w+/g);


const createObjects = (videoLengths, videoNames) => {
    let objects = [];
    for (let i = 0; i < videoLengths.length; i++) {
        let object = {
            length: videoLengths[i],
            name: videoNames[i]
        }
        objects.push(object);
    }
    return objects;
}

const filterByNameRedux = videos => videos.filter(element => element.name.startsWith("Flexbox"));

const getTotalSeconds = videos => {
    let minutes = 0;
    let seconds = 0;
    const secondsPerMinute = 60;
    let total = 0;
    for (const video of videos) {
        const minutesAndSeconds = video.length.split(":");
        minutes += parseInt(minutesAndSeconds[0]);
        seconds += parseInt(minutesAndSeconds[1]);
    }
    total = minutes * secondsPerMinute + seconds;
    return total;
}


const videoLengths = extractLength(data);
const videoNames = extractName(data);
const videos = createObjects(videoLengths, videoNames);
const reduxVideos = filterByNameRedux(videos);
const totalSeconds = getTotalSeconds(reduxVideos);


console.log(totalSeconds);