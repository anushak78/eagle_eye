// Copyright (C) 2019-2020 NSEIT Limited, Mumbai. All rights reserved.
//
// This program and the accompanying materials are made available
// under the terms described in the LICENSE file which accompanies
// this distribution. If the LICENSE file was not attached to this
// distribution or for further clarifications, please contact
// legal@nseit.com.
import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivateChild,
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor() {
  }

  async canActivateChild(
    route: ActivatedRouteSnapshot) {
    return true;
  }
}
