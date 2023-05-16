export class AbsDOM{


    public dom:HTMLElement;
    
    constructor(
        dom:HTMLElement,
        zIndex:number
    ){
        this.dom = dom;
        this.dom.style.position="absolute";
        this.dom.style.zIndex = ""+zIndex;
        //parentDom.append(this.dom);
    }

    show(){
        this.dom.style.display="block";
    }

    hide(){
        this.dom.style.display="none";
    }

    get width(){
        return this.dom.clientWidth;
    }    
    get height():number{
        return this.dom.clientHeight;
    }

    //-----setter-----
    set x(value: number) {
        this.dom.style.left = value + "px";
    }
    get x():number {
        return parseFloat(this.dom.style.left);
    }    
    set y(value: number) {
        this.dom.style.top = value + "px";
    }
    get y():number {
        return parseFloat(this.dom.style.top);
    }
    get color():string{
        return this.dom.style.color;
    }
    get text(){
        return this.dom.innerHTML;
    }
    set width(value: number) {
        this.dom.style.width = value + "px";
    }
    set height(value: number) {
        this.dom.style.height = value + "px";
    }
    set color(value: string){
        this.dom.style.color = value;
    }
    set backgroundColor(value: string){
        this.dom.style.backgroundColor = value;
    }
    set text(value:string){
        this.dom.innerHTML = value;
    }
    set fontSize(value:string){
        this.dom.style.fontSize=value;
    }

}