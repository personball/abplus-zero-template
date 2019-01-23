import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
import { AppMenu } from '@shared/AppMenu';

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
    let cultureCookie: string = '';
    if (abp.utils.getCookieValue('Abp.Localization.CultureName') != null) {
      cultureCookie = abp.utils.getCookieValue('Abp.Localization.CultureName');
    }

    return this.httpClient.get(`${AppConsts.remoteServiceBaseUrl}/AbpUserConfiguration/GetAll`, {
      headers: {
        Authorization: `Bearer ${abp.auth.getToken()}`,
        '.AspNetCore.Culture': cultureCookie,
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
    // zh-Hans无需转换
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

      if (this.shouldLoadLocale()) {
        let angularLocale = this.convertAbpLocaleToAngularLocale(abp.localization.currentLanguage.name);
        import(`@angular/common/locales/${angularLocale}.js`)
          .then(module => {
            // 未重复，ng-alain默认载入en，这里abp将根据后端返回的localID载入angular对应版本语言文件
            registerLocaleData(module.default);
            resolve(result);
          }, reject);
      } else {
        resolve(result);
      }
    }, (err) => {
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
    // TODO 菜单 acl 权限
    this.menuService.add(AppMenu.Menus);
    // 设置页面标题的后缀
    this.titleService.suffix = 'AbpProjectName';

    // load langData
    // ***本质上业务范围的翻译全部使用ngx-tanslate模块完成，在此load语言文本即可***
    // i18n统一控制业务范围内的语言标识和组件所用语言标识的一致性（切换语言）
    // 根据后端返回的配置设置i18n的当前语言(不使用默认语言)
    let langName = abp.localization.currentLanguage.name;
    this.i18n.use(langName);
    this.settingService.setLayout('lang', langName);
    this.httpClient.get(`assets/tmp/i18n/${this.i18n.currentLang}.json`)
      .subscribe(langData => {
        // 添加abp后端本地化文本（要用合并的方式）
        for (const key in abp.localization.values) {
          if (abp.localization.values.hasOwnProperty(key)) {
            const element = abp.localization.values[key];
            _.merge(langData, element);
          }
        }

        this.translate.setTranslation(this.i18n.currentLang, langData);
        this.translate.setDefaultLang(this.i18n.currentLang);

        this.menuService.resume(); // Tips i18n变动，重置菜单
      });
  }

  private viaAbp(resolve: any, reject: any) {
    // 考虑部署时有虚拟目录？
    let appBaseHref = getBaseHref(this.platformLocation);
    let appBaseUrl = getDocumentOrigin() + appBaseHref;

    this.getApplicationConfig(appBaseUrl, () => {
      this.getAbpUserConfiguration(() => {
        this.initAppSession(resolve, reject);
      });
    });
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      this.viaAbp(resolve, reject);
    });
  }
}
