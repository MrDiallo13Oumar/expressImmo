import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-inscription-site',
  templateUrl: './inscription-site.component.html',
  styleUrls: ['./inscription-site.component.scss']
})
export class InscriptionSiteComponent {

  constructor(private route : Router){}

  ngOnInit(){

    console.log('This is init method');

  }

  simpleAlert(){

    Swal.fire('Hello world!');

  }

  alertWithSuccess(){

    Swal.fire('Felicitation ...', 'Vous ête inscrit avec succes!', 'success')
    this.route.navigateByUrl("/home/detailProprieteSite")
  }

  confirmBox(){

    Swal.fire({

      title: 'Are you sure want to remove?',

      text: 'You will not be able to recover this file!',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Yes, delete it!',

      cancelButtonText: 'No, keep it'

    }).then((result) => {

      if (result.value) {

        Swal.fire(

          'Deleted!',

          'Your imaginary file has been deleted.',

          'success'

        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {

        Swal.fire(

          'Cancelled',

          'Your imaginary file is safe :)',

          'error'

        )

      }

    })

  }
}
