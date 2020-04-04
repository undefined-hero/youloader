import * as fs from 'fs'
import * as $ from 'youtube-dl'

export default {
  methods: {
    downloadLinks (links) {
      links.forEach((l, i) => {
        // $.getInfo(l, (err, info => {
        //   if (err) throw err
        //   console.log('title:', info.title)
        // }))
        console.log(1)
        var video = $(l, ['--format=best'], { cwd: __dirname })
        video.on('info', function(info) {
          console.log('Download started')
          console.log('filename: ' + info._filename)
          console.log('size: ' + info.size)
        })
        video.pipe(fs.createWriteStream(`video${i}.mp4`))
      })
    }
  }
}