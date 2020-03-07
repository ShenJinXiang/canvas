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
