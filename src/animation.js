var Animation = {
    Circle: function (dom, Ox, Oy, r, deg) {
        var status = 'sleep',
            r = r || 100,
            dom = dom || null,
            Ox = Ox || window.outerWidth / 2,
            Oy = Oy || window.outerHeight / 2,
            deg = deg || 0;
        var create = function () {
            dom = document.createElement("div");
            dom.style.backgroundColor = 'red';
            dom.style.height = '10px';
            dom.style.width = '10px';
            dom.style.borderRadius = '50%';
            dom.style.position = "absolute";
            dom.style.left = Ox + 'px';
            dom.style.top = Oy + 'px';
            dom.style.zIndex = '9999';
            document.body.appendChild(dom);
        }
        if (!dom) {
            create();
        }
        this.run = function () {
            status = 'active';
            var start = null,
                preTime = null;
            function circle(timestamp) {
                if (!start) {
                    start = timestamp;
                    preTime = timestamp;
                }
                // if (timestamp - preTime > 100) {
                var _x = Math.sin(deg * Math.PI / 180) * r * -1,
                    _y = Math.cos(deg * Math.PI / 180) * r * -1;
                dom.style.left = _x + Ox + 'px';
                dom.style.top = _y + Oy + 'px';
                preTime = timestamp;
                deg -= 2;
                // }
                if (status == 'active') {
                    requestAnimationFrame(circle);
                }
            }
            circle(performance.now());
        }
        this.stop = function () {
            status = 'sleep';
        }
        this.destory = function () {
            dom && dom.remove();
            status = 'sleep';
        }
    }
}

export default Animation;