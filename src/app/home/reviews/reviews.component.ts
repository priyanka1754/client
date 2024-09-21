import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Review {
  name: string;
  review: string;
  rating: number;
  image: string;
}

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  standalone: true,
  imports: [CommonModule,RouterLink],
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {
  reviews: Review[] = [
    {
      name: 'Tiara',
      review: '"Perfect Toy for Little Ones!The colorful, stackable pieces keep her engaged for hours, and its great to see her developing her motor skills while having fun. The quality is excellent, and the pieces are easy for small hands to grip. We couldnt be happier with this product—it provides both entertainment and learning. Highly recommend for young kids!"',
      rating: 5,
      image: 'assets/review1.jpeg'
    },
    {
      name: 'Rashmi',
      review: '"Fun Car Set for Endless Play!" The vibrant colors and realistic design capture his attention, and he spends hours playing with them. The cars are sturdy and well-made, handling even rough play without any issues. Its amazing to watch him explore and get creative with these cars. Overall, its a fantastic product that keeps our little one entertained and happy. Highly recommend for any car-loving kid!',
      rating: 5,
      image: 'assets/review2.jpeg'
    },
    {
      name: 'Kavya',
      review: '"Fun and Entertaining Cactus Toy!"This dancing cactus toy is a hit with our baby! The music and movement grab their attention, and its so fun to watch them interact with it. Keeps them entertained for a long time. Great buy!',
      rating: 5,
      image: 'assets/review3.jpeg'
    },
    {
      name: 'Srihari',
      review: ' "This product makes my son to create new and amazing things which makes him feel better. And he used to create amazing things with those accessories"',
      rating: 5,
      image: 'assets/review4.jpeg'
    },
    {
      name: 'Yaswanth',
      review: '" My son is having great fun playing with these toys. Its also helpful in learn all about animal kingdom. Its lot helpful for kids to gain knowledge practically! "',
      rating: 5,
      image: 'assets/review5.jpeg'
    },
    

  ];

  activeIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.nextReview();
    }, 8000); // Change review every 5 seconds
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextReview() {
    this.activeIndex = (this.activeIndex + 1) % this.reviews.length;
  }

  previousReview() {
    this.activeIndex = (this.activeIndex - 1 + this.reviews.length) % this.reviews.length;
  }

  goToReview(index : number){
    this.activeIndex=index;
  }
}