export class Xorshift {
  
    private state: number;
  
    constructor(seedHash: string) {
      this.state = this.hashStringToInt32(seedHash);
    }
  
    public hashStringToInt32(str: string): number {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32-bit integer
      }
      return hash;
    }

    public nextInt(): number {
      let x = this.state;
      x ^= x << 13;
      x ^= x >>> 17;
      x ^= x << 5;
      this.state = x;
      return x;
    }
  
    public nextFloat(): number {
      return (this.nextInt() >>> 0) / 0xFFFFFFFF;
    }
  }
  