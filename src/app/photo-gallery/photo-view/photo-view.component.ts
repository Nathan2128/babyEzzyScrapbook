import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo.model';
import { PhotoService } from '../photo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import {DropdownDirective}

@Component({
  selector: 'app-photo-view',
  templateUrl: './photo-view.component.html',
  styleUrls: ['./photo-view.component.css']
})
export class PhotoViewComponent implements OnInit {
  photo: Photo;
  id: number;
  
  constructor(private photoService: PhotoService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.photo = this.photoService.getPhoto(this.id);
      }
    );
  }

  onEditPhoto() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeletePhoto() {
    this.photoService.deleteRecipe(this.id);
    this.router.navigate(['/photo-gallery']);
  }
}
