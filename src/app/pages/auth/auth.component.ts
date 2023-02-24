import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  toggleSidenav: boolean = false;
  showSignUpButton: boolean = false;
  geoCoder: any;
  latitude!: number;
  longitude!: number;
  public lat: any;
  public lng: any;
  public zoom: number = 16;
  isLoggedIn: boolean = false;
  haveLocation: boolean = false;

  ngOnInit() {
    if (localStorage.getItem('location')) {
      this.haveLocation = true;
    }
  }

  openLoginDrawer() {
    this.toggleSidenav = !this.toggleSidenav;
  }

  toggleSignUp() {
    this.showSignUpButton = !this.showSignUpButton;
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          if (position) {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;

            let location = { latitude: this.lat, longitude: this.lng };
            localStorage.setItem('location', JSON.stringify(location));
            this.haveLocation = true;
          }
        },
        (error: any) => console.log(error)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
