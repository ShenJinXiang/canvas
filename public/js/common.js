function addEvent(obj, type, handle) {
    try { // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
        obj.addEventListener(type,handle,false);
    } catch(e){
        try { // IE8.0及其以下版本
            obj.attachEvent('on' + type,handle);
        } catch(e) { // 早期浏览器
            obj['on' + type] = handle;
        }
    }
}

function addClass(obj, name) {
    var cn = obj.className;
    var reg = /\S+/g
    var arr = cn.match(reg);
    if (arr.indexOf(name) < 0) {
        arr.push(name);
        obj.className = arr.join(' ');
    }
}

function removeClass(obj, name) {
    var cn = obj.className;
    var reg = /\S+/g
    var arr = cn.match(reg);
    obj.className = arr.filter(function(val) {
        return name != val;
    }).join(' ');
}

function random() {
    if (arguments.length == 0) {
        return Math.random();
    }
    if (arguments.length == 1) {
        return Math.random() * arguments[0];
    }
    var min = Math.min(...arguments);
    var max = Math.max(...arguments);
    return (max - min) * Math.random() + min;
}

function randomInt() {
    return Math.floor(random(...arguments));
}

function getMarkCanvas() {
    var markCanvas = document.createElement('canvas');
    markCanvas.width = 300;
    markCanvas.height = 100;
    var ctx = markCanvas.getContext('2d');
    
    ctx.fillStyle = 'rgba(204, 204, 204, 0.5)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '40px cursive';
    ctx.fillText('shenjinxiang.com', markCanvas.width / 2, markCanvas.height / 2 );
    return markCanvas;
}