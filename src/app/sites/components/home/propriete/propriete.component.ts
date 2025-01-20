import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProprieteService } from 'src/app/admin/components/propriete/_services/propriete.service';
import { Propriete } from 'src/assets/Models/propriete';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-propriete',
  templateUrl: './propriete.component.html',
  styleUrls: ['./propriete.component.scss']
})
export class ProprieteComponent {

displayedColumns: string[] = ['id','libelle', 'adresse', 'description', 'etat', 'partenaire', 'action'];
dataSource = new MatTableDataSource([]);
data !: Propriete[]

constructor(private router : Router, private propriete : ProprieteService){}

ngOnInit() {
  this.getPropriete()
 }
getPropriete () {
   this.propriete.getall('propriete', 'readAll.php').subscribe({
     next: (reponse: any) => {
        console.log('REPONSE SUCCESS : ', reponse)
       this.dataSource.data = reponse,
       this.data = reponse
       console.log("Data de cheick", this.data);
       
     },
     error: (err: any) => {
       console.log('REPONSE ERROR : ', err)
     }
   })
 }

  alertWithSuccess(){
        Swal.fire('Bravo ...', 'Vous aviez reserver avec succes!', 'success')
        this.router.navigateByUrl("/home/inscriptionSite")
        this.scrollToTop();
      }

      scrollToTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Le 'smooth' permet un défilement fluide
      }     
}