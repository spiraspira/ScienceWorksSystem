using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SWS.DAL.Migrations
{
    /// <inheritdoc />
    public partial class RemoveFieldsMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateEndFirstTour",
                table: "Contests");

            migrationBuilder.DropColumn(
                name: "DateEndSecondTour",
                table: "Contests");

            migrationBuilder.DropColumn(
                name: "DateStartFirstTour",
                table: "Contests");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateEndFirstTour",
                table: "Contests",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateEndSecondTour",
                table: "Contests",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateStartFirstTour",
                table: "Contests",
                type: "timestamp with time zone",
                nullable: true);
        }
    }
}
