import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<any> {
    const url = `/api/products`;
    return this.http.get(url);
  }

  public getProductsByAge(ageType: string): Observable<any> {
    const url = `/api/products/byAge?ageType=${ageType}`;
    return this.http.get(url);
  }

  public getProductsByCategory(category: string): Observable<any> {
    const url = `/api/products/byCategory/${category}`;
    return this.http.get(url);
  }

  public getProductByCode(code: number): Observable<any> {
    const url = `/api/products/get/${code}`;
    return this.http.get(url);
  }

  public getProductBySearchKey(key: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('searchKey', key);
    const url = `/api/products/search?${params.toString()}`;
    return this.http.get(url);
  }

  public getCategories() {
    return [
      { name: 'Activity Sheets & Binders', code: 'activitySheets' },
      { name: 'Activity Toys', code: 'activityToys' },
      { name: 'Board Books', code: 'boardBooks' },
      { name: 'Cards & Boards', code: 'cardsBoards' },
      { name: 'Cars, Tracks & Trains', code: 'carsTracks' },
      { name: 'Jigsaw Puzzles', code: 'jigsawPuzzles' },
      { name: 'Junior Puzzles', code: 'juniorPuzzles' },
      { name: 'Legos & Blocks', code: 'legosBlocks' },
      { name: 'Magnetic Toys', code: 'magneticToys' },
      { name: 'Montessori Books', code: 'montessoriBooks' },
      { name: 'Montessori Toys', code: 'montessoriToys' },
      { name: 'Musical Books', code: 'musicalBooks' },
      { name: 'Musical Toys', code: 'musicalToys' },
      { name: 'Outdoor Toys', code: 'outdoorToys' },
      { name: 'Peg Boards', code: 'pegBoards' },
      { name: 'Pretend & Play toys', code: 'pretendToys' },
      { name: 'Pull Along Toys', code: 'pullToys' },
      { name: 'Push, Pull & Slide books', code: 'pushBooks' },
      { name: 'Sorting toys', code: 'sortingToys' },
      { name: 'Stacking toys', code: 'stackingToys' },
      { name: 'STEM Books', code: 'stemBooks' },
      { name: 'STEM toys', code: 'stemToys' },
      { name: 'Story Books', code: 'storyBooks' },
      { name: 'Think Books', code: 'thinkBooks' },
      { name: 'Touch & Feel Books', code: 'touchBooks' }
    ];
  }
}
