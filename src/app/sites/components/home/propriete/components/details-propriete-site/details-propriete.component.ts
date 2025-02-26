import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProprieteService } from 'src/app/admin/components/propriete/_services/propriete.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-details-propriete',
  templateUrl: './details-propriete.component.html',
  styleUrls: ['./details-propriete.component.scss']
})
export class DetailsProprieteComponent implements OnInit{
  idPropriete: any;
constructor(private router : Router, private activeroute : ActivatedRoute,private service : ProprieteService
){}


ngOnInit(){
    (this.idPropriete = this.activeroute.snapshot.params['id'])
    this.getOnePropriete()
    this.scrollToTop()
  }

  email = "expressimmo224@gmail.com";

navigate(){
  this.router.navigateByUrl("/hoomeAdmin/login")
}
  alertWithSuccess(){

      Swal.fire('Bravo ...', 'Vous aviez reserver avec succes!', 'success')
      this.router.navigateByUrl("/home/propriete")
    }
    infoPropriete: any = {};
    getOnePropriete() {
      //console.log('ID en GET : ', this.idPropriete);
      this.service.getOne('propriete', 'getOne.php', this.idPropriete).subscribe({
        next: (response: any) => {
          //console.log('Info : ', response);
          this.infoPropriete = response;
          // this.Propriete.patchValue(this.infoPropriete);


        },
        error: (error: any) => {
          //console.log('Error : ', error);
        },
      });
    }
    getGalleryImages(): string[] {
      if (!this.infoPropriete.gallery) {
        return [];
      }
      // Si c'est une chaîne, on la transforme en tableau
      if (typeof this.infoPropriete.gallery === 'string') {
        return this.infoPropriete.gallery.split(',').map((img:any) => img.trim());
      }
      // Si c'est déjà un tableau, on le retourne directement
      if (Array.isArray(this.infoPropriete.gallery)) {
        return this.infoPropriete.gallery;
      }
      return [];
    }
    scrollToTop(): void {
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Le 'smooth' permet un défilement fluide
    }
}
