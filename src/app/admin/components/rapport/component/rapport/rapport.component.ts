import { Component } from '@angular/core';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent {
  startDate!: Date;
  endDate!: Date;
  operationType!: string;
  operationTypes: string[] = ['Vente', 'Achat', 'Retour', 'Autre'];

  // Données fictives
  dataSource = [
    { id: 1, name: 'Produit A', status: 'Vente', date: new Date('2025-01-10'), price: 100 },
    { id: 2, name: 'Produit B', status: 'Achat', date: new Date('2025-01-11'), price: 50 },
    { id: 3, name: 'Produit C', status: 'Retour', date: new Date('2025-01-12'), price: -20 },
    { id: 4, name: 'Produit D', status: 'Autre', date: new Date('2025-01-13'), price: 0 },
    { id: 5, name: 'Produit E', status: 'Vente', date: new Date('2025-01-14'), price: 80 },
    // Ajoutez plus de données ici pour tester la pagination
  ];

  filteredData = [...this.dataSource];
  paginatedData = [...this.dataSource];

  // Pagination
  currentPage = 1;
  itemsPerPage = 3; // Nombre d'éléments par page
  totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);

  ngOnInit() {
    this.updatePagination();
  }

  generateReport() {
    this.filteredData = this.dataSource.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        (!this.startDate || itemDate >= this.startDate) &&
        (!this.endDate || itemDate <= this.endDate) &&
        (!this.operationType || item.status === this.operationType)
      );
    });
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    this.updatePagination();
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.filteredData.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  updateItem(id: number) {
    console.log('Mise à jour de l’opération avec ID:', id);
  }

  deleteItem(id: number) {
    console.log('Suppression de l’opération avec ID:', id);
  }
}
