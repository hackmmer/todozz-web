import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe, LowerCasePipe } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule, JsonPipe, LowerCasePipe],
  exports: [JsonPipe, LowerCasePipe],
})
export class PipesModule {}
