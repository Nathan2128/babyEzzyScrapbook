import { Photo } from './photo.model';
import { Subject } from 'rxjs';

export class PhotoService {
    photosChanged = new Subject<Photo[]>();
    photoSelected = new Subject<Photo>();
    // private photos: Photo[] = [
    //     new Photo('Baby King', 'Ready for a wedding in my cultural clothing', 'assets/babyKing.jpeg'),
    //     new Photo('Fresh out the shower!', 'One of my favorite things to do is take a bath', 'assets/freshouttheshower.jpeg'),
    //     new Photo('I love to eat my own hands!', 'This does not mean im hungry!', 'assets/eatHands.jpeg')
    // ];

    private photos: Photo[] = [];

    getPhotos() {
        return this.photos.slice();
    }

    getPhoto(index: number) {
        return this.photos[index];
    }

    addPhoto(photo: Photo) {
        this.photos.push(photo);
        this.photosChanged.next(this.photos.slice());
    }

    updatePhoto(index: number, newPhoto: Photo) {
        this.photos[index] = newPhoto;
        this.photosChanged.next(this.photos.slice());
    }

    deleteRecipe(index: number) {
        this.photos.splice(index, 1);
        this.photosChanged.next(this.photos.slice());
    }

    setPhotos(photos: Photo[]) {
        this.photos = photos;
        this.photosChanged.next(this.photos.slice());
    }
}
