export class UNIXTimeFormatter{

    static formatUnixTime(unixTime:number):string {

        const date = new Date(unixTime*1000);

        const year      = date.getUTCFullYear();
        const month     = this.padZero(date.getUTCMonth() + 1);
        const day       = this.padZero(date.getUTCDate());
        const hours     = this.padZero(date.getUTCHours());
        const minutes   = this.padZero(date.getUTCMinutes());
        const seconds   = this.padZero(date.getUTCSeconds());

        return `${year}.${month}.${day}. ${hours}:${minutes}:${seconds}`;
    }

    static padZero(value: number): string {
        return value.toString().padStart(2, '0');
    }

}
