using System;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AbpCompanyName.AbpProjectName.Migrations
{
    public partial class UpdateMemberUserAndAddMemberUserStatics : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OpenId",
                table: "AbpUsers",
                maxLength: 128,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WechatH5RefreshToken",
                table: "AbpUsers",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "WechatH5RefreshTokenExpiredIn",
                table: "AbpUsers",
                nullable: true);

            migrationBuilder.Sql(@"
Create View VI_MemberUserStatics AS
Select Id as UserId,CreationTime,
DATEPART(yyyy,CreationTime) as AtYear,
DATEPART(mm,CreationTime) as AtMon,
DATEPART(dd,CreationTime) as AtDay 
from AbpUsers
where UserType="+(int)UserType.Frontend);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DROP VIEW [dbo].[VI_MemberUserStatics]");
            migrationBuilder.DropColumn(
                name: "OpenId",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "WechatH5RefreshToken",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "WechatH5RefreshTokenExpiredIn",
                table: "AbpUsers");
        }
    }
}
