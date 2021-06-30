import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Memory } from '../../shared/memory.model';
import { MemoryService } from '../memory.service';

@Component({
  selector: 'app-memory-edit',
  templateUrl: './memory-edit.component.html',
  styleUrls: ['./memory-edit.component.css']
})
export class MemoryEditComponent implements OnInit, OnDestroy {
  @ViewChild('memoryForm', {static: false}) form: NgForm;
  indexSubscription: Subscription;
  editMode = false;
  memoryIndex: number;
  editedMemory: Memory;

  constructor(private memoryService: MemoryService) { }

  ngOnInit() {
    this.indexSubscription = this.memoryService.editingIndex
      .subscribe(
        (id: number) => {
          this.memoryIndex = id;
          this.editMode = true;
          this.editedMemory = this.memoryService.getMemory(id);
          this.form.setValue({
            name: this.editedMemory.name,
            description: this.editedMemory.description,
            date: this.editedMemory.date
          });
        }
      );
  }

  onSubmitForm(form: NgForm) {
    const value = form.value;
    const newMemory = new Memory(value.name, value.date, value.description);
    if (this.editMode) {
      this.memoryService.updateMemory(this.memoryIndex, newMemory);
    } else {
      this.memoryService.addMemory(newMemory);
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy() {
    this.indexSubscription.unsubscribe();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.memoryService.deleteMemory(this.memoryIndex);
    this.onClear();
  }
}
