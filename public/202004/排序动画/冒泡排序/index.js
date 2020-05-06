(function(){
    drawer.init("冒泡排序", function(arr) {
        var len = arr.length;
        for (var i = 0; i < len - 1; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {        
                    var temp = arr[j + 1];       
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
                    drawer.swap(j, j + 1);
                }
            }
        }
    });
})();
