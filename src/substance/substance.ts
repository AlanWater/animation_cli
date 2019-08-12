class Substance {
    private moveStatus: 'moving' | 'stop' | string = 'stop';
    private type: string = '';
    private name: string = '';
    private ref:HTMLElement = null;
    private id:number = 0;
    private static circleSequenceNum = 10000;
    private static circleSequenceId = 0;
    private static refQueue:Array<HTMLElement> = [];
    private static refMap:{
        [id:string]:HTMLElement;
    }
    private static pushObject = (ref:HTMLElement)=>{
        Substance.refQueue.push(ref);
    }
    private static popObject = ()=>{
        return Substance.refQueue.pop();
    }
    private static increaseId = ()=>{
        Substance.circleSequenceId = Substance.circleSequenceId % Substance.circleSequenceNum + 1;
        return Substance.circleSequenceId;
    }
    private static createObjectRef = (type:string,id:number)=>{
        const preRef = document.getElementById(`${type}${id}`);
        if(preRef){
            preRef.remove();
        }
        //必须有一个容器，才能在容器中挂载物件，默认为body
        const container = document.querySelector('body');
        let ref = document.createElement('div');
        ref.style.position='absolute';
        ref.id = `${type}${id}`
        ref.className = `substance-${type}`
        container.appendChild(ref);
        //队列映射操作
        Substance.refMap[id] = ref;
        Substance.refQueue.push(ref);
        return ref;
    }
    constructor(type:string,name?:string,moveStatus?:string){
        this.moveStatus = moveStatus;
        this.type = type;
        this.name = name;
        this.id = Substance.increaseId();
        this.ref = Substance.createObjectRef(type,this.id);
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
    
}
export default Substance;