import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // const token = JSON.parse(localStorage.getItem('jwtToken') || "");
  // if (token.token) {
  //   req = req.clone({ setHeaders: { Authorization: `Bearer ${token.token}` } });
  // }
  return next(req);
};
