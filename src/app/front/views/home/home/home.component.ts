import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

  sliderContent = [
    {
      url: "../assets/images/banner-img.png",
      title: "Medical",
      subtitle: "Equipment",
      desc:
        "Every great purchase starts here!",
    },
    {
      url: "../assets/images/banner-img.png",
      title: "Medical",
      subtitle: "Equipment",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, cumque dolorum autem ipsam ",
    },
    {
      url: "../assets/images/banner-img.png",
      title: "Home 3",
      subtitle: "Home 3",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, cumque dolorum autem ipsam ",
    },
  ];

  SlideOptions = { items: 1, dots: false, nav: true, autoHeight: true };
  CarouselOptions = { items: 3, dots: true, nav: true };

  constructor() { }

  ngOnInit() { }

}