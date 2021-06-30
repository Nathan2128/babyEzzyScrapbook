import { NgModule } from '@angular/core';
import { MemoryLogComponent } from './memory-log.component';
import { MemoryEditComponent } from './memory-edit/memory-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        MemoryLogComponent,
        MemoryEditComponent
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([{ path: '', component: MemoryLogComponent }]),
        SharedModule
    ]
})
export class MemoryLogModule {}
