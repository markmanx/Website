var projectDetailMode = false,
    $els,
    clickLock = false,
    winW;

function init() {
    $els = {
        main: $('#main-container'),
        projects: $('#projects'),
        detail: $('#project-detail'),
        airplane: $('#airplane')
    }

    winW = window.innerWidth;

    // Load projects list
    for (var i = 0; i < projects.length; i++) {
        (function(i) {
            var $project = compileProject( projects[i], i );
            $project.click( function() { 
                if (!clickLock) loadProjectDetail( projects[i], $project ) 
            });
            $els.projects.find('.projects-wrapper').append( $project );
        })(i)
    }

    $('#back').click(closeProject);

    $('.project').hover(function(e) {
            TweenLite.to($(this).find('.thumb-container img'), 0.5, {marginTop: 40, rotationY: -35, rotation: 0, scale: 1, ease: Expo.easeOut})
            TweenLite.to($(this).find('.highlight'), 0.5, {width: '100%', ease: Expo.easeOut})
        }, 
        function() {
            TweenLite.to($(this).find('.thumb-container img'), 0.5, {marginTop: 250, rotationY: 0, rotation: 35, scale: 0.5, ease: Expo.easeOut})
            TweenLite.to($(this).find('.highlight'), 0.5, {width: 0, ease: Expo.easeOut})
        }
    );
    
    Interactive.init();

    $(window).resize( onResize );
}

function compileProject(project, id) {
    var html =
        '<div class="project">'
    +   '   <div class="thumb-container">'
    +   '       <img class="thumb" src="assets/images/thumbs/' + project.thumbImg + '">'
    +   '   </div>'
    +   '   <div class="index">0' + (id + 1) + '</div>'
    +   '   <div class="title">' + project.title + '</div>'
    +   '   <div class="blurb">' + project.blurb + '</div>'
    +   '   <div class="highlight"></div>'
    +   '</div>';

    return $(html);
}

function loadProjectDetail(project, $el) {
    projectDetailMode = true;
    var offset = $el.offset();

    $els.detail.find('.title').html(project.title);
    $els.detail.find('.blurb').html(project.blurb);
    $els.detail.find('.col:eq(1)').html(project.intro);
    $els.detail.find('.content').html(project.content);

    var infoListHtml = '';

    Object.keys(project.info).forEach(function(key,index) {
        infoListHtml +=
            '<div class="info-item-wrapper text-6">'
        +   '   <div class="info-title">' + key + '</div>'
        +   '   <div class="info-text">' + project.info[key] + '</div>'
        +   '</div>';

        
    });
    $els.detail.find('.col:eq(0)').html(infoListHtml);

    $els.detail.css({
        left: 0,
        display: 'block'
    });

    $els.detail.scrollTop(0);

    $els.detail.find('.title').css({
        'margin-top': offset.top - $(window).scrollTop() + 65,
        'margin-left': offset.left - $('#projects .content-container').offset().left
    });

    $els.detail.find('.blurb').css({
        'margin-left': offset.left - $('#projects .content-container').offset().left
    })
    
    var tl = new TimelineLite()
        .appendMultiple([
            TweenMax.fromTo($els.detail, 1, {opacity: 0}, {opacity: 1, ease: Expo.easeOut})
        ])
        .appendMultiple([
            TweenMax.fromTo('#header-bg', 1, {height: 0}, {height: 300, ease: Expo.easeInOut}),
            TweenMax.to($els.detail.find('.title'), 1, {marginLeft: 0, marginTop: 130, ease: Expo.easeInOut}),
            TweenMax.to($els.detail.find('.blurb'), 1, {marginLeft: 0, ease: Expo.easeInOut}),
            TweenMax.fromTo($els.detail.find('.title, .blurb'), 1, {color: 'black'}, {color: 'white'})
        ], -0.6)
        .appendMultiple([
            TweenMax.allFromTo([$els.detail.find('.info-panel, .content')] , 1, {marginTop: 30, opacity: 0}, {marginTop: 0, opacity: 1, ease: Expo.easeOut}, 0.2)
        ], -0.4)

    $('body').css('overflow', 'hidden');
}

function closeProject() {
    clickLock = true;
    $('body').css('overflow', 'scroll');
    
    var tl = new TimelineMax({ onComplete: unloadContent });
    tl.appendMultiple([
        TweenMax.fromTo('#main-container', 1, {marginLeft: -300}, {marginLeft: 0, ease: Expo.easeOut}),
        TweenMax.to('#project-detail', 0.5, {left: window.innerWidth, ease: Quad.easeIn})
    ]);
}

function unloadContent() {
    $els.detail.find('.title').html('');
    $els.detail.find('.blurb').html('');
    $els.detail.find('.col:eq(1)').html('');
    $els.detail.find('.content').html('');
    clickLock = false;
}

function onResize() {
    if (winW != window.innerWidth) {
        closeProject();
        winW = window.innerWidth;
    }
}

$(document).ready(init);