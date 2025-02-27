import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ResponseTodo} from '../interfaces/response';
import {tap} from 'rxjs/operators';
import {StateService} from './state.service';
import {Todo} from '../interfaces/todo';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    private readonly ID_AUTOR = 16;
    private readonly ENPOINT = 'https://bp-todolist.herokuapp.com';
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };

    constructor(
        private http: HttpClient,
        private readonly state: StateService
    ) {
    }

    getTodoList(): Observable<ResponseTodo> | undefined {
        return this.http.get<ResponseTodo>(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`).pipe(
            tap(
                resp => {
                    this.state.setTodoList(resp.data);
                }
            )
        );
    }

    public postNewTodo(todo: Todo): Observable<ResponseTodo> {
        const body = JSON.stringify(todo);
        return this.http.post<ResponseTodo>(`${this.ENPOINT}/?id_author=${this.ID_AUTOR}`, body, this.httpOptions);
    }


    public updateTodo(todo: Todo): Observable<ResponseTodo> {
        const body = JSON.stringify(todo);
        return this.http.put<ResponseTodo>(`${this.ENPOINT}/${todo.id}`, body, this.httpOptions);
    }

    public deleteTodo(todo: Todo): Observable<ResponseTodo> {
        return this.http.delete<ResponseTodo>(`${this.ENPOINT}/${todo.id}`, this.httpOptions);
    }

}
