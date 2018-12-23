using Microsoft.EntityFrameworkCore.Migrations;

namespace AbpCompanyName.AbpProjectName.Migrations
{
    public partial class AddMemberUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<short>(
                name: "UserType",
                table: "AbpUsers",
                nullable: false,
                defaultValue: (short)0);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "AbpUsers",
                maxLength: 64,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "AbpUsers",
                maxLength: 64,
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "Gender",
                table: "AbpUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HeadLogo",
                table: "AbpUsers",
                maxLength: 512,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NickName",
                table: "AbpUsers",
                maxLength: 64,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Province",
                table: "AbpUsers",
                maxLength: 64,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SessionKey",
                table: "AbpUsers",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UnionId",
                table: "AbpUsers",
                maxLength: 128,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserType",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "City",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "HeadLogo",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "NickName",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "Province",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "SessionKey",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "UnionId",
                table: "AbpUsers");
        }
    }
}
