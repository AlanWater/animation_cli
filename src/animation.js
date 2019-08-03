function main() {
    (function () {
        var start = null,
            preTime = null,
            r = 100,
            dom = null,
            Ox = window.outerWidth / 2,
            Oy = window.outerHeight / 2,
            deg = 0;
        function circle(timestamp) {
            if (!start) {
                start = timestamp;
                preTime = timestamp;
                if (dom) {
                    dom.remove();
                }
                dom = document.createElement("div");
                dom.id = 'circle';
                dom.style.backgroundColor = 'red';
                dom.style.height = '10px';
                dom.style.width = '10px';
                dom.style.borderRadius = '50%';
                dom.style.position = "absolute";
                dom.style.left = Ox + 'px';
                dom.style.top = Oy + 'px';
                dom.style.zIndex = '9999';
                document.body.appendChild(dom);
                var O = document.createElement("div");
                O.id = 'circle-o';
                O.style.backgroundColor = 'red';
                O.style.height = '3px';
                O.style.width = '3px';
                O.style.position = "absolute";
                O.style.left = Ox + 'px';
                O.style.top = Oy + 'px';
                O.style.zIndex = '9999';
                document.body.appendChild(O);
            }
            if (timestamp - preTime > 16.6) {
                var _x = Math.sin(deg * Math.PI / 180) * r * -1,
                    _y = Math.cos(deg * Math.PI / 180) * r * -1;
                dom.style.left = _x + Ox + 'px';
                dom.style.top = _y + Oy + 'px';
                preTime = timestamp;
                deg--;
            }
            requestAnimationFrame(circle);
        }
        circle(performance.now());
    })()
}
export default main;