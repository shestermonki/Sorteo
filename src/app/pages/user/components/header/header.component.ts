import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { ResponseDataUser } from '../../../../interfaces/user/response-user.interface';
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

  public _user?: ResponseDataUser;
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
    }else{
      // Añadir una img default si no tiene avatar
    }
  }

}
