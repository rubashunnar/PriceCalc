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
    doDiscount(product:Product, tax:number, discount:number[], UPC_discount?:number[], upc?:number){
        let taxPrice=parseFloat(this.doTax(product.price,tax))
        if (UPC_discount!=undefined && product.UPC==upc){
            return this.specialDiscount(product,tax,discount,UPC_discount)
        }
        return this.regularDiscount(product,tax,discount)
    }
    specialDiscount(product:Product,tax:number,discount:number[],UPC_discount:number[]){
        let val;
        let taxPrice;
        //2 discounts after tax
        if (discount[1]==1 && UPC_discount[1]==1){
            taxPrice=parseFloat(this.doTax(product.price,tax))
            val=taxPrice-((discount[0]+UPC_discount[0])*product.price/100)
            return Math_stuff.precision2(val);
        }
        //2 discounts before tax
        else if ((discount[1]==0 && UPC_discount[1]==0)){
            val=product.price-((discount[0]+UPC_discount[0])*product.price/100)
            taxPrice=parseFloat(this.doTax(val,tax))
            return Math_stuff.precision2(taxPrice)
        }
        //universal discount after tax
        else if(discount[1]==1 && UPC_discount[1]==0){
            val=product.price-(UPC_discount[0]*product.price/100)
            taxPrice=parseFloat(this.doTax(val,tax))
            let finalPrice=taxPrice-((discount[0])*val/100)
            return Math_stuff.precision2(finalPrice)
        }
        else {
            val=product.price-(discount[0]*product.price/100)
            taxPrice=parseFloat(this.doTax(val,tax))
            let finalPrice=taxPrice-((UPC_discount[0])*val/100)
            return Math_stuff.precision2(finalPrice)
        }
    }
    regularDiscount(product:Product,tax:number,discount:number[]){
        let taxPrice;
        let val;
        //after tax
        if (discount[1]==1){
            taxPrice= parseFloat(this.doTax(product.price,tax))
            val=taxPrice-(discount[0]*product.price/100)
            return Math_stuff.precision2(val)
        }
        //before tax
        else{
            val=product.price-(discount[0]*product.price/100)
            taxPrice= parseFloat(this.doTax(val,tax))
            return Math_stuff.precision2(taxPrice)
        }
    }
    reportDiscount(product:Product, discount: number=0){
        let val=product.price*discount/100;
        return Math_stuff.precision2(val)
    }
    withExpenses(prod:Product,tax:number,discount:number[],UPC_discount?:number[],upc?:number,expenses:number[]=[0,0]){
        let discounted_Price=parseFloat(this.doDiscount(prod,tax,discount,UPC_discount,upc))
        console.log("dp:"+discounted_Price)
        for (let i=0;i<expenses.length;i++){
            //value not percentage
            if (expenses[i]>0)
                discounted_Price+=expenses[i]
            //percentage
            else discounted_Price=discounted_Price+(prod.price*expenses[i]/-100)
        }

        return Math_stuff.precision2(discounted_Price);
    }
}

