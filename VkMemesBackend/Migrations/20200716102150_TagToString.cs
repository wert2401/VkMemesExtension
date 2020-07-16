using Microsoft.EntityFrameworkCore.Migrations;

namespace VkMemesBackend.Migrations
{
    public partial class TagToString : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TagModel");

            migrationBuilder.AddColumn<string>(
                name: "Tag",
                table: "Memes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tag",
                table: "Memes");

            migrationBuilder.CreateTable(
                name: "TagModel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    MemeModelId = table.Column<int>(type: "INTEGER", nullable: true),
                    Tag = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagModel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TagModel_Memes_MemeModelId",
                        column: x => x.MemeModelId,
                        principalTable: "Memes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TagModel_MemeModelId",
                table: "TagModel",
                column: "MemeModelId");
        }
    }
}
