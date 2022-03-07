import { Component, Input, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css', './../../styles.css']
})
export class HeroDetailComponent implements OnInit {

  heroes: Hero[] = [];
  maxHp = 0;
  maxAd = 0;
  maxAs = 0;

  @Input() hero?: Hero;
  
  constructor(
    private route: ActivatedRoute, 
    private heroService: HeroService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getHero();
    this.getHeroes();
  }
  
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }


  getMaxStats(): void {
    this.heroes.forEach((heroes) => {
      this.maxHp = Math.max(heroes.hp, this.maxHp);
      this.maxAd = Math.max(heroes.ad, this.maxAd);
      this.maxAs = Math.max(heroes.as, this.maxAs);
    });
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe((heroes) => {
        this.heroes = heroes;
        this.getMaxStats();
      });
  }
  
  goBack(): void {
    this.location.back();
  }
}
