import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule, MatDialogModule } from '@angular/material';

// import {} from '../angular'
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  declarations: [PostCreateComponent, PostListComponent],
  imports: [
    CommonModule,
    // AngularMat,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class PostModule {

}
