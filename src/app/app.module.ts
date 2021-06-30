import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MemoryService } from './memory-log/memory.service';
import { AppRoutingModule } from './app.routing.module';
import { PhotoService } from './photo-gallery/photo.service';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { PhotoGalleryModule } from './photo-gallery/photo-gallery.module';
import { MemoryLogModule } from './memory-log/memory-log.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MemoryLogModule,
    SharedModule,
    AuthModule
  ],
  providers: [MemoryService, PhotoService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
