const mysql =require('mysql');

export class Product{
    _name:string;
    _price:number;
    _UPC:number;
    constructor(name:string,price:number,upc:number){
        this._name=name
        this._price=price;
        this._UPC=upc
    }
    get name(){
        return this._name
    }
    set price(p:number){
        this._price=p;
    }
    get price():number{
        return this._price;
    }
    get UPC(){
        return this._UPC;
    }
}

class Math_stuff{
    static precision2(value:number){
        return (value * Math.pow(10, 2) /Math.pow(10,2)).toFixed(2);
    }
}

export class Calculator {
    doTax(price:number, tax: number) {
        let val=tax*price/100+price
        let after_tax=Math_stuff.precision2(val)
        return after_tax;
    } 
    doDiscount(product:Product, tax:number, discount:number, UPC_discount?:number, upc?:number){
        let taxPrice=parseFloat(this.doTax(product.price,tax))
        if (UPC_discount!=undefined && product.UPC==upc){
            return this.specialDiscount(taxPrice,product,UPC_discount+discount)
        }
        let discountPrice= taxPrice-discount*product.price/100
        return Math_stuff.precision2(discountPrice);
    }
    specialDiscount(taxPrice:number,prod:Product,discount:number){
        let discountPrice= taxPrice-discount*prod.price/100
        return Math_stuff.precision2(discountPrice);
    }
    reportDiscount(product:Product, discount: number=0){
        let val=product.price*discount/100;
        return Math_stuff.precision2(val)
    }
}

