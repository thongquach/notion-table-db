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
// describe("toNotionFilters", () => {
//     it("should convert an array of FilterValue to Notion filters", () => {
//         const filters: FilterValue[] = [
//             { property: "name", operator: "equals", value: "active" },
//             { column: "priority", operator: "greaterThan", value: 3 },
//         ];
//         const notionFilters = toNotionFilters(filters);

//         expect(notionFilters).toEqual([
//             {
//                 property: "Status",
//                 filter: {
//                     operator: "equals",
//                     value: "active",
//                 },
//             },
//             {
//                 property: "Priority",
//                 filter: {
//                     operator: "greater_than",
//                     value: 3,
//                 },
//             },
//         ]);
//     });

//     it("should return an empty array if filters is empty", () => {
//         const filters: FilterValue[] = [];
//         const notionFilters = toNotionFilters(filters);

//         expect(notionFilters).toEqual([]);
//     });
// });
