import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { Post } from './app/pages/post/post';
import jsCookie from 'js-cookie';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PublicPost } from './app/pages/post/public.post';

@Injectable({
    providedIn: 'root'
})
class AuthGuard {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = jsCookie.get('token')
        if (!token) {
            this.router.navigate(['/auth/login'])
            return false
        }
        return true
    }
}

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { canActivate: [AuthGuard], path: '', component: Post },
        ]
    },
    { path: 'public', component: PublicPost },
    // { path: 'landing', component: Landing },
    // { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
