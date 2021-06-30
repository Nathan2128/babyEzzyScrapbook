export class Photo {
    name: string;
    description: string;
    imagePath: string;
    comments: string[];

    constructor(name: string, desc: string, imagePath: string, comments?: string[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.comments = comments;
    }
}