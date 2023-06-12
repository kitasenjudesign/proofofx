export class LabColor {


    public static labToRgb2(l: number, amp:number, rad:number): {r:number, g:number, b:number} {

        let rgb = this.labToRgb(
            l,
            amp*Math.cos(rad),
            amp*Math.sin(rad)
        );
        return rgb;

    }

    /**
     * 
     * @param l 0-100
     * @param a -128-127
     * @param b -128-127
     * @returns 
     */
    public static labToRgb(l: number, a: number, b: number): {r:number, g:number, b:number} {
        let y = (l + 16) / 116;
        let x = a / 500 + y;
        let z = y - b / 200;
    
        x = Math.pow(x, 3) > 0.008856 ? Math.pow(x, 3) : (x - 16 / 116) / 7.787;
        y = Math.pow(y, 3) > 0.008856 ? Math.pow(y, 3) : (y - 16 / 116) / 7.787;
        z = Math.pow(z, 3) > 0.008856 ? Math.pow(z, 3) : (z - 16 / 116) / 7.787;
    
        x *= 95.047; // reference white
        y *= 100.0;
        z *= 108.883;
    
        let rVal = x * 3.2406 + y * -1.5372 + z * -0.4986;
        let gVal = x * -0.9689 + y * 1.8758 + z * 0.0415;
        let bVal = x * 0.0557 + y * -0.2040 + z * 1.0570;
    
        rVal = rVal > 0.0031308 ? 1.055 * Math.pow(rVal, 1 / 2.4) - 0.055 : 12.92 * rVal;
        gVal = gVal > 0.0031308 ? 1.055 * Math.pow(gVal, 1 / 2.4) - 0.055 : 12.92 * gVal;
        bVal = bVal > 0.0031308 ? 1.055 * Math.pow(bVal, 1 / 2.4) - 0.055 : 12.92 * bVal;
    
        // RGBを0〜1の範囲にする
        rVal = Math.max(0, Math.min(1, rVal));
        gVal = Math.max(0, Math.min(1, gVal));
        bVal = Math.max(0, Math.min(1, bVal));
    
        return {r:rVal, g:gVal, b:bVal};
    }

}