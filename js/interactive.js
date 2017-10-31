var Interactive = (function() {
    var $els,
        text;

    function init() {

        paper.setup($('canvas')[0]);
        bounceMask();

        $('#intro').on('mousemove', onMouseMove);
        $('#intro').on('click', clickEffect);
    }

    function bounceMask() {
        var outerRect = new paper.Path.Rectangle([0, 0], [window.innerWidth, window.innerHeight]);
        var innerRect = new paper.Path.Rectangle(paper.view.center, [1, 1]);
        var res = outerRect.subtract(innerRect, false);
        res.fillColor = 'white';
        render();
        
        var tl = new TimelineMax({delay: 0});

        tl.append( TweenMax.to('#intro', 0.1, {opacity: 1}) )
        tl.appendMultiple([
            TweenMax.to(res.children[1].segments[0].point, 1.5, {x: paper.view.viewSize.width, y: paper.view.viewSize.height, ease: Bounce.easeOut}), // bottom right
            TweenMax.to(res.children[1].segments[1].point, 0.8, {x: paper.view.viewSize.width, y: 0, ease: Bounce.easeOut}),  // top right
            TweenMax.to(res.children[1].segments[2].point, 1.2, {x: 0, y: 0, ease: Bounce.easeOut}),  // top left
            TweenMax.to(res.children[1].segments[3].point, 1.6, {x: 0, y: paper.view.viewSize.height, ease: Bounce.easeOut}) // bottom left
        ])
        tl.append( TweenMax.staggerFrom('.line-inner', 1, {marginTop: 150, ease: Expo.easeOut}, 0.1), -0.8 )
        tl.append( TweenMax.from('#portfolio-text', 0.3, {opacity: 0}), -0.7 )
    }

    function clickEffect(e) {
        var effect = new ClickExplode();
        effect.onClick(e);
    }

    function onMouseMove(e) {
        var x = e.clientX,
            y = e.clientY;
    }

    function render() {
        requestAnimationFrame( render );
        paper.view.draw();
    }

    return {
        init: function() {
            init();
        }
    }
})();

(function() {
    function ClickExplode() {
        var numLines = 8;

        this.group = new paper.Group();
        this.group.applyMatrix = false;

        for (var i = 0; i < numLines; i++) {
            var angle = (360 / numLines) * i;
            this.group.addChild( createLine( angle, i % 2 ) );
        }
    }

    ClickExplode.prototype.onClick = function(e) {
        var tl = new TimelineMax({onComplete: function() {
            this.group.remove();
        }.bind(this)});
        
        this.group.position = new paper.Point(e.clientX, e.clientY + $(window).scrollTop());

        for (var i = 0; i < this.group.children.length; i++) {
            var line = this.group.children[i];
            var endPoint = i%2 == 0 ? -100 : -80;
            tl.insert([
                TweenMax.fromTo(line.segments[1].point, 0.6, {y: -30}, {y: endPoint, ease: Expo.easeOut}),
                TweenMax.fromTo(line.segments[0].point, 0.6, {y: -30}, {y: endPoint, ease: Expo.easeOut, delay: 0.1}),
                TweenMax.to(this.group, 0.2, {opacity: 0, delay: 0.4})
            ]);
        }
    }

    function createLine(angle, isSmaller) {
        var line = new paper.Path.Line( new paper.Point(0, 0), new paper.Point(0, 0) );
        line.strokeColor = 'white';
        line.strokeWidth = isSmaller ? 4 : 7;
        line.strokeCap = 'round';
        line.applyMatrix = false;
        line.rotate(angle);
        

        return line;
    }

    window.ClickExplode = ClickExplode;
})();