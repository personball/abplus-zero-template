import { Injectable, Inject } from '@angular/core';
import { AuthenticateModel, TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { ITokenService, DA_SERVICE_TOKEN, JWTTokenModel } from '@delon/auth';
import { AppConsts } from '@shared/AppConsts';
import { UtilsService } from '@abp/utils/utils.service';
import { TokenService } from '@abp/auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  constructor(
    @Inject(DA_SERVICE_TOKEN) private _tokenService: ITokenService,
    private _abpTokenService: TokenService,
    private _utilsService: UtilsService,
    private _tokenAuthServiceProxy: TokenAuthServiceProxy
  ) { }

  login(userName: string, password: string, remember?: boolean, callback?: () => void) {
    let model = new AuthenticateModel();
    model.password = password;
    model.userNameOrEmailAddress = userName;
    this._tokenAuthServiceProxy.authenticate(model)
      .subscribe(result => {
        // set abp login info
        const tokenExpireDate = remember
          ? new Date(new Date().getTime() + 1000 * result.expireInSeconds)
          : undefined;

        this._abpTokenService.setToken(result.accessToken, tokenExpireDate);

        this._utilsService.setCookieValue(
          AppConsts.authorization.encrptedAuthTokenName,
          result.encryptedAccessToken,
          tokenExpireDate,
          abp.appPath,
        );
        // 设置用户Token信息
        let jwt = new JWTTokenModel();
        jwt.token = result.accessToken;
        this._tokenService.set(jwt);

        callback();
      });
  }

  logout(callback?: () => void) {
    this._abpTokenService.clearToken();
    this._tokenService.clear();

    callback();
  }
}
