import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

const URL = "http://localhost:8081"

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) {}

  listCategory() {
    return this.http.get(URL + "/list-category");
  }

  listEvent() {
    return this.http.get(URL + "/list-events");
  }

  addCategory(formData: FormData) {
    return this.http.post(URL + "/add-category", formData);
  }

  addEvent(eventData: FormData) {
    return this.http.post(URL + "/add-event", eventData);
  }


  deleteCategory(categoryId: any) {
    return this.http.delete(URL + "/delete-category", {
      body: {
        categoryId: categoryId
      }
    });
  }

  deleteEvent(eventId: any) {
    return this.http.delete(URL + "/delete-event", {
      body: {
        eventId: eventId
      }
    });
  }



  updateCategory(categoryId: any, categoryName: string, categoryDescription: string, categoryImage: string) {
    const body = {
      categoryId: categoryId,
      categoryName: categoryName,
      categoryDescription: categoryDescription,
      categoryImage: categoryImage
    };
    return this.http.put(URL + "/update-category", body, httpOptions);
  }

  updateEvent(eventId: any, eventName: string, eventCapacity: number) {
    const body = {
      eventId: eventId,
      eventName: eventName,
      eventCapacity: eventCapacity
    };
    return this.http.put(URL + "/update-event", body, httpOptions);
  }

  getStats() {
    return this.http.get(URL + "/stats");
  }

  getCategoryDetails(categoryId: any) {
    return this.http.get(URL + "/display-category/" + categoryId);
  }

  viewEvent(eventId: any) {
    return this.http.get(URL + "/view-event/" + eventId);
  }
}
