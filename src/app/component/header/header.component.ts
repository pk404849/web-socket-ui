import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    document.addEventListener("DOMContentLoaded", function(){
      
      window.addEventListener('scroll', function() {
           
        if (window.scrollY > 200) {
          var navbar = document.getElementById('navbar_top');
          if(navbar != null)
          navbar.classList.add('fixed-top');
          // add padding top to show content behind navbar
          var navbarSelevtor = document.querySelector('.navbar');
          if(navbarSelevtor != null){
        var  navbar_height = navbarSelevtor;
          document.body.style.paddingTop = navbar_height + 'px';
          }
        } else {
          var navbarTop = document.getElementById('navbar_top');
          if(navbarTop != null)
          navbarTop.classList.remove('fixed-top');
           // remove padding top from body
          document.body.style.paddingTop = '0';
        } 
      });
    }); 
  }
  register() {
    this.router.navigate(['register']);
  }
  login() {
    this.router.navigate(['login']);
  }
}
