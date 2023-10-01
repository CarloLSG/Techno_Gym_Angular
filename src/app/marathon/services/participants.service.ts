import {BaseService} from "../../shared/services/base.service";
import {Participant} from "../model/participant";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ParticipantsService extends BaseService<Participant>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "/participants";
  }
}
