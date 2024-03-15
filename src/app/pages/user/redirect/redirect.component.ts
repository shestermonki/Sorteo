import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenDc } from '../../../services/discord-api/token-dc';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RedirectComponent implements OnInit{

  private activatedRoute = inject( ActivatedRoute );
  private tokenDc = new TokenDc();
  private router = inject( Router );

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({token}) =>{
      if (!token) this.router.navigateByUrl( '/login-usuario' );

      this.tokenDc.setToken(token);
      this.router.navigateByUrl( '/sorteo' );
    });
  }

}
