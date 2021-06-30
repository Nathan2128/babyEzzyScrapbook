import { Memory } from '../shared/memory.model';
import { Subject } from 'rxjs';

export class MemoryService {
    memoriesChanged = new Subject<Memory[]>();
    editingIndex = new Subject<number>();
    private memories: Memory[] = [
        new Memory(`Aadhav's first word's`, new Date('2020-05-02'), 'He finally said Amma!'),
        new Memory(`Aadhav's first step's`, new Date('2020-11-02'), 'Sooner than expected!')
    ];

    getMemories() {
        return this.memories.slice();
    }

    getMemory(index: number) {
        return this.memories[index];
    }

    addMemory(memory: Memory) {
        this.memories.push(memory);
        this.memoriesChanged.next(this.memories.slice());
    }

    updateMemory(index: number, newMemory: Memory) {
        this.memories[index] = newMemory;
        this.memoriesChanged.next(this.memories.slice());
    }

    deleteMemory(index: number) {
        this.memories.splice(index, 1);
        this.memoriesChanged.next(this.memories.slice());
    }
}
