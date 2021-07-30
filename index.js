const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)

const cuts = [
    {
        name: 'apresentacao',
        timeStart: '00:00:11',
        timeEnd: '00:09:05'
    },
    {
        name: 'geral',
        timeStart: '00:09:41',
        timeEnd: '00:12:39'
    },
    {
        name: 'enviromentsetup',
        timeStart: '00:12:43',
        timeEnd: '00:15:05'
    },
    {
        name: 'tools',
        timeStart: '00:15:10',
        timeEnd: '00:17:00'
    },
    {
        name: 'devopsconcepts',
        timeStart: '00:17:08',
        timeEnd: '00:19:16'
    },
    {
        name: 'classespreparation',
        timeStart: '00:19:20',
        timeEnd: '00:22:34'
    },
    {
        name: 'strategiesinexecution',
        timeStart: '00:22:38',
        timeEnd: '00:24:34'
    },
    {
        name: 'assessment',
        timeStart: '00:24:37',
        timeEnd: '00:28:34'
    },
    {
        name: 'curriculum',
        timeStart: '00:28:37',
        timeEnd: '00:30:40'
    },
    {
        name: 'other',
        timeStart: '00:30:47',
        timeEnd: '00:32:33'
    },
]

const convertStringToSeconds = (hms) => {
    const [hours, minutes, seconds] = hms.split(':')
    const totalSeconds = (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds)
    return totalSeconds
}

cuts.forEach(cut => {
    ffmpeg('video.mp4')
        .setStartTime(cut.timeStart)
        .setDuration(convertStringToSeconds(cut.timeEnd) - convertStringToSeconds(cut.timeStart))
        .output('parts/' + cut.name + '.mp4')
        .on('end', function (err) {
            if (!err) { console.log('conversion Done ' + cut.name) }
        })
        .on('error', function (err) {
            console.log('error: ', err)
        }).run()
})

