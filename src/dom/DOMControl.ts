import { DataManager } from "../main/data/DataManager";
import { UNIXTimeFormatter } from "../main/data/UNITTimeFormatter";
import { Colors } from "../proof/data/Colors";
import { Params } from "../proof/data/Params";
import { AbsDOM } from "./AbsDOM";

export class DOMControl{

    public title:AbsDOM;
    
    constructor(){
        this.init();
    }

    init(){
        this.title = new AbsDOM(
            document.getElementById(Params.DOM_TITLE),
            999
        );
        this.title.text = "PROOF OF X | ";
        this.title.text += " MINTED AT " + UNIXTimeFormatter.formatUnixTime(Params.USER_TIME);

        if(Params.USER_NAME){
            this.title.text += " | "+ Params.USER_NAME;
        }
        
        if(Params.MODE_STAFF || Params.MODE_ARTIST){
            this.title.text += " | "+Params.USER_ROLE.toUpperCase();
        }
        
        if(Params.MODE_NFT){
            this.title.text += "<br/>" + Params.USER_HASH;
        }
        if(Params.MODE_WEBSITE){
            this.title.text = ""
        }
    }

    setTitleY(arg0: number) {
        this.title.y = arg0;        
        
        //161020 '274fc'

        let hex = Colors.rgb2hex(Colors.colors[0]).toString(16)

        while(hex.length<6){
            hex = "0"+hex;
        }
        this.title.color="rgba(0,0,0,0.6)"
        //this.title.color = "#"+hex;

        if(this.title.y>window.innerHeight-this.title.height){
            this.title.y = window.innerHeight-this.title.height;
        }

    }

    update(){
        //this.title.y = 100;
    }

}