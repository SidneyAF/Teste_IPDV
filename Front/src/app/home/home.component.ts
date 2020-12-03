import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
}


  onSubmit() {
    this.authService.authenticate(this.name).then(data =>{
      this.router.navigate(['/dashboard']);
    });
  }

}
