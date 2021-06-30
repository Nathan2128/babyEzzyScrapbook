import { Component, OnInit } from '@angular/core';
import { Photo } from './photo.model';
import { PhotoService } from './photo.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {

  selectedPhoto: Photo;

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.photoSelected.subscribe(
      (photo: Photo) => {
        this.selectedPhoto = photo;
      }
    );
  }

}
