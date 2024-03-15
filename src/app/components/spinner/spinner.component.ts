import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, signal } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    @if(_isLoading()){
    <div class="spinner">
      <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
      </div>
    </div>
    }
  `,
  styles: `
    .spinner{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      background: #000a;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  
  _isLoading = signal<boolean>(false);
  
  @Input({required: true}) set isLoading(value: boolean){
    this._isLoading.set( value );
  }

}