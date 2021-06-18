import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contact } from 'src/app/model/Contact';

const http = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ContactService {
    constructor(private http: HttpClient) { }

    fetchContacts(): Observable<Contact[]> {
        return this.http.get<Contact[]>('https://jsonplaceholder.typicode.com/users');
    }

    addContact(contact: Contact): Observable<Contact> {
        return this.http.post<Contact>(
            'https://jsonplaceholder.typicode.com/users',
            contact, http);
    }

    updateContact(contact1: Contact): Observable<Contact> {
        const updateList =
            `${'https://jsonplaceholder.typicode.com/users'}/${contact1.id}`;

        return this.http.put<Contact>(updateList, contact1, http);
    }

    getContact(id: number): Observable<Contact> {
        const getList =
            `${'https://jsonplaceholder.typicode.com/users'}/${id}`;

        return this.http.get<Contact>(getList);
    }

    deleteContact(contact2: Contact | number): Observable<Contact> {
        const id = typeof contact2 === 'number' ? contact2 : contact2.id;
        const deleteList = `${'https://jsonplaceholder.typicode.com/users'}/${id}`;

        return this.http.delete<Contact>(deleteList, http);
    }
}
