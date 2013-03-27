(function () {
    var CanvasTools = function (imageObj, canvas) {
        this.imageObj = new Image;
        this.imageObj.src = imageObj.src;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    };

    CanvasTools.prototype.blur = function (passes) {
        var i, x, y;
        passes = passes || 4;
        this.context.globalAlpha = 1/passes,
        passHalf = Math.ceil(passes/2);


        // Loop for each blur pass.
        for (i = 1; i <= passes; i++) {
            for (y = -passHalf; y < passHalf; y++) {
                for (x = -passHalf; x < passHalf; x++) {
                    this.context.drawImage(this.imageObj, x, y);
                }
            }
        }
        this.context.globalAlpha = 1.0;

        this.refresh();
    };

    //reference: http://zsprawl.com/iOS/2012/03/cropping-scaling-images-with-canvas-html5/
    CanvasTools.prototype.crop = function (width, height, pixelRatio) {
        // var canvas = document.getElementById(id),
        //     pixelRatio = window.devicePixelRatio;

        this.context.scale(pixelRatio, pixelRatio);

        var sourceX = 0,
            sourceY = 0,
            destX = 0,
            destY = 0,

            stretchRatio,
            sourceWidth,
            sourceHeight,

            destWidth,
            destHeight,

            isWindowHorizontal = false,
            isImageHorizontal = false;

        //HOW TO
        //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

        if (width > height) {
            isWindowHorizontal = true;
        }

        if (this.imageObj.width > this.imageObj.height) {
            isImageHorizontal = true;
        }

        if (width/height > this.imageObj.width/this.imageObj.height) {

            stretchRatio = ( this.imageObj.width / width );
            sourceWidth = Math.floor(this.imageObj.width);
            sourceHeight = Math.floor(height*stretchRatio);
            sourceY = Math.floor((this.imageObj.height - sourceHeight)/2);

        } else {

            stretchRatio = ( this.imageObj.height / height );
            sourceWidth = Math.floor(width*stretchRatio);
            sourceHeight = Math.floor(this.imageObj.height);
            sourceX = Math.floor((this.imageObj.width - sourceWidth)/2);

        }

        destWidth = Math.floor(width / pixelRatio);
        destHeight = Math.floor(height / pixelRatio);

        this.context.drawImage(this.imageObj, sourceX, sourceY, sourceWidth,
            sourceHeight, destX, destY, destWidth, destHeight);

        this.refresh();
    };

    CanvasTools.prototype.opacity = function (opacity) {
        this.context.globalAlpha = opacity;
        this.refresh();
    }

    CanvasTools.prototype.refresh = function () {
        // this.imageObj = new Image();
        this.imageObj.src = this.canvas.toDataURL();
    };

    window.CanvasTools = CanvasTools;

})();
