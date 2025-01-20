import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name : 'truncateCard'
})

export class TruncateCardPipe implements PipeTransform{
    transform(value: any[], limit: number): any[] {
        if (!Array.isArray(value)) {
          return value; // Retourne la valeur d'origine si ce n'est pas un tableau
        }
        return value.slice(0, limit); // Limite le tableau au nombre d'éléments spécifié
      }
}