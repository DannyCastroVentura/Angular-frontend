import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { HeroesComponent } from '../heroes/heroes.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css', './../../styles.css']
})

export class AddHeroComponent implements OnInit {

  constructor(private heroService: HeroService,
    private heroesComponent: HeroesComponent,
    private location: Location) { }

  heroName = "";
  heroHp = "";
  heroAd = "";
  heroAs = "";

  add(): void {
    if (this.heroName.length === 0 || this.heroHp.length === 0 || this.heroAd.length === 0 || this.heroAs.length === 0) { return; }
    const hero: Hero = {
      id: 0, name: this.heroName, ad: parseInt(this.heroAd), as: parseInt(this.heroAs), hp: parseInt(this.heroHp)
    };
    this.heroService.addHero({ name: hero.name, ad: hero.ad, as: hero.as, hp: hero.hp } as Hero)
      .subscribe(hero => {
        this.heroesComponent.heroes.push(hero);
      });
    this.goBack();
  }

  parseInt(number: string) {
    return parseInt(number);
  }

  goBack(): void {
    this.location.back();
  }


  ngOnInit(): void {
  }

}
