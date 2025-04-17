import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, tap } from 'rxjs';
import { AppStore } from './store/app.store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  title = 'eshop';
  private appStore: AppStore = inject(AppStore);

  ngOnInit(): void {
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
    ).subscribe((e: RouterEvent) => {
      const currentRoute = this.getDeepestChild(this.activatedRoute.snapshot.root);
      this.appStore.setCurrentPage(currentRoute.data['page']);
    //  console.log('Current page:', currentRoute.data['page']);test
    });
  }

  private getDeepestChild(route: ActivatedRouteSnapshot) {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
