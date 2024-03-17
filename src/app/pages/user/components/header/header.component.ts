import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject, signal } from '@angular/core';
import { ResponseDataUser } from '../../../../interfaces/user/response-user.interface';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  public _user?: ResponseDataUser;
  private _router = inject( Router );
  public srcAvatar = signal<string>('https://cdn.discordapp.com/avatars/');


  @Input({required: true}) set user( user: ResponseDataUser | null ){
    if (!user) return;

    this._user = user;
    this.setAvatarUser( user );
  };
  
  setAvatarUser( user: ResponseDataUser ){
    const { id, avatar } = user;
    if (avatar) {
      this.srcAvatar.update( value => value + `${id}/${avatar}`);
    }
  }

  logout() {
    window.location.reload();
    localStorage.clear();
    this._router.navigate(['/login']);
  }

}
