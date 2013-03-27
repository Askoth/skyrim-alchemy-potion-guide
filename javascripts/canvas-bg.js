function backgroundImage () {
    var imgUrl = 'images/skyrim.jpg',
        w = {
            width: $(window).width(),
            height: $(window).height(),
            pixelRatio: window.devicePixelRatio
        },
        img = new Image();

    img.onload = function () {
        transformImage(img, w);
    };

    img.src = imgUrl;

}

function transformImage (img, w) {
    var canvas = document.createElement('canvas'),
        transform = new CanvasTools(img, canvas);

    canvas.width = w.width;
    canvas.height = w.height;

    transform.crop(w.width, w.height, w.pixelRatio);
    transform.blur(10);
    transform.opacity(0.2);

    $('body').css({
        backgroundImage: 'url(' + canvas.toDataURL() + ')'
    })

}