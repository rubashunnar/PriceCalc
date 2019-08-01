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
    let pr = cal.doDiscount(product, 20,15);
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
});
