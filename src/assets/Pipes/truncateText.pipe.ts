import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name : 'truncateText'
})

export class TruncatePipe implements PipeTransform{
    transform(pipe: string,) : String {
        return pipe.substring(0,15);
    }

    
}