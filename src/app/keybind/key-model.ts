import { Guid } from '../services/guid';

export class KeyModel {
    public Alias: string;
    public Key: string;
    public Class: string;
    public Id: string;
    public Shift: boolean;
    public Alt: boolean;
    public Ctrl: boolean;
    public Mods: string;

    constructor(key: string, alias: string, shift: boolean, alt: boolean, ctrl: boolean) {
        const guid = new Guid();

        this.Key = key;
        if ( alias ) {
            this.Alias = alias;
        } else {
            this.Alias = key;
        }

        this.Shift = shift;
        this.Ctrl = ctrl;
        this.Alt = alt;
        this.Class = 'none';
        this.Id = guid.newGuid();

        this.Mods = '';

        if ( shift ) {this.Mods =  this.Mods + ' SHIFT'; }
        if ( alt ) {this.Mods =  this.Mods + ' ALT'; }
        if ( ctrl ) {this.Mods =  this.Mods + ' CTRL'; }
    }

}
