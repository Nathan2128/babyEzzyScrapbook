import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const appRoutes: Routes = [
    { path: '', redirectTo: '/photo-gallery', pathMatch: 'full' },
    { path: 'photo-gallery',
        loadChildren: () => import('./photo-gallery/photo-gallery.module').then(module => module.PhotoGalleryModule)
    },
    { path: 'memory-log',
        loadChildren: () => import('./memory-log/memory-log.module').then(module => module.MemoryLogModule)
    }
];
@NgModule({
    imports : [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
