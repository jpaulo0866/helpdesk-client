import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    public shared: SharedService;

    constructor(private router: Router) {
        this.shared = SharedService.getInstance();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.shared.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
