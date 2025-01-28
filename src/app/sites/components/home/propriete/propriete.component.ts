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
  villes: any[] = []; // Liste des villes
  communes: any[] = []; // Liste des communes
  quartiers: any[] = []; // Liste des quartiers
  proprietes: any[] = []; // Liste des propriétés

  selectedVille: number | null = null;
  selectedCommune: number | null = null;
  selectedQuartier: number | null = null;

  displayedColumns: string[] = ['id', 'reference'];
  dataSource = new MatTableDataSource([]);
  // displayedColumns: string[] = ['id','libelle', 'adresse', 'description', 'etat', 'partenaire', 'action'];
  // dataSource = new MatTableDataSource([]);
  data !: Propriete[]
  email = "expressimmo@gmail.com"
  constructor(private router: Router, private proprieteService: ProprieteService) { }

  ngOnInit() {
    this.getPropriete()
    this.getVilles();
  }
  getPropriete() {
    this.proprieteService.getall('propriete', 'readAll.php').subscribe({
      next: (reponse: any) => {
        console.log('REPONSE SUCCESS : ', reponse)
         this.dataSource.data = reponse,
        
        console.log("Data de cheick", this.data);

      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err)
      }
    })
  }

  alertWithSuccess() {
    Swal.fire('Bravo ...', 'Vous aviez reserver avec succes!', 'success')
    this.router.navigateByUrl("/home/inscriptionSite")
    this.scrollToTop();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Le 'smooth' permet un défilement fluide
  }


  // Charger la liste des villes depuis l'API
  getVilles() {
    this.proprieteService.getall('ville', 'readAll.php').subscribe({
      next: (response: any) => {
        this.villes = response;
        
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des villes : ', err);
      }
    });
  }

  // Charger les communes en fonction de la ville sélectionnée
  getCommunes(villeId: number) {
    console.log("Ville ID",villeId);
    
    this.selectedCommune = null;
    this.selectedQuartier = null;
    this.quartiers = []; // Réinitialiser les quartiers
    this.proprietes = []; // Réinitialiser les propriétés

    this.proprieteService.getOne('propriete', 'readByCommune.php', villeId).subscribe({
      next: (response: any) => {
           // this.dataSource.data = response
           this.communes = response;
           console.log("Communes",this.communes);

        this.proprieteService.getOne('propriete', 'readByVille.php', villeId).subscribe({
          next: (response: any) => {
           
            this.dataSource.data = response
            
            //  this.communes = response;
             console.log("DataSource",this.dataSource.data);
            
          },
          error: (err: any) => {
            console.error('Erreur lors du chargement des communes : ', err);
          }
        });


        
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des communes : ', err);
      }
    });
  }

  // Charger les quartiers en fonction de la commune sélectionnée
  getQuartiers(communeId: number) {
    this.selectedQuartier = null;
    this.proprietes = []; // Réinitialiser les propriétés

    this.proprieteService.getOne('propriete', 'readByQuartier.php', communeId).subscribe({
      next: (response: any) => {
        this.quartiers = response;
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des quartiers : ', err);
      }
    });
    this.proprieteService.getOne('propriete', 'readProprieteByCommune.php', communeId).subscribe({
      next: (response: any) => {
        this.dataSource.data = response;
        
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des quartiers : ', err);
      }
    });
  }

  // Charger les propriétés en fonction du quartier sélectionné
  getProprietes(quartierId: number) {
    this.proprieteService.getOne('propriete', 'readProprieteByQuartier.php', quartierId).subscribe({
      next: (response: any) => {
        // this.proprietes = response;
        this.dataSource.data = response // Mettre à jour les données du tableau
        
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des propriétés : ', err);
      }
    });
  }

  // Lorsque la sélection de ville change
  onVilleChange(event: any) {
    this.getCommunes(event.value);
  }

  // Lorsque la sélection de commune change
  onCommuneChange(event: any) {
    this.getQuartiers(event.value);
  }

  // Lorsque la sélection de quartier change
  onQuartierChange(event: any) {
    this.getProprietes(event.value);
  }
}