{
    zqgzt({
        el: 'canvas1',
        radius: 120,
        borderColor: '#5d7',
        datas: [
            {text: '已填写', value: 200, style: '#5d7', showText: false},
            {text: '印花税', value: 100, style: '#808', showText: false},
            {text: '增值税', value: 150, style: '#f84', showText: false},
            {text: '所得税', value: 100, style: '#aa4', showText: false},
            {text: '财务报表', value: 200, style: '#84f', showText: false},
            {text: '其他', value: 100, style: '#4aa', showText: false},
        ],
        click: (data) => {
            console.log(data);
        }
    });
    zqgzt({
        el: 'canvas2',
        borderColor: '#fd1',
        datas: [
            {text: '已填写', value: 200, style: '#fd1', showText: false},
            {text: '印花税', value: 130, style: '#808', showText: false},
            {text: '增值税', value: 50, style: '#f84', showText: false},
            {text: '所得税', value: 100, style: '#aa4', showText: false},
            {text: '财务报表', value: 100, style: '#84f', showText: false},
            {text: '其他', value: 80, style: '#4aa', showText: false},
        ],
        click: (data) => {
            console.log(data);
        }
    });
    zqgzt({
        el: 'canvas3',
        borderColor: '#39e',
        datas: [
            {text: '已填写', value: 200, style: '#39e', showText: false},
            {text: '印花税', value: 50, style: '#808', showText: false},
            {text: '增值税', value: 150, style: '#f84', showText: false},
            {text: '所得税', value: 100, style: '#aa4', showText: false},
            {text: '财务报表', value: 200, style: '#84f', showText: false},
            {text: '其他', value: 130, style: '#4aa', showText: false},
        ],
        click: (data) => {
            console.log(data);
        }
    });

}