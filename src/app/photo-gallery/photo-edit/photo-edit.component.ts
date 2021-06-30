import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { PhotoService } from '../photo.service';
import { Photo } from '../photo.model';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {

  id: number;
  editMode = false;
  photoForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private photoSvc: PhotoService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: radix
      this.id = parseInt(params.id);

      // return true if id is a number
      this.editMode = !isNaN(this.id);
      this.initializeForm();
    });
  }

  initializeForm() {
    let photoName = '';
    let photoPath = '';
    let photoDescription = '';
    const photoComments: FormArray = new FormArray([]);

    if (this.editMode) {
      const photo = this.photoSvc.getPhoto(this.id);
      photoName = photo.name;
      photoPath = photo.imagePath;
      photoDescription = photo.description;
      if (photo.comments) {
        for (const comment of photo.comments) {
          photoComments.push(
            new FormGroup({
              comment: new FormControl(comment, Validators.required)
            })
          );
        }
      }
    }
    this.photoForm = new FormGroup({
      name: new FormControl(photoName, Validators.required),
      babyPicPath: new FormControl(photoPath, Validators.required),
      desc: new FormControl(photoDescription),
      comments: photoComments
    });
  }

  onSubmit() {
    const newPhoto = new Photo(
      this.photoForm.value.name,
      this.photoForm.value.desc,
      this.photoForm.value.babyPicPath,
      this.photoForm.value.comments
    );
    if (this.editMode) {
      this.photoSvc.updatePhoto(this.id, newPhoto);
    } else {
      this.photoSvc.addPhoto(newPhoto);
    }
    this.onCancel();
  }

  onAddComment() {
    ( this.photoForm.get('comments') as FormArray).push(
      new FormGroup({
        comment: new FormControl()
      })
    );
  }

  get controls() { // a getter!
    return (this.photoForm.get('comments') as FormArray).controls;
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteComment(index: number) {
    ( this.photoForm.get('comments') as FormArray).removeAt(index);
  }

}
