using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class Bogus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6f34457e-e406-4545-aa0b-f5025b756ed2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f8f03419-f927-4fb2-af97-1721624049cd");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6c4fdf84-d5a7-4e30-9388-bab43af0c43a", null, "Customer", "CUSTOMER" },
                    { "86fbd8ee-24e1-4ab3-956f-79f531a98765", null, "Librarian", "LIBRARIAN" }
                });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "Author", "Category", "CoverImage", "Description", "ISBN", "PageCount", "PublicationDate", "Publisher", "Title" },
                values: new object[] { "F. Scott Fitzgerald", "Realism", "Gatsby.png", "A mysterious millionaire who wants to reunite with his former lover", 9780743273565L, 180, new DateTime(1925, 4, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Charles Scribner's Sons", "The Great Gatsby" });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Author", "Category", "CoverImage", "Description", "ISBN", "PageCount", "PublicationDate", "Publisher", "Title" },
                values: new object[] { "Suzanne Collins", "Dystopian", "HungerGames.png", "A twisted battle royale for entertainment", 9780439023481L, 384, new DateTime(2008, 9, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), "Scholastic Press", "The Hunger Games" });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Author", "AvailableUntil", "Category", "CoverImage", "Description", "ISBN", "PageCount", "PublicationDate", "Publisher", "Title" },
                values: new object[,]
                {
                    { 1, "Gregg Hickle", new DateTime(2024, 1, 29, 17, 0, 37, 384, DateTimeKind.Local).AddTicks(791), "dolores", "Bogus.DataSets.Images", "SQL yellow", 1520757254L, 1000270983, new DateTime(1957, 5, 16, 18, 57, 7, 65, DateTimeKind.Local).AddTicks(891), "Mayert - Ferry", "corrupti modi maiores" },
                    { 2, "Louvenia Kunze", new DateTime(2023, 6, 6, 21, 59, 7, 78, DateTimeKind.Local).AddTicks(9002), "molestiae", "Bogus.DataSets.Images", "Supervisor maximize", -2047466271L, -261126872, new DateTime(2016, 4, 27, 11, 4, 6, 69, DateTimeKind.Local).AddTicks(9141), "Hermann and Sons", "qui ut in" },
                    { 3, "Kaitlin Erdman", new DateTime(2020, 3, 6, 16, 27, 21, 443, DateTimeKind.Local).AddTicks(3302), "et", "Bogus.DataSets.Images", "24/7 Avon", 364855197L, 852037481, new DateTime(2008, 1, 24, 5, 22, 3, 871, DateTimeKind.Local).AddTicks(1958), "Hegmann Inc", "corporis qui nihil" },
                    { 4, "Reyna Cronin", new DateTime(2023, 4, 1, 9, 7, 11, 294, DateTimeKind.Local).AddTicks(4699), "inventore", "Bogus.DataSets.Images", "back-end e-commerce", -11853858L, 1947837807, new DateTime(2014, 2, 15, 21, 8, 39, 368, DateTimeKind.Local).AddTicks(9696), "Champlin - Halvorson", "qui harum voluptate" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6c4fdf84-d5a7-4e30-9388-bab43af0c43a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "86fbd8ee-24e1-4ab3-956f-79f531a98765");

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6f34457e-e406-4545-aa0b-f5025b756ed2", null, "Librarian", "LIBRARIAN" },
                    { "f8f03419-f927-4fb2-af97-1721624049cd", null, "Customer", "CUSTOMER" }
                });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "Author", "Category", "CoverImage", "Description", "ISBN", "PageCount", "PublicationDate", "Publisher", "Title" },
                values: new object[] { "Suzanne Collins", "Dystopian", "HungerGames.png", "A twisted battle royale for entertainment", 9780439023481L, 384, new DateTime(2008, 9, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), "Scholastic Press", "The Hunger Games" });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "Author", "Category", "CoverImage", "Description", "ISBN", "PageCount", "PublicationDate", "Publisher", "Title" },
                values: new object[] { "F. Scott Fitzgerald", "Realism", "Gatsby.png", "A mysterious millionaire who wants to reunite with his former lover", 9780743273565L, 180, new DateTime(1925, 4, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Charles Scribner's Sons", "The Great Gatsby" });
        }
    }
}
