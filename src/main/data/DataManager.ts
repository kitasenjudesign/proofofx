import { DOMControl } from "../../dom/DOMControl";
import { Params } from "../../proof/data/Params";
import { MySVGLoader } from "../../shapes/MySVGLoader";
import { IntersectionLine } from "../intersection/IntersectionLine";
import { Particles } from "../particles/Particles";


export class DataManager{

  //--------------------------------------------singleton

  private static instance:DataManager;

  constructor(){
    //DataManager.instance = this;
  }

  public static getInstance():DataManager{
    if(DataManager.instance == null){
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  //--------------------------------------------

  public svg            :MySVGLoader;
  public particles      :Particles;
  public instersection  :IntersectionLine;
  public domControl     :DOMControl;

  public init(callback:()=>void){
    
    //console.log(hoge);
    
    
    let loader = new MySVGLoader();
    loader.init(Params.PATH + "moji3.svg",()=>{
         callback();   
      });
    this.svg=loader;//.add(loader);

     //DataManager.instance.svg = loader;
     
  }

}
