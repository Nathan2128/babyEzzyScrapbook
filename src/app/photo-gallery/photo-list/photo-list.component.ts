import { Component, OnInit, OnDestroy } from '@angular/core';
import { Photo } from '../photo.model';
import { PhotoService } from '../photo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {
  photoList: Photo[] = [];
  subscription: Subscription;
  constructor(private photoService: PhotoService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.photoService.photosChanged
      .subscribe(
        (photos: Photo[]) => {
          this.photoList = photos;
        }
      )
    this.photoList = this.photoService.getPhotos();
  }

  onAddPhoto() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
