import { Params } from "../../proof/data/Params";


export class Download{


    public static download(){
        let dom = document.getElementById(Params.DOM_WEBGL) as HTMLCanvasElement;
        let link = document.createElement('a');
        link.href = dom.toDataURL('image/png');

        let date = new Date(); // 現在の日時を取得
        let y = date.getFullYear().toString().slice(-2); // 年を2桁にして取得
        let m = ("0" + (date.getMonth() + 1)).slice(-2); // 月を2桁にして取得
        let d = ("0" + date.getDate()).slice(-2); // 日を2桁にして取得
        let h = ("0" + date.getHours()).slice(-2); // 時を2桁にして取得
        let i = ("0" + date.getMinutes()).slice(-2); // 分を2桁にして取得
        let s = ("0" + date.getSeconds()).slice(-2); // 秒を2桁にして取得
        let dateString = y + m + d + "_" + h + i + s; // 日付文字列を作成

        link.download = dateString+'.png'
        link.click()
    }

}
