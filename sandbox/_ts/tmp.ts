

"use strict";

// import { inject } from '@angular/core';

function MyService() {
  const a = 'asdf';
  console.log(this)
}


// export class MyComponent {
//   public service = inject(MyService);
//
//   doSomething() {
//
//   }
// }

function MyComponent() {
  // this = {}
  this.name = '';
  this.age = ''
  // return this;
}

const mc = new MyComponent();
mc.doSomething()


const o = [];
const a = new Array();

const obj = {
  user: {
    name: 'Petro',
    age: 34
  },
  getUser() {
    console.log(this);
  }
}

obj.getUser();


const productState = {
  pagination: {},
};


interface CartItem {
  product: Product;
  amount: number;
}

interface CartStateModel {
  items: CartItem[];
}
