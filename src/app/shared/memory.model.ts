export class Memory {
    public name: string;
    public date: Date;
    public description: string;

    constructor(name: string, date: Date, desc: string) {
        this.name = name;
        this.date = date;
        this.description = desc;
    }
}
