import { Routes } from '@angular/router';
import { Error404Component } from "../app/components/errors/error404/error404.component";
import { Error500Component } from "../app/components/errors/error500/error500.component";
import { Error403Component } from "../app/components/errors/error403/error403.component";

export const ERRORS_ROUTE: Routes = [
    { path: '404', component: Error404Component },
    { path: '500', component: Error500Component },
    { path: '403', component: Error403Component }    
];