export class KeyModel {
    public Alias: string;
    public Key: string;
    public Class: string;

    constructor(key: string) {
        this.Key = key;
        this.Alias = key;
        this.Class = 'none';
    }

}
