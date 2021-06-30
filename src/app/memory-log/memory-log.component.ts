import { Component, OnInit, OnDestroy } from '@angular/core';
import { Memory } from '../shared/memory.model';
import { MemoryService } from './memory.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-memory-log',
  templateUrl: './memory-log.component.html',
  styleUrls: ['./memory-log.component.css']
})
export class MemoryLogComponent implements OnInit, OnDestroy {
  memoryLog: Memory[];
  private memoryChangedSubscription: Subscription;

  constructor(private memoryService: MemoryService) { }

  ngOnInit() {
    this.memoryLog = this.memoryService.getMemories();
    this.memoryChangedSubscription = this.memoryService.memoriesChanged.subscribe((memories: Memory[]) => {
      this.memoryLog = memories;
    });
  }

  ngOnDestroy() {
    this.memoryChangedSubscription.unsubscribe();
  }

  onEditMemory(id: number) {
    this.memoryService.editingIndex.next(id);
  }
}
