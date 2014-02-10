
!function($){
    "use strict";

    if( $ === undefined ){
        console.log("jQuery is undefined");
        return;
    }

    var $uploadFile, $canvas, $uploadFile, $controls, $fontSize, $fontLineWidth, 
    $fontTop, $fontLeft, $btnStroke, $btnReset, $btnSave;

    var loadImageFromInput = function(input, callback){
        var file = input.files[0];
        if (!file.type.match(/^image\/(png|jpeg|gif)$/)){
            throw new Error('file type should be image');
        }
        var image = new Image();
        var reader = new FileReader();

        reader.onload = function(evt) {
            image.onload = function() {
                $canvas[0].width = image.width;
                $canvas[0].height = image.height;
                var ctx = $canvas[0].getContext("2d");
                ctx.drawImage(image, 0, 0);
                if(typeof callback === "function"){
                    callback();
                }
            }
            image.src = evt.target.result;
        }
        reader.readAsDataURL(file);
    };

    var putLabel = function(size, lineWidth, top, left){
        var ctx = $canvas[0].getContext("2d");
        var text = 'LGTM';
        ctx.font = [size, 'px monospace'].join('');

        ctx.textBaseline = 'top';
        ctx.lineWidth = lineWidth;

        ctx.strokeStyle = 'black';
        ctx.strokeText(text, left, top);
        
        ctx.fillStyle = 'white';
        ctx.fillText(text, left, top);
    };

    var onChangeImage = function(){        
        loadImageFromInput(this, function(){
            $controls.css('display', 'block');
        });
    };

    var onSaveBtnPushClicked = function(){
        var img = new Image();
        var type = 'image/png'; 
        img.src = $canvas[0].toDataURL(type);
        img.onload = function(){
            var url = img.src;
            var link = window.document.createElement('a');
            link.href = url;
            link.download = 'output.png';
            var click = document.createEvent("Event");
            click.initEvent("click", true, true);
            link.dispatchEvent(click);
        };
    };

    var onResetBtnPushClicked = function(){
        loadImageFromInput($uploadFile.get(0));
    };

    var onStrokeBtnClicked = function(){
        var size = parseInt($fontSize.val());
        var lineWidth = parseInt($fontLineWidth.val());
        var top = parseInt($fontTop.val());
        var left = parseInt($fontLeft.val());
        putLabel(size, lineWidth, top, left);
    };
    
    $(document).ready(function(){
        $uploadFile = $("input#upload_file");
        $canvas = $("canvas#main");
        $uploadFile = $("input#upload_file").change(onChangeImage);
        $controls = $("div#controls").css('display', 'none');
        $fontSize = $("input#font_size");
        $fontLineWidth = $("input#font_line_width");
        $fontTop = $("input#font_top");
        $fontLeft = $("input#font_left");
        $btnStroke = $("input#btn_stroke").click(onStrokeBtnClicked);
        $btnReset = $("input#btn_reset").click(onResetBtnPushClicked);
        $btnSave = $("input#btn_save").click(onSaveBtnPushClicked);
    });

}(jQuery);
