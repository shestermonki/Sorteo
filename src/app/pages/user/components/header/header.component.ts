import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { ResponseDateUser } from '../../../../interfaces/user/response-user.interface';
import { RouterModule, RouterOutlet } from '@angular/router';

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

  public _user?: ResponseDateUser;
  public srcAvatar = signal<string>('https://cdn.discordapp.com/avatars/');
  @Input({required: true}) set user( user: ResponseDateUser | null ){
    if (!user) return;

    this._user = user;
    this.setAvatarUser( user );
  };
  
  setAvatarUser( user: ResponseDateUser ){
    const { id, avatar } = user;
    if (avatar) {
      this.srcAvatar.update( value => value + `${id}/${avatar}`);
    }else{
      // Añadir una img default si no tiene avatar
    }
  }

}
