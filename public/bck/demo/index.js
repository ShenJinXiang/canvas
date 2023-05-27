(() => {
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');
    context.fillStyle = 'red';
    const img = new Image();
    img.src = '../images/'
    context.fillRect(100, 100, 200, 80);
})();