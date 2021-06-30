import { Photo } from './photo.model';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { PhotoService } from './photo.service';

@Injectable({providedIn: 'root'})
export class PhotosResolverService implements Resolve<Photo[]> {
    constructor(private dataStorageService: DataStorageService,
                private photoSvc: PhotoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const photos = this.photoSvc.getPhotos();
        if (photos.length === 0) {
            return this.dataStorageService.fetchScrapbook();
        } else {
            return photos;
        }
    }
}
