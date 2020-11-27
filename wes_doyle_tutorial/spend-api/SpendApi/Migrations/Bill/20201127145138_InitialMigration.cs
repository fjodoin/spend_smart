using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SpendApi.Migrations.Bill
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bills",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Company = table.Column<string>(maxLength: 140, nullable: false),
                    AmountSaved = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    AmountDue = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    DateBill = table.Column<DateTime>(nullable: false),
                    Type = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bills", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bills");
        }
    }
}
