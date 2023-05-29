import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Member} from "../interfaces/member.model";

@Injectable({
    providedIn: 'root'
})
export class MemberService {
    private apiUrl = `${environment.apiUrl}/centers`;

    constructor(private http: HttpClient) {
    }

    getAllMembers(center_code: string): Observable<Member[]> {
        return this.http.get<Member[]>(`${this.apiUrl}/${center_code}/members`);
    }

    searchMembers(center_code: string | null, search: string): Observable<Member[]> {
        if (center_code === null) {
            center_code = '';
        }
        return this.http.get<Member[]>(`${this.apiUrl}/${center_code}/members/${search}/search`);
    }

    getMemberByEmail(center_code: string, email: string): Observable<Member> {
        return this.http.get<Member>(`${this.apiUrl}/${center_code}/members/${email}`);
    }

    createMember(center_code: string, memberData: Member): Observable<Member> {
        return this.http.post<Member>(`${this.apiUrl}/${center_code}/members`, memberData);
    }

    updateMember(center_code: string, email: string, updatedMemberData: Member): Observable<Member> {
        return this.http.put<Member>(`${this.apiUrl}/${center_code}/members/${email}`, updatedMemberData);
    }

    deleteMember(center_code: string, email: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${center_code}/members/${email}`);
    }
}
