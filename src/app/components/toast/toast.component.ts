import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, signal } from '@angular/core';
import { RegisterUserInSorteo, TypeStatus } from '../../services/sorteos.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div class="toaster" #toast
      [ngClass]="{
        'showToast': toggleToast,
        'hiddenToast': !toggleToast
      }">
      {{ _message() }}
    </div>
  `,
  styleUrl: './toast.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {

  public _message = signal('');
  @ViewChild('toast') toast?: ElementRef<HTMLDivElement>;

  @Input({required: true}) toggleToast: boolean = false;
  
  @Input() set respRegisterSorteo(value: RegisterUserInSorteo | null){
    if (!value) return;

    if (value.message) this._message.set( value.message );
    this.changeBackgroundToast( value.status );
  };

  changeBackgroundToast( status: TypeStatus ){
    switch (status) {
      case TypeStatus.ISIN: 
        return this.toast!.nativeElement.style.background = '#0d6efd';
      case TypeStatus.OK: 
        return this.toast!.nativeElement.style.background = '#198754';
      case TypeStatus.NOTSERVER:
        return this.toast!.nativeElement.style.background = '#58151c';
      case TypeStatus.NOTSORTEO:
        return this.toast!.nativeElement.style.background = '#dc3545';
      default: return ''
    }
  }
  
}
