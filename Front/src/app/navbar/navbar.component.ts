import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  name: string = '';
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (!this.authService.currentSessionValue.name) {
      this.router.navigate(['/']);
    }else{
      this.name = this.authService.currentSessionValue.name
    }
  }

  logout(){
    this.authService.exit();
    this.router.navigate(['/']);
  }

}
