import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeleteButtonRendererComponent} from "../components/aggrid/deleteButtonRenderer.component";
import {TrainingService} from "../services/training.service";
import {DatePickerInputComponent} from "../components/aggrid/datePickerInput.component";

@NgModule({
  declarations: [
    DeleteButtonRendererComponent,
    DatePickerInputComponent
  ],
  imports: [CommonModule],
  exports: [
      DeleteButtonRendererComponent,
      DatePickerInputComponent
  ],
  providers: [TrainingService]
})
export class SharedModule {
}
