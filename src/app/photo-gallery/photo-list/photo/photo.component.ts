import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../photo.model';
import { PhotoService } from '../../photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  @Input() photo: Photo;
  @Input() index: number;

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
  }

  onPhotoSelected() {
    this.photoService.photoSelected.next(this.photo);
  }

}
