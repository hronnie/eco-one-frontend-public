import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeleteButtonRendererComponent} from "../components/aggrid/deleteButtonRenderer.component";
import {TrainingService} from "../services/training.service";

@NgModule({
  declarations: [DeleteButtonRendererComponent],
  imports: [CommonModule],
  exports: [DeleteButtonRendererComponent],
  providers: [TrainingService]
})
export class SharedModule {
}
