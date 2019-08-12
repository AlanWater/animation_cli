export interface Lay {
    x: number;
    y: number;
}
export type Direction = 'up' | 'leftUp' | 'rightUp' | 'left' | 'right' | 'down' | 'leftDown' | 'rightDown';
const directions: Array<Direction> = ['up', 'leftUp', 'rightUp', 'left', 'right', 'down', 'leftDown', 'rightDown'];
class Substance {
    private moveStatus: 'moving' | 'stop' | string = 'stop';
    private type: string = '';
    private name: string = '';
    private ref: HTMLElement = null;
    private id: number = 0;
    private x: number = 0;
    private y: number = 0;
    private direction: Direction = "down";
    private speed: number = 5;
    private panel: HTMLElement;
    private panelWidth = 0;
    private panelHeight = 0;
    private static circleSequenceNum = 10000;
    private static circleSequenceId = 0;
    private static refMap: {
        [id: string]: HTMLElement;
    } = {};
    private static increaseId = () => {
        Substance.circleSequenceId = Substance.circleSequenceId % Substance.circleSequenceNum + 1;
        return Substance.circleSequenceId;
    }
    private static createObjectRef = (substance: Substance) => {
        const { type, id, x, y, panel } = substance;
        //保证系统稳定，设置了最大限制，id是循环的，先移除原来的id
        const preRef = document.getElementById(`${type}${id}`);
        if (preRef) {
            preRef.remove();
            delete Substance.refMap[id]
        }
        //必须有一个容器，才能在容器中挂载物件，默认为body
        const container = panel;
        let ref = document.createElement('div');
        ref.style.position = 'absolute';
        ref.style.left = x + 'px';
        ref.style.top = y + 'px';
        ref.id = `${type}${id}`;
        ref.className = `substance-${type}`;
        container.appendChild(ref);
        //队列映射操作
        Substance.refMap[id] = ref;
        return ref;
    }
    constructor(panel: HTMLElement, type: string, name?: string, moveStatus?: string, x?: number, y?: number, speed?: number) {
        this.type = type;
        this.panel = panel;
        this.panelWidth = this.panel.offsetWidth;
        this.panelHeight = this.panel.offsetHeight;
        name && (this.name = name);
        moveStatus && (this.moveStatus = moveStatus);
        this.x = x || this.panelWidth / 2;
        this.y = y || this.panelHeight / 2;
        speed && (this.speed = speed);
        this.direction = directions[Math.floor(Math.random() * 8)];
        this.id = Substance.increaseId();
        this.ref = Substance.createObjectRef(this);
    }
    inPanel = (x: number, y: number) => {
        if ((x >= 0) && (x + 20 <= this.panelWidth) && (y >= 0) && (y + 20 <= this.panelHeight)) {
            return true;
        } else {
            return false;
        }
    }
    //运行对象
    public run() {
        var preTimestamp = null,
            k = Math.round(Math.random() * 10) / 10 || 0.45;
        this.moveStatus = 'moving';
        const animation = (timestamp: number) => {
            if (!preTimestamp) {
                preTimestamp = timestamp;
            }
            const { moveStatus, id, direction } = this;
            let x = 0, y = 0;
            if (moveStatus == 'moving') {
                switch (direction) {
                    case 'up': {
                        x = this.x;
                        y = this.y - this.speed * k;
                        break;
                    }
                    case 'down': {
                        x = this.x;
                        y = this.y + this.speed * k;
                        break;
                    }
                    case 'leftUp': {
                        x = this.x - this.speed * k;
                        y = this.y - this.speed * k;
                        break;
                    }
                    case 'rightUp': {
                        x = this.x + this.speed * k;
                        y = this.y - this.speed * k;
                        break;
                    }
                    case 'left': {
                        x = this.x - this.speed * k;
                        y = this.y;
                        break;
                    }
                    case 'right': {
                        x = this.x + this.speed * k;
                        y = this.y;
                        break;
                    }
                    case 'leftDown': {
                        x = this.x - this.speed * k;
                        y = this.y + this.speed * k;
                        break;
                    }
                    case 'rightDown': {
                        x = this.x + this.speed * k;
                        y = this.y + this.speed * k;
                        break;
                    }
                }
                if (this.inPanel(x, y)) {
                    this.x = x;
                    this.y = y;
                } else {
                    this.direction = directions[Math.floor(Math.random() * 8)];
                }
                Substance.refMap[id].style.left = this.x + 'px';
                Substance.refMap[id].style.top = this.y + 'px';
                if (timestamp - preTimestamp > 100) {
                    // this.direction = directions[Math.floor(Math.random() * 8)];
                    preTimestamp = timestamp;
                }
            }
            requestAnimationFrame(animation);
        }
        animation.call(this, performance.now());
    }
    stop = () => {
        this.moveStatus = "stop";
    }
    start = () => {
        this.moveStatus = "moving";
    }
    /**
     * Getter $moveStatus
     * @return {string }
     */
    public get $moveStatus(): string {
        return this.moveStatus;
    }

    /**
     * Getter $type
     * @return {string }
     */
    public get $type(): string {
        return this.type;
    }

    /**
     * Getter $name
     * @return {string }
     */
    public get $name(): string {
        return this.name;
    }

    /**
     * Getter $ref
     * @return {HTMLElement }
     */
    public get $ref(): HTMLElement {
        return this.ref;
    }

    /**
     * Getter $id
     * @return {number }
     */
    public get $id(): number {
        return this.id;
    }

    /**
     * Setter $moveStatus
     * @param {string } value
     */
    public set $moveStatus(value: string) {
        this.moveStatus = value;
    }

    /**
     * Setter $type
     * @param {string } value
     */
    public set $type(value: string) {
        this.type = value;
    }

    /**
     * Setter $name
     * @param {string } value
     */
    public set $name(value: string) {
        this.name = value;
    }

    /**
     * Setter $ref
     * @param {HTMLElement } value
     */
    public set $ref(value: HTMLElement) {
        this.ref = value;
    }

    /**
     * Setter $id
     * @param {string } value
     */
    public set $id(value: number) {
        this.id = value;
    }


    /**
     * Getter $speed
     * @return {number }
     */
    public get $speed(): number {
        return this.speed;
    }

    /**
     * Setter $speed
     * @param {number } value
     */
    public set $speed(value: number) {
        this.speed = value;
    }
    /**
     * Getter $x
     * @param {number } value
     */
    public get $x() {
        return this.x;
    }
    /**
     * Setter $x
     * @param {number } value
     */
    public set $x(value: number) {
        this.x = value;
    }
    /**
     * Getter $y
     * @param {number } value
     */
    public get $y() {
        return this.y;
    }
    /**
     * Setter $y
     * @param {number } value
     */
    public set $y(value: number) {
        this.y = value;
    }

    /**
     * Getter $panel
     * @param {number } value
     */
    public get $panel() {
        return this.panel;
    }
    /**
     * Setter $panel
     * @param {HTMLElement} value
     */
    public set $panel(value: HTMLElement) {
        this.panel = value;
    }


}
export default Substance;