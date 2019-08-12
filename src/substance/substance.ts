export interface Lay{
    x:number;
    y:number;
}
class Substance {
    private moveStatus: 'moving' | 'stop' | string = 'stop';
    private type: string = '';
    private name: string = '';
    private ref:HTMLElement = null;
    private id:number = 0;
    private x:number = window.outerWidth / 2;
    private y:number = window.outerHeight / 2;
    private direction: 'up'|'leftUp'|'rightUp'|'left'|'right'|'down'|'leftDown'|'rightDown' = "down";
    private speed:number = 1;
    private static circleSequenceNum = 10000;
    private static circleSequenceId = 0;
    private static refMap:{
        [id:string]:HTMLElement;
    } = {};
    private static increaseId = ()=>{
        Substance.circleSequenceId = Substance.circleSequenceId % Substance.circleSequenceNum + 1;
        return Substance.circleSequenceId;
    }
    private static createObjectRef = (type:string,id:number,lay:Lay)=>{
        //保证系统稳定，设置了最大限制，id是循环的，先移除原来的id
        const preRef = document.getElementById(`${type}${id}`);
        if(preRef){
            preRef.remove();
            delete Substance.refMap[id]
        }
        //必须有一个容器，才能在容器中挂载物件，默认为body
        const container = document.querySelector('body');
        let ref = document.createElement('div');
        ref.style.position='absolute';
        ref.style.left = lay.x + 'px';
        ref.style.top = lay.y + 'px';
        ref.id = `${type}${id}`;
        ref.className = `substance-${type}`;
        container.appendChild(ref);
        //队列映射操作
        Substance.refMap[id] = ref;
        return ref;
    }
    constructor(type:string,name?:string,moveStatus?:string,x?:number,y?:number,speed?:number){
        this.type = type;
        name && (this.name = name);
        moveStatus && (this.moveStatus = moveStatus);
        x && (this.x = x);
        y && (this.y = y);
        speed && (this.speed = speed);
        this.id = Substance.increaseId();
        this.ref = Substance.createObjectRef(type,this.id,{x:this.x,y:this.y});
    }
    //运行对象
    public run (){
        const animation = (timestamp:number) =>{
            const { moveStatus,id } = this;
            switch (moveStatus){
                case 'up':{
                    this.y-=this.speed;
                    break;
                }
                case 'down':{
                    this.y+=this.speed;
                    break;
                }
                case 'leftTop':{
                    this.x-=this.speed;
                    this.y-=this.speed;
                    break;
                }
                case 'rightTop':{
                    this.x+=this.speed;
                    this.y-=this.speed;
                    break;
                }
                case 'left':{
                    this.x -= this.speed;
                    break;
                }
                case 'right':{
                    this.x += this.speed;
                    break;
                }
                case 'leftDown':{
                    this.x -= this.speed;
                    this.y += this.speed;
                    break;
                }
                case 'rightDown':{
                    this.x += this.speed;
                    this.y += this.speed;
                    break;
                }
            }
            Substance.refMap[id].style.left = this.x +'px';
            Substance.refMap[id].style.top = this.y +'px';
            requestAnimationFrame(animation);
        }
        animation.call(this,performance.now());
    }
    /**
     * Getter $moveStatus
     * @return {string }
     */
	public get $moveStatus(): string  {
		return this.moveStatus;
	}

    /**
     * Getter $type
     * @return {string }
     */
	public get $type(): string  {
		return this.type;
	}

    /**
     * Getter $name
     * @return {string }
     */
	public get $name(): string  {
		return this.name;
	}

    /**
     * Getter $ref
     * @return {HTMLElement }
     */
	public get $ref(): HTMLElement  {
		return this.ref;
	}

    /**
     * Getter $id
     * @return {number }
     */
	public get $id(): number  {
		return this.id;
	}

    /**
     * Setter $moveStatus
     * @param {string } value
     */
	public set $moveStatus(value: string ) {
		this.moveStatus = value;
	}

    /**
     * Setter $type
     * @param {string } value
     */
	public set $type(value: string ) {
		this.type = value;
	}

    /**
     * Setter $name
     * @param {string } value
     */
	public set $name(value: string ) {
		this.name = value;
	}

    /**
     * Setter $ref
     * @param {HTMLElement } value
     */
	public set $ref(value: HTMLElement ) {
		this.ref = value;
	}

    /**
     * Setter $id
     * @param {string } value
     */
	public set $id(value: number ) {
		this.id = value;
    }


    /**
     * Getter $speed
     * @return {number }
     */
	public get $speed(): number  {
		return this.speed;
	}

    /**
     * Setter $speed
     * @param {number } value
     */
	public set $speed(value: number ) {
		this.speed = value;
	}

    /**
     * Setter $x
     * @param {number } value
     */
	public set $x(value: number ) {
        if(value>=0 && value<=window.outerWidth){
            this.x = value;
        }
	}

    /**
     * Setter $y
     * @param {number } value
     */
	public set $y(value: number ) {
		if(value>=0 && value<=window.outerHeight){
            this.y = value;
        }
	}
    
    
}
export default Substance;