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
    transform.blur(5);
    transform.opacity(0.6);

    var style = $('<style />').addClass('js-created');

    style.html('body { background-image: url(' + canvas.toDataURL() + ')} ');

    $('head').append(style);

}