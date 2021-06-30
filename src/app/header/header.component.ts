import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuth = false;
    private userSubscription: Subscription;
    @Output() pageSelected = new EventEmitter<string>();

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

    ngOnInit() {
        this.userSubscription = this.authService.user.subscribe(user => {
            this.isAuth = !!user;
        });
    }


    onSelect(page: string) {
        this.pageSelected.emit(page);
    }

    onSaveScrapbook() {
        this.dataStorageService.storeScrapbook();
    }

    onFetchScrapbook() {
        this.dataStorageService.fetchScrapbook().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}
