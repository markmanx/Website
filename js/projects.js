var projects = [],
    blog = [];


/* === PROJECTS === */

projects[0] = {
    thumbImg:   'HoP_thumb.jpg',
    title:      'Houses of Parliament',
    blurb:      'An interactive virtual tour',
    info:       {client: 'CNN', role: 'Developer', link: '<a href="https://goo.gl/t9B8nP" target="_blank">Live on CNN.com</a>'},
    intro:      'CNN commissioned me to develop an interactive tour of the Houses of Parliament that would work across desktop and mobile. '
    +           'The tour features 360 video panoramas, audio narration and hotspots.'
    +           '<br/><br/>'
    +           'The main focus was on making the tour feel as smooth as possible, with minimal loading times and rich menu animations. '
    +           'After evaluating a few frameworks, we decided to use React for a more responsive user experience. '
    +           'I learned a lot about optimizing WebGL code during this project, which was critical in getting the 360 feature to run smoothly, especially on various mobile platforms where frame rate is an issue. '
    +           'Due to the heavy filesize of the 360 videos, we converted them to lighter versions for mobile users. '
    +           '<br/><br/>',
    content:    '<div class="video-wrapper"><video autoplay loop playsinline controls><source src="assets/videos/HoP.mp4" type="video/mp4"></source></video></div>'
}

projects[1] = {
    thumbImg:   'showreel_thumb.jpg',
    title:      'Advertising Showreel',
    blurb:      'Interactive Branding',
    info:       {agency: 'Inskin', role: 'Developer / Designer'},
    intro:      'I worked for a digital advertising agency for 5 years, helping build cool interactive projects for some amazing brands like Nintendo, Nike and Fitbit.'
    +           '<br/><br/>'
    +           'Part of my experience here was as an R&amp;D developer, looking into new advertising trends and technologies, and coming up with prototypes of interesting ways to create brand engagement, for example, connecting to real-time data feeds like weather data, using 2D and 3D visual effects with various WebGL libraries, creative ways to use scrolling and gyroscopic control etc.'
    +           '<br/><br/>'
    +           'Part of my role was also to test the capabilities and compatibility of new technologies across different browsers and devices.',
    content:    '<iframe id="ad-showreel" src="https://player.vimeo.com/video/182742341?title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
}

projects[2] = {
    thumbImg:   'Lost_thumb.jpg',
    title:      'Lost in Translation',
    blurb:      'Experimenting with Google\'s Translate API',
    info:       {Type: 'Personal Project', role: 'Developer / Designer', link: '<a href="http://www.markmankarious.com/projects/05_LostInTranslation/index.html" target="_blank">Live link</a>'},
    intro:      'This was a personal project of mine, and it started with a conversation I had one day with a colleague at work. '
    +           'We were wondering what would happen if you took a phrase and processed it through 10 random languages in sequence, using Google Translate. '
    +           'Would the meaning of the original sentence change, and by how much? '
    +           '<br/><br/>'
    +           'Being an AWS user, this was a good opportunity to see if the grass was greener over at Google\'s Cloud Services. '
    +           'My first thought was Google\'s dashboard was definitely a lot cleaner than Amazon\'s. '
    +           'When you submit your phrase, an AWS Lambda function handles the request (basically a serverless Node script), which connects to the Translate API. '
    +           'There\'s a lot of waiting around because the Lambda function waits for Google to respond with each translation before passing the result back to Google again (it does this 9 times). '
    +           'Trying to build this script with nested JS promises quickly became a nightmare, and around this time I discovered a library called \'Q\' which handles promises much more neatly. '
    +           'Once the final result is received, the Lambda function passes the result to the front-end, where you see a \'Round the World\' animation (made with THREE and TweenMax) to show how your original phrase has been translated. ',
    content:    '<img src="assets/images/lost_2.jpg">'
    +           '<img src="assets/images/lost_3.jpg">'
}

/* === BLOG === */