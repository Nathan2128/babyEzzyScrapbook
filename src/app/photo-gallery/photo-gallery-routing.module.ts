import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoGalleryComponent } from './photo-gallery.component';
import { AuthGuard } from '../auth/auth.guard';
import { SelectPhotoComponent } from './select-photo/select-photo.component';
import { PhotoEditComponent } from './photo-edit/photo-edit.component';
import { PhotoViewComponent } from './photo-view/photo-view.component';
import { PhotosResolverService } from './photos-resolver.service';

const routes: Routes = [
    { path: '', component: PhotoGalleryComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', component: SelectPhotoComponent },
        { path: 'new', component: PhotoEditComponent},
        { path: ':id', component: PhotoViewComponent, resolve: [PhotosResolverService] },
        { path: ':id/edit', component: PhotoEditComponent, resolve: [PhotosResolverService] }
    ]},
]
@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PhotoGalleryRoutingModule {}
