import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name : 'truncateText'
})

export class TruncatePipe implements PipeTransform{
    transform(pipe: string, addEllipsis: boolean = true) : String {
        return pipe.substring(0,75)+ (addEllipsis ? '...' : '');
    }

    
}