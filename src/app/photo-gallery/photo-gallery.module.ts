import { NgModule } from '@angular/core';

import { PhotoGalleryComponent } from './photo-gallery.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoViewComponent } from './photo-view/photo-view.component';
import { PhotoComponent } from './photo-list/photo/photo.component';
import { SelectPhotoComponent } from './select-photo/select-photo.component';
import { PhotoEditComponent } from './photo-edit/photo-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PhotoGalleryRoutingModule } from './photo-gallery-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        PhotoGalleryComponent,
        PhotoListComponent,
        PhotoViewComponent,
        PhotoComponent,
        SelectPhotoComponent,
        PhotoEditComponent,
    ],
    imports: [ReactiveFormsModule, PhotoGalleryRoutingModule, RouterModule, SharedModule]
})

export class PhotoGalleryModule {}
