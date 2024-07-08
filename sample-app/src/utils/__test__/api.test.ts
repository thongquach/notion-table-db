import { GridSortModel } from "@mui/x-data-grid-pro";
import { toNotionSortModel } from "../api";

describe("toNotionSortModel", () => {
  it("should convert MUI GridSortModel to Notion sort model", () => {
    const gridSortModel: GridSortModel = [
      { field: "priority", sort: "asc" },
      { field: "expectedClose", sort: "desc" },
    ];
    const notionSortModel = toNotionSortModel(gridSortModel);

    expect(notionSortModel).toEqual([
      { property: "Priority", direction: "ascending" },
      { property: "Expected Close", direction: "descending" },
    ]);
  });

  it("should return an empty array if GridSortModel is empty", () => {
    const gridSortModel: GridSortModel = [];
    const notionSortModel = toNotionSortModel(gridSortModel);

    expect(notionSortModel).toEqual([]);
  });
});
