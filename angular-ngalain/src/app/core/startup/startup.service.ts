import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '../i18n/i18n.service';

import { NzIconService } from 'ng-zorro-antd';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';

// #region 集成abp
import { AppConsts } from '@shared/AppConsts';
import { PlatformLocation, registerLocaleData } from '@angular/common';
import { environment } from '@env/environment';

import * as _ from 'lodash';
import * as moment from 'moment';
import { AppSessionService } from '@shared/session/app-session.service';

function getBaseHref(platformLocation: PlatformLocation): string {
  let baseUrl = platformLocation.getBaseHrefFromDOM();
  if (baseUrl) {
    return baseUrl;
  }
  return '/';
}

function getDocumentOrigin() {
  if (!document.location.origin) {
    return document.location.protocol + '//' + document.location.hostname + (document.location.port ? ':' + document.location.port : '');
  }

  return document.location.origin;
}

// #endregion

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private translate: TranslateService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private injector: Injector,
    private platformLocation: PlatformLocation
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private getCurrentClockProvider(currentProviderName: string): abp.timing.IClockProvider {
    if (currentProviderName === 'unspecifiedClockProvider') {
      return abp.timing.unspecifiedClockProvider;
    }

    if (currentProviderName === 'utcClockProvider') {
      return abp.timing.utcClockProvider;
    }

    return abp.timing.localClockProvider;
  }

  private getApplicationConfig(appRootUrl: string, callback: () => void) {
    return this.httpClient.get(`${appRootUrl}assets/${environment.appConfig}`, {
      headers: {
        'Abp.TenantId': `${abp.multiTenancy.getTenantIdCookie()}`
      }
    }).subscribe(result => {
      let res: any = result;

      AppConsts.appBaseHref = res.appBaseHref;
      AppConsts.remoteServiceBaseUrl = res.remoteServiceBaseUrl;
      AppConsts.localeMappings = res.localeMappings;

      callback();
    });
  }

  private getAbpUserConfiguration(callback: () => void) {
    return this.httpClient.get(`${AppConsts.remoteServiceBaseUrl}/AbpUserConfiguration/GetAll`, {
      headers: {
        Authorization: `Bearer ${abp.auth.getToken()}`,
        '.AspNetCore.Culture': abp.utils.getCookieValue('Abp.Localization.CultureName'),
        'Abp.TenantId': `${abp.multiTenancy.getTenantIdCookie()}`
      }
    }).subscribe(result => {
      const res: any = result;

      _.merge(abp, res.result);

      abp.clock.provider = this.getCurrentClockProvider(res.result.clock.provider);

      moment.locale(abp.localization.currentLanguage.name);

      if (abp.clock.provider && abp.clock.provider.supportsMultipleTimezone) {
        moment.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
      }

      callback();
    });
  }

  private shouldLoadLocale(): boolean {
    return abp.localization.currentLanguage.name && abp.localization.currentLanguage.name !== 'en-US';
  }

  private convertAbpLocaleToAngularLocale(locale: string): string {
    if (!AppConsts.localeMappings) {
      return locale;
    }

    let localeMappings = _.filter(AppConsts.localeMappings, { from: locale });
    if (localeMappings && localeMappings.length) {
      return localeMappings[0]['to'];
    }

    return locale;
  }

  private initAppSession(resolve: any, reject: any) {
    abp.event.trigger('abp.dynamicScriptsInitialized');
    let appSessionService: AppSessionService = this.injector.get(AppSessionService);

    appSessionService.init().then((result) => {

      this.adaptToNgAlain(appSessionService);

      // abp.ui.clearBusy();
      if (this.shouldLoadLocale()) {
        let angularLocale = this.convertAbpLocaleToAngularLocale(abp.localization.currentLanguage.name);
        import(`@angular/common/locales/${angularLocale}.js`)
          .then(module => {
            // TODO 疑似重复
            registerLocaleData(module.default);
            resolve(result);
          }, reject);
      } else {
        resolve(result);
      }
    }, (err) => {
      console.log('appSessionService init err', err);
      // abp.ui.clearBusy();
      reject(err);
    });
  }

  private adaptToNgAlain(appSessionService: AppSessionService) {
    // 应用信息：包括站点名、描述、年份
    this.settingService.setApp({ name: 'AbpProjectName', description: 'Welcome To AbpProjectName' });
    // 用户信息：包括姓名、头像、邮箱地址
    // TODO avatar
    let userName = 'no user';
    let emailAddress = 'no email';
    if (appSessionService.user) {
      userName = appSessionService.user.name;
      emailAddress = appSessionService.user.emailAddress;
    }

    this.settingService.setUser({ name: userName, avatar: '', email: emailAddress });
    // TODO ACL：适配ABP权限
    this.aclService.setFull(true);
    // TODO 适配ABP菜单
    this.menuService.add([
      {
        text: '主导航',
        group: true,
        children: [
          {
            text: '仪表盘',
            link: '/dashboard',
            icon: { type: 'icon', value: 'appstore' }
          },
          {
            text: '快捷菜单',
            icon: { type: 'icon', value: 'rocket' },
            shortcutRoot: true
          }
        ]
      }
    ]);
    // 设置页面标题的后缀
    this.titleService.suffix = 'AbpProjectName';

    // setting language data
    this.httpClient.get(`assets/tmp/i18n/${this.i18n.defaultLang}.json`)
      .subscribe(langData => {
        this.translate.setTranslation(this.i18n.defaultLang, langData);
        this.translate.setDefaultLang(this.i18n.defaultLang);
      });
  }

  private viaAbp(resolve: any, reject: any) {
    // 考虑部署时有虚拟目录？
    let appBaseHref = getBaseHref(this.platformLocation);
    let appBaseUrl = getDocumentOrigin() + appBaseHref;

    this.getApplicationConfig(appBaseUrl, () => {
      this.getAbpUserConfiguration(() =>
        this.initAppSession(resolve, reject)
      );
    });
  }

  //#region demo origin
  private viaHttp(resolve: any, reject: any) {
    zip(
      // TODO fix abp localize
      this.httpClient.get(`assets/tmp/i18n/${this.i18n.defaultLang}.json`),
      // TODO fix abp app configuration
      this.httpClient.get('assets/tmp/app-data.json')
    ).pipe(
      // 接收其他拦截器后产生的异常消息
      catchError(([langData, appData]) => {
        resolve(null);
        return [langData, appData];
      })
    ).subscribe(([langData, appData]) => {
      // setting language data
      this.translate.setTranslation(this.i18n.defaultLang, langData);
      this.translate.setDefaultLang(this.i18n.defaultLang);

      // application data
      const res: any = appData;
      // 应用信息：包括站点名、描述、年份
      this.settingService.setApp(res.app);
      // 用户信息：包括姓名、头像、邮箱地址
      this.settingService.setUser(res.user);
      // ACL：设置权限为全量
      this.aclService.setFull(true);
      // 初始化菜单
      this.menuService.add(res.menu);
      // 设置页面标题的后缀
      this.titleService.suffix = res.app.name;
    },
      (err) => { console.log(err); },
      () => {
        resolve(null);
      });
  }

  private viaMockI18n(resolve: any, reject: any) {
    this.httpClient
      .get(`assets/tmp/i18n/${this.i18n.defaultLang}.json`)
      .subscribe(langData => {
        this.translate.setTranslation(this.i18n.defaultLang, langData);
        this.translate.setDefaultLang(this.i18n.defaultLang);

        this.viaMock(resolve, reject);
      });
  }

  private viaMock(resolve: any, reject: any) {
    // const tokenData = this.tokenService.get();
    // if (!tokenData.token) {
    //   this.injector.get(Router).navigateByUrl('/passport/login');
    //   resolve({});
    //   return;
    // }
    // mock
    const app: any = {
      name: `ng-alain`,
      description: `Ng-zorro admin panel front-end framework`
    };
    const user: any = {
      name: 'Admin',
      avatar: './assets/tmp/img/avatar.jpg',
      email: 'cipchk@qq.com',
      token: '123456789'
    };
    // 应用信息：包括站点名、描述、年份
    this.settingService.setApp(app);
    // 用户信息：包括姓名、头像、邮箱地址
    this.settingService.setUser(user);
    // ACL：设置权限为全量
    this.aclService.setFull(true);
    // 初始化菜单
    this.menuService.add([
      {
        text: '主导航',
        group: true,
        children: [
          {
            text: '仪表盘',
            link: '/dashboard',
            icon: { type: 'icon', value: 'appstore' }
          },
          {
            text: '快捷菜单',
            icon: { type: 'icon', value: 'rocket' },
            shortcutRoot: true
          }
        ]
      }
    ]);
    // 设置页面标题的后缀
    this.titleService.suffix = app.name;

    resolve({});
  }
  //#endregion

  load(): Promise<any> {

    // abp.ui.setBusy();

    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      this.viaAbp(resolve, reject);
    });
  }
}
