import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhotoService } from '../photo-gallery/photo.service';
import { Photo } from '../photo-gallery/photo.model';
import { map, tap } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private photoService: PhotoService, private authService: AuthService) {}

    storeScrapbook() {
        const photos = this.photoService.getPhotos();
        this.http.put('https://babyezzyscrapbook-default-rtdb.firebaseio.com/photos.json', photos)
        .subscribe(
            response => {
                console.log(response);
            }
        );
    }

    fetchScrapbook() {
        return this.http.get<Photo[]>('https://babyezzyscrapbook-default-rtdb.firebaseio.com/photos.json')
        //need this once adding in the COMMENTS feature
        // .pipe(map(photos => {
        //     return photos.map(photo => {
        //         return {...photo, comments: photo.comments ? photo.comments : []};
        //     });
        // }))
        .pipe(
            tap(photos => {
                this.photoService.setPhotos(photos);
            })
        );
    }
}
