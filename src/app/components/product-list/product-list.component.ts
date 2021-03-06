import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId?: number;
  searchMode?: boolean;

  constructor(private productService: ProductService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe(() => {
        this.listProducts();

      })
  }


  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }

    else {
     
      this.handleListProducts();

    }
    

      
  }
  handleSearchProducts() {
    const keyword: string|null = this.route.snapshot.paramMap.get('keyword');

    this.productService.searchProducts(keyword).subscribe(
      data => {
        this.products = data;
      }
    )

  }

  handleListProducts() {
    this.currentCategoryId = this.route.snapshot.paramMap.has('id')
          ? +this.route.snapshot.paramMap.get('id')!
          :1;

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {this.products = data}
    );

  }
}
