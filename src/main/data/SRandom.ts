import { Xorshift } from "./Xorshift";

export class SRandom{

    public static xorShift:Xorshift;

    public static init(seed:string){
        //"0x115044fc9f4b40dc9d4971a9e5c8a5863bd4ef7ccdd30db4f4ca04786457f88c"
        this.xorShift = new Xorshift(seed);
    }

    public static random(){

        if(this.xorShift==null){
            console.log("SRandom is not initialized");
            return Math.random();
        }
        return this.xorShift.nextFloat();

    }


}