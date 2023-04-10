import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ElearningComponent} from "./elearning.component";
import {ElearningGuard} from "./elearning.guard";

const routes: Routes = [
  {path: '', component: ElearningComponent, pathMatch: 'full', canActivate: [ElearningGuard]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElearningRoutingModule {
}
