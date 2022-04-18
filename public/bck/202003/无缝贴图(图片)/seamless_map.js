(function() {
    var imgPathArr = [
        './img/001.jpeg',
        './img/002.jpeg',
        './img/003.jpeg',
        './img/004.jpeg',
        './img/005.jpeg',
        './img/006.jpeg',
        './img/007.jpeg',
        './img/008.jpeg',
        './img/009.jpeg',
        './img/010.jpeg',
        './img/011.jpeg'
    ];
    var index = 0;
    var imgs = [];
    imgPathArr.forEach(function(item) {
        var img = new Image();
        img.src = item;
        imgs.push(img);
    });

    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext('2d');

    initDom();
    bindEvent();
    draw();
    var timer = run();

    function draw() {
        var img = imgs[index];
        if (img.complete) {
            drawImg();
        } else {
            img.onload = drawImg;
        }

        function drawImg() {
            ctx.fillStyle = ctx.createPattern(img, 'repeat');
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    function initDom() {
        $("#imgBtnBox").empty();
        for(var i = 0; i < imgs.length; i++) {
            var _btn = "<div class='img-btn'></div>";
            $("#imgBtnBox").append($(_btn));
        }
        $("#imgBtnBox .img-btn").eq(0).addClass('active');

    }

    function bindEvent() {
        $(document).on('click', '#imgBtnBox .img-btn', function() {
            if (timer) {
                clearInterval(timer);
            }
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            index = $(this).index();
            draw();
            timer = run();
        });
    }

    function run() {
        return setInterval(function() {
            index = index >= imgs.length - 1 ? 0 : index + 1;
            var $curr = $("#imgBtnBox .img-btn").eq(index);
            $curr.siblings().removeClass('active');
            $curr.addClass('active');
            draw();
        }, 3000);
    }
})();
