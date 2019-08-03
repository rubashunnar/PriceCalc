import { Calculator } from '../src/Logic/Calculator';
import { Product } from '../src/Logic/Calculator';
var chai=require("chai");
var expect=chai.expect;

describe('', () => {
    //TAX
  it('TAX:should  return 24.30', () => {
    const cal = new Calculator();
    let product: Product = new Product('bag', 20.25, 1);
    let pr = cal.doTax(product.price, 20);
    expect(pr).equal(24.30.toPrecision(4));
  });
  it('TAX:should  return 24.50', () => {
    const cal = new Calculator();
    let product: Product = new Product('bag', 20.25, 1);
    let pr = cal.doTax(product.price, 21);
    expect(pr).equal(24.50.toPrecision(4));
  });
  //DISCOUNT
  it('DISCOUNT:should  return 21.26', () => {
    const cal = new Calculator();
    let product: Product = new Product('bag', 20.25, 1);
    let pr = cal.doDiscount(product, 20,[15,1],true,-100);
    expect(pr).equal(21.26.toPrecision(4));
  });
   //REPORT
   it('REPORT:should  return 3.04', () => {
    const cal = new Calculator();
    let product: Product = new Product('bag', 20.25, 1);
    let pr = cal.reportDiscount(product,15);
    expect(pr).equal(3.04.toPrecision(3));
  });
  it('REPORT:should  return 0.00', () => {
    const cal = new Calculator();
    let product: Product = new Product('bag', 20.25, 1);
    let pr = cal.reportDiscount(product);
    expect(pr).equal(0.00.toPrecision(3));
  });
   //SELECTIVE
   it('SPECIALDISCOUNT:should  return 19.84', () => {
    const cal = new Calculator();
    let product: Product = new Product('bag', 20.25, 1);
    let pr = cal.doDiscount(product,20,[15,1],true,-100,[7,1],1);
    expect(pr).equal(19.84.toPrecision(4));
  });
  it('SPECIALDISCOUNT:should  return 21.26', () => {
    const  cal = new Calculator();
    let product: Product = new Product('bag', 20.25, 1);
    let pr = cal.doDiscount(product,20,[15,1],true,-100,[7,1],11);
    expect(pr).equal(21.26.toPrecision(4));
  });
  //Precedence
  it('PRECEDENCE:should  return $19.78', () => {
    const  cal = new Calculator();
    let product: Product = new Product('bag', 20.25, 1);
    let pr = cal.doDiscount(product,20,[15,1],true,-100,[7,0],1);
    expect(pr).equal(19.78.toPrecision(4));
  });
  //Expenses
  it('Expenses:should  return  $22.45', () => {
    const  cal = new Calculator();
    let product: Product = new Product('bag', 20.25, 1);
    let pr = cal.withExpenses(product,21,[15,1],true,-100,[7,1],1,[-1,2.2]);
    expect(pr).equal(22.45.toPrecision(4));
  });
  it('Expenses:should  return  $24.5', () => {
    const  cal = new Calculator();
    let product: Product = new Product('bag', 20.25, 1);
    let pr = cal.withExpenses(product,21,[0,1],true,-100,[0,1],1);
    expect(pr).equal(24.5.toPrecision(4));
  });
  //Combining
  it('Combining:should  return  $22.45', () => {
    const  cal = new Calculator();
    let product: Product = new Product('bag', 20.25, 1);
    let pr = cal.withExpenses(product,21,[15,1],true,-100,[7,1],1,[-1,2.2]);
    expect(pr).equal(22.45.toPrecision(4));
  });
  it('Combining:should  return  $22.66', () => {
    const  cal = new Calculator();
    let product: Product = new Product('bag', 20.25, 1);
    let pr = cal.withExpenses(product,21,[15,1],false,-100,[7,1],1,[-1,2.2]);
    expect(pr).equal(22.66.toPrecision(4));
  });
  //cap
  it('Cap:should  return  $20.45', () => {
    const  cal = new Calculator();
    let product: Product = new Product('bag', 20.25, 1);
    let pr = cal.withExpenses(product,21,[15,1],true,-20,[7,1],1);
    expect(pr).equal(20.45.toPrecision(4));
  });
  it('Cap:should  return  $20.50', () => {
    const  cal = new Calculator();
    let product: Product = new Product('bag', 20.25, 1);
    let pr = cal.withExpenses(product,21,[15,1],true,4,[7,1],1);
    expect(pr).equal(20.50.toPrecision(4));
  });
  it('Cap:should  return  $20.04', () => {
    const  cal = new Calculator();
    let product: Product = new Product('bag', 20.25, 1);
    let pr = cal.withExpenses(product,21,[15,1],true,-30,[7,1],1);
    expect(pr).equal(20.05.toPrecision(4));
  });
});
