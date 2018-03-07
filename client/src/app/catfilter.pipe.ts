import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'catfilter'
})
export class CatfilterPipe implements PipeTransform {

  transform(product: any, args?: any): any {
    if(args!='')
    {
    console.log('from filter');
    console.log(product);
    console.log(product.length);
    var arr = [];
    for(var i=0;i<product.length;i++)
     {
        if(product[i].product_catagoery==args)
        {
          arr.push(product[i]);
        }
      }
      return arr;
    }
    else
    {
      return product;
    }
  }

}
