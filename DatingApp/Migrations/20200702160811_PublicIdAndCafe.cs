using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.Migrations
{
    public partial class PublicIdAndCafe : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Photos",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Cafe",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Latitude = table.Column<float>(nullable: false),
                    Longitude = table.Column<float>(nullable: false),
                    PhotoUrl = table.Column<string>(nullable: true),
                    Street = table.Column<string>(nullable: true),
                    Home = table.Column<string>(nullable: true),
                    TasteRate = table.Column<int>(nullable: false),
                    TimeRate = table.Column<int>(nullable: false),
                    ServiceRate = table.Column<int>(nullable: false),
                    DistanceRate = table.Column<int>(nullable: false),
                    PortionRate = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cafe", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cafe");

            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "Photos");
        }
    }
}
