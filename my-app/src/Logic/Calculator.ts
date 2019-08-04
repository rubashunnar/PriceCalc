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
    static precision(value:number,n:number){
        return (value * Math.pow(10, n) /Math.pow(10,n)).toFixed(n);
    }
    
}

export class Calculator {
    Currency:string="USD";
    constructor(curr?:string){
        if (curr!=undefined){
            this.Currency=curr
        }
    }
    doTax(price:number, tax: number) {
        let val=tax*price/100+price
        let after_tax=Math_stuff.precision(val,4)
        return after_tax;
    } 
    doDiscount(product:Product, tax:number, discount:number[],additive:boolean, cap:number,UPC_discount?:number[], upc?:number){
        console.log("Currency:"+this.Currency);
        if (UPC_discount!=undefined && product.UPC==upc){
            return this.specialDiscount(product,tax,discount,UPC_discount,additive,cap)
        }
        return this.regularDiscount(product,tax,discount,additive,cap)
        
    }
    specialDiscount(product:Product,tax:number,discount:number[],UPC_discount:number[],additive:boolean,cap:number){
        let val;
        let taxPrice;
        let total_discount;
        let capPercent=0;
        //2 discounts after tax
        if (discount[1]==1 && UPC_discount[1]==1){
            //console.log("hiiii")
            taxPrice=parseFloat(this.doTax(product.price,tax))
            if (cap>0)//if cap in dollars
                capPercent=cap*100/product.price
            else capPercent=-1*cap;
            //if additive discounts    
            if (additive==true){
                if (capPercent/100<(discount[0]+UPC_discount[0])/100){
                    total_discount=capPercent
                }
                else {
                    total_discount=discount[0]+UPC_discount[0];
                }
                val=taxPrice-((total_discount)*product.price/100)
            }
            //if multiplicative discounts
            else {
                //console.log("multiplicative")
                let discount1=discount[0]*product.price/100
                val=taxPrice-(UPC_discount[0]*(product.price-discount1)/100)-discount1;
            }
            return Math_stuff.precision(val,2);
        }
        //2 discounts before tax
        else if ((discount[1]==0 && UPC_discount[1]==0)){
            val=product.price-((discount[0]+UPC_discount[0])*product.price/100)
            taxPrice=parseFloat(this.doTax(val,tax))
            return Math_stuff.precision(taxPrice,2)
        }
        //universal discount after tax
        else if(discount[1]==1 && UPC_discount[1]==0){
            val=product.price-(UPC_discount[0]*product.price/100)
            taxPrice=parseFloat(this.doTax(val,tax))
            let finalPrice=taxPrice-((discount[0])*val/100)
            return Math_stuff.precision(finalPrice,2)
        }
        else {
            val=product.price-(discount[0]*product.price/100)
            taxPrice=parseFloat(this.doTax(val,tax))
            let finalPrice=taxPrice-((UPC_discount[0])*val/100)
            return Math_stuff.precision(finalPrice,2)
        }
    }
    regularDiscount(product:Product,tax:number,discount:number[],additive:boolean,cap:number){
        let taxPrice;
        let val;
        let capPercent=0;
        //after tax
        if (discount[1]==1){
            taxPrice= parseFloat(this.doTax(product.price,tax))
            let price;
            if (cap>0)//if cap in dollars
                capPercent=cap*100/product.price
            else capPercent=-1*cap;
            if (capPercent/100<discount[0]/100){
                price=capPercent
            }
            else {
                price=discount[0];
            }
            val=taxPrice-(price*product.price/100)
            return Math_stuff.precision(val,2)
        }
        //before tax
        else{
            val=product.price-(discount[0]*product.price/100)
            taxPrice= parseFloat(this.doTax(val,tax))
            return Math_stuff.precision(taxPrice,2)
        }
    }
    reportDiscount(product:Product, discount: number=0){
        let val=product.price*discount/100;
        return Math_stuff.precision(val,2)
    }
    doExpenses(prod:Product,discounted_Price:number,expenses:number[]=[0,0]){
        for (let i=0;i<expenses.length;i++){
            //value not percentage
            if (expenses[i]>0)
                discounted_Price+=expenses[i]
            //percentage
            else discounted_Price=discounted_Price+(prod.price*expenses[i]/-100)
        }

        return Math_stuff.precision(discounted_Price,2);
    }
    
}

