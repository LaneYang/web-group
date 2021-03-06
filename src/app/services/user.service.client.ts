import {User} from '../models/user.model.client';
import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {SharedService} from './shared.service';
import {Router} from '@angular/router';

@Injectable()
export class UserService {

  constructor(private _http: Http,
              private sharedService: SharedService,
              private router: Router) {
  }

  baseUrl = environment.baseUrl;
  options = new RequestOptions();

  register(username: String, password: String, type: String, firstName: String, lastName: String, email: String) {
    this.options.withCredentials = true;
    const user = {
      username: username,
      password: password,
      type: type,
      firstName: firstName,
      lastName: lastName,
      email: email
    };
    return this._http.post(this.baseUrl + '/api/register', user, this.options)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

  login(username: string, password: string) {
    this.options.withCredentials = true;
    const body = {
      username: username,
      password: password
    };
    return this._http.post(this.baseUrl + '/api/login', body, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  loggedIn() {
    this.options.withCredentials = true;
    return this._http.post(this.baseUrl + '/api/loggedIn', '', this.options)
      .map(
        (res: Response) => {
          const user = res.json();
          if (user !== 0) {
            this.sharedService.user = user;
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      );
  }

  logout() {
    this.options.withCredentials = true;
    return this._http.post(this.baseUrl + '/api/logout', '', this.options)
      .map(
        (res: Response) => {
          const data = res;
        }
      );
  }

  findUserById(userId: String) {
    return this._http.get(this.baseUrl + '/api/user/' + userId)
      .map((response: Response) => {
        return response.json();
      });
  }

  findClubsByUser(userId: String) {
    return this._http.get(this.baseUrl + '/api/user/' + userId + '/club').
      map((response: Response) => {
        return response.json();
    });
  }

  addClubForStudent(userId: String, clubId: String, user: User) {
    return this._http.put(this.baseUrl + '/api/student/' + userId + '/club/' + clubId, user).
      map((response: Response) => {
       return response.json();
    });
  }

  deleteClubForStudent(userId: String, clubId: String) {
    return this._http.delete(this.baseUrl + '/api/student/' + userId + '/club/' + clubId).
    map((response: Response) => {
      return response.json();
    });
  }

  updateUserInServer(userId: String, user: User) {
    return this._http.put(this.baseUrl + '/api/user/' + userId, user)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteUserInServer(userId: String) {
    return this._http.delete(this.baseUrl + '/api/user/' + userId)
      .map((response: Response) => {
        return response;
      });
  }

  findAllFounders() {
    return this._http.get(this.baseUrl + '/api/founders')
      .map((response: Response) => {
        return response.json();
      });
  }

  findAllStudents() {
    return this._http.get(this.baseUrl + '/api/students')
      .map((response: Response) => {
        return response.json();
      });
  }
}
