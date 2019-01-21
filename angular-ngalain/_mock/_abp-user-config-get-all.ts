import { MockRequest } from '@delon/mock';

export const ABPStartupConfigs = {
    '/AbpUserConfiguration/GetAll': {
        'result': {
            'multiTenancy': {
                'isEnabled': true,
                'sides': {
                    'host': 2,
                    'tenant': 1
                }
            },
            'session': {
                'userId': null,
                'tenantId': null,
                'impersonatorUserId': null,
                'impersonatorTenantId': null,
                'multiTenancySide': 2
            },
            'localization': {
                'currentCulture': {
                    'name': 'zh-Hans',
                    'displayName': '中文(简体)'
                },
                'languages': [{
                    'name': 'en',
                    'displayName': 'English',
                    'icon': 'famfamfam-flags gb',
                    'isDefault': false,
                    'isDisabled': false,
                    'isRightToLeft': false
                }, {
                    'name': 'zh-Hans',
                    'displayName': '简体中文',
                    'icon': 'famfamfam-flags cn',
                    'isDefault': true,
                    'isDisabled': false,
                    'isRightToLeft': false
                }],
                'currentLanguage': {
                    'name': 'zh-Hans',
                    'displayName': '简体中文',
                    'icon': 'famfamfam-flags cn',
                    'isDefault': true,
                    'isDisabled': false,
                    'isRightToLeft': false
                },
                'sources': [{
                    'name': 'Abp',
                    'type': 'MultiTenantLocalizationSource'
                }, {
                    'name': 'AbpWeb',
                    'type': 'MultiTenantLocalizationSource'
                }, {
                    'name': 'AbpZero',
                    'type': 'MultiTenantLocalizationSource'
                }, {
                    'name': 'Jsx',
                    'type': 'MultiTenantLocalizationSource'
                }],
                'values': {
                    'Abp': {
                        'AllOfThesePermissionsMustBeGranted': '您没有权限进行此操作,您需要以下权限: {0}',
                        'AtLeastOneOfThesePermissionsMustBeGranted': '您没有权限进行此操作,您至少需要下列权限的其中一项: {0}',
                        'CurrentUserDidNotLoginToTheApplication': '当前用户没有登录到系统！',
                        'DefaultFromSenderDisplayName': '默认发件人名字',
                        'DefaultFromSenderEmailAddress': '默认发件人邮箱地址',
                        'DefaultLanguage': '预设语言',
                        'DomainName': '域名',
                        'MainMenu': '主菜单',
                        'Password': '密码',
                        'ReceiveNotifications': '接收通知',
                        'SmtpHost': 'SMTP主机',
                        'SmtpPort': 'SMTP端口',
                        'TimeZone': '时区',
                        'UseDefaultCredentials': '使用默认验证',
                        'Username': '用户名',
                        'UseSSL': '使用SSL'
                    },
                    'AbpWeb': {
                        'AreYouSure': '你确定吗?',
                        'Cancel': '取消',
                        'InternalServerError': '对不起,在处理您的请求期间,产生了一个服务器内部错误!',
                        'ValidationError': '您的请求无效!',
                        'Yes': '确定'
                    },
                    'AbpZero': {
                        'CanNotDeleteAdminUser': '不能删除默认管理员{0}!',
                        'CanNotDeleteStaticRole': '不能删除系统预定义角色: {0}',
                        'CanNotRenameAdminUser': '不能重命名默认管理员的用户名 {0}',
                        'Email': '邮箱',
                        'EmailSecurityCodeBody': '您的安全码是: {0}',
                        'EmailSecurityCodeSubject': '安全码',
                        'Identity.ConcurrencyFailure': '乐观并发失败,对象已修改.',
                        'Identity.DefaultError': '发生了一个未知的异常错误.',
                        'Identity.DuplicateEmail': '邮箱地址 {0} 已被占用.',
                        'Identity.DuplicateRoleName': '角色名称 {0} 已经被使用.',
                        'Identity.DuplicateUserName': '名字{0}已被占用.',
                        'Identity.InvalidEmail': '邮箱地址 {0} 不符合要求.',
                        'Identity.InvalidPasswordHasherCompatibilityMode': '提供的哈希密码兼容模式无效.',
                        'Identity.InvalidPasswordHasherIterationCount': '迭代次数必须是一个正整数.',
                        'Identity.InvalidRoleName': '角色名称 {0} 无效.',
                        'Identity.InvalidToken': '无效的token.',
                        'Identity.InvalidUserName': '用户名{0}不符合要求, 只能包含字母和数字.',
                        'Identity.LoginAlreadyAssociated': '登录的用户已存在.',
                        'Identity.PasswordMismatch': '密码错误.',
                        'Identity.PasswordRequiresDigit': '密码至少要包含一位数字 ("0"-"9").',
                        'Identity.PasswordRequiresLower': '密码至少要包含一位小写字母 ("a"-"z").',
                        'Identity.PasswordRequiresNonAlphanumeric': '密码必须包含一位非字母特殊符号或数字.',
                        'Identity.PasswordRequiresUpper': '密码至少要包含一位大写字母 ("A"-"Z").',
                        'Identity.PasswordTooShort': '密码至少要{0}位.',
                        'Identity.RoleNotFound': '角色{0}不存在.',
                        'Identity.UserAlreadyHasPassword': '用户已设置密码.',
                        'Identity.UserAlreadyInRole': '用户已拥有此角色.',
                        'Identity.UserLockedOut': '用户被锁定.',
                        'Identity.UserLockoutNotEnabled': '对此用户，不能启用锁定.',
                        'Identity.UserNameNotFound': '用户 {0} 不存在.',
                        'Identity.UserNotInRole': '用户不包含此角色.',
                        'InvalidTenancyName': '租户名无效!',
                        'RoleDisplayNameIsAlreadyTaken': '角色显示名称 {0}已被占用.',
                        'RoleNameIsAlreadyTaken': '角色名{0}已被占用.',
                        'Sms': '短信',
                        'SmsSecurityCodeMessage': '您的短信验证码是: {0}',
                        'TenancyNameIsAlreadyTaken': '租户名{0} 已被占用.'
                    },
                    'Jsx': {
                        'About': '关于我们',
                        'Actions': '操作',
                        'ActivityAlreadyCheckIn': '您已签过到了，请勿重复签到！',
                        'ActivityAlreadyEnrolled': '该活动您已报名',
                        'ActivityCannotEnroll': '活动未发布或报名已截止',
                        'ActivityDidntEnrollAndCheckInFailed': '签到失败，您未报名！',
                        'ActivityEndedAndCheckInFailed': '签到失败，活动已结束。',
                        'ActivityGenerateQrCodeFail': '生成签到二维码失败',
                        'ActivityNotActiveOrNotExist': '活动未发布或不存在',
                        'ActivityUserLimited': '该活动可参与会员人数已报满 ',
                        'ActivityVolunteerLimited': '该活动可参与志愿者人数已报满 ',
                        'Add': '添加',
                        'AlreadyDailyCheck': '今天您已签到过了',
                        'AppName': '计生协会后台管理',
                        'ArticleCategory_Common': '普通文章',
                        'ArticleCategory_Lession': '小课堂',
                        'ArticleCategory_ServiceTips': '服务小贴士',
                        'ArticleCategory_WithGift': '阅读有礼',
                        'Category': '分类',
                        'ChangePassword': '修改密码',
                        'ClearAll': '关闭所有',
                        'ClearOthers': '关闭其他',
                        'Content': '内容',
                        'CopyRight': '© 2018 宁波计生协会',
                        'Create': '创建',
                        'CreationTime': '创建时间',
                        'Delete': '删除',
                        'DeleteConfirm': '确定删除？',
                        'Edit': '编辑',
                        'Female': '女',
                        'Find': '查找',
                        'FormIsNotValidMessage': '部分输入信息不符合要求，请检查并改正..',
                        'GoodsHasOffShelf': '积分商品已下架 ',
                        'GoodsInventoryNotEnough': '积分商品库存不足 ',
                        'GoodsNotOnShelfOrInventoryNotEnough': '积分商品未上架或库存不足 ',
                        'HomePage': '主页',
                        'InvalidUserNameOrPassword': '用户名或密码无效',
                        'Keyword': '关键字',
                        'LabelOptions': '页签操作',
                        'LogIn': '登录',
                        'LoginFailed': '登录失败!',
                        'LoginPrompt': '正在登陆，请稍候！',
                        'Logout': '注销',
                        'Male': '男',
                        'ManageMenu': '菜单',
                        'NoDatas': '没有结果',
                        'Password': '密码',
                        'PasswordComplexityNotSatisfied': '密码复杂度要求不符.',
                        'PasswordPlaceholder': '请输入密码',
                        'PasswordRequireDigit': '密码至少需要一位是0到9的数字.',
                        'PasswordRequireLowercase': '密码至少需要一位是a到z的小写字母.',
                        'PasswordRequireNonAlphanumeric': '密码至少需要包含一个特殊字符（非字母或数字的字符）.',
                        'PasswordRequireUppercase': '密码至少需要一位是A到Z的大写字母.',
                        'PasswordTooShort': '密码长度太短',
                        'PleaseEnterLoginInformation': '请输入登录信息',
                        'PrizePointAccountBalanceNotEnough': '账户积分余额不足 ',
                        'PrizePointOrderHasCompleted': '该订单已发放完成,不可重复发放 ',
                        'PrizePointOrderStatus_Completed': '已发放',
                        'PrizePointOrderStatus_Paid': '待发放',
                        'RememberMe': '记住我',
                        'Roles': '角色',
                        'Select': '请选择',
                        'SelectDate': '请选择',
                        'ServiceLocationCategory_BirthConsulting': '生殖健康咨询服务点',
                        'ServiceLocationCategory_EugenicGuidance': '优生优育指导站点',
                        'ServiceLocationCategory_RightsMaintain': '权益维护',
                        'ServiceLocationCategory_SpecialFamilyHelp': '计生特殊家庭帮扶',
                        'ServiceLocationCategory_TransientPopulation': '流动人口服务',
                        'ServiceLocationCategory_YouthAndHealth': '青春健康',
                        'TenancyName': '租户名称',
                        'TenantIsNotActive': '租户 {0} 未激活.',
                        'TenantNameCanNotBeEmpty': '租户名不能为空',
                        'Tenants': '租户',
                        'ThereIsNoTenantDefinedWithName{0}': '租户 {0}不存在',
                        'Tips': '提示',
                        'Title': '标题',
                        'UserIsNotActiveAndCanNotLogin': '用户 {0} 未激活，不能登录.',
                        'UserNameOrEmail': '用户名或邮箱地址',
                        'UserNamePlaceholder': '请输入账户',
                        'UserPhoneNumberNotBind': '请绑定手机号 ',
                        'UserProfile': '用户资料',
                        'Users': '用户',
                        'WellcomeMessage': '欢迎使用计生协会后台管理系统!'
                    }
                }
            },
            'features': {
                'allFeatures': {}
            },
            'auth': {
                'allPermissions': {
                    'Pages.Users': 'true',
                    'Pages.Roles': 'true',
                    'Pages.Tenants': 'true'
                },
                'grantedPermissions': {}
            },
            'nav': {
                'menus': {
                    'MainMenu': {
                        'name': 'MainMenu',
                        'displayName': '主菜单',
                        'customData': null,
                        'items': []
                    }
                }
            },
            'setting': {
                'values': {
                    'Abp.Localization.DefaultLanguageName': 'zh-Hans',
                    'Abp.Notifications.ReceiveNotifications': 'true',
                    'Abp.Timing.TimeZone': 'UTC',
                    'Abp.Zero.UserManagement.IsEmailConfirmationRequiredForLogin': 'false',
                    'Abp.Zero.OrganizationUnits.MaxUserMembershipCount': '2147483647',
                    'Abp.Zero.UserManagement.TwoFactorLogin.IsEnabled': 'true',
                    'Abp.Zero.UserManagement.TwoFactorLogin.IsRememberBrowserEnabled': 'true',
                    'Abp.Zero.UserManagement.TwoFactorLogin.IsEmailProviderEnabled': 'true',
                    'Abp.Zero.UserManagement.TwoFactorLogin.IsSmsProviderEnabled': 'true',
                    'Abp.Zero.UserManagement.UserLockOut.IsEnabled': 'true',
                    'Abp.Zero.UserManagement.UserLockOut.MaxFailedAccessAttemptsBeforeLockout': '5',
                    'Abp.Zero.UserManagement.UserLockOut.DefaultAccountLockoutSeconds': '300',
                    'Abp.Zero.UserManagement.PasswordComplexity.RequireDigit': 'false',
                    'Abp.Zero.UserManagement.PasswordComplexity.RequireLowercase': 'false',
                    'Abp.Zero.UserManagement.PasswordComplexity.RequireNonAlphanumeric': 'false',
                    'Abp.Zero.UserManagement.PasswordComplexity.RequireUppercase': 'false',
                    'Abp.Zero.UserManagement.PasswordComplexity.RequiredLength': '3',
                    'App.UiTheme': 'red'
                }
            },
            'clock': {
                'provider': 'unspecifiedClockProvider'
            },
            'timing': {
                'timeZoneInfo': {
                    'windows': {
                        'timeZoneId': 'UTC',
                        'baseUtcOffsetInMilliseconds': 0.0,
                        'currentUtcOffsetInMilliseconds': 0.0,
                        'isDaylightSavingTimeNow': false
                    },
                    'iana': {
                        'timeZoneId': 'Etc/UTC'
                    }
                }
            },
            'security': {
                'antiForgery': {
                    'tokenCookieName': 'XSRF-TOKEN',
                    'tokenHeaderName': 'X-XSRF-TOKEN'
                }
            },
            'custom': {}
        },
        'targetUrl': null,
        'success': true,
        'error': null,
        'unAuthorizedRequest': false,
        '__abp': true
    },
    '/api/services/app/Session/GetCurrentLoginInformations': {
        'result': {
            'application': {
                'version': '4.0.0.0',
                'releaseDate': '2018-10-18T12:47:52+08:00',
                'features': {}
            },
            'user': null,
            'tenant': null
        },
        'targetUrl': null,
        'success': true,
        'error': null,
        'unAuthorizedRequest': false,
        '__abp': true
    }
};
