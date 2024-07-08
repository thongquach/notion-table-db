import { GridSortModel } from "@mui/x-data-grid-pro";
import { FilterValue } from "../../filters";
import { toNotionFilters, toNotionSortModel } from "../api";

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
describe("toNotionFilters", () => {
  it.each([
    [[], []],
    [
      [
        {
          compound: "where",
          property: "Name",
          type: "string",
          operator: "contains",
          value: "Mike",
          nested: [],
        },
      ],
      {
        property: "Name",
        rich_text: {
          contains: "Mike",
        },
      },
    ],
    [
      [
        {
          compound: "where",
          property: "Name",
          type: "string",
          operator: "contains",
          value: "Mike",
          nested: [],
        },
        {
          compound: "and",
          property: "Company",
          type: "string",
          operator: "contains",
          value: "Tech",
          nested: [],
        },
        {
          compound: "and",
          property: "Name",
          type: "string",
          operator: "contains",
          value: "Mendez",
          nested: [],
        },
      ],
      {
        and: [
          {
            property: "Name",
            rich_text: {
              contains: "Mike",
            },
          },
          {
            property: "Company",
            rich_text: {
              contains: "Tech",
            },
          },
          {
            property: "Name",
            rich_text: {
              contains: "Mendez",
            },
          },
        ],
      },
    ],
  ])(
    "should convert an array of FilterValue to Notion filters",
    (filters, expectedNotionFilters) => {
      const notionFilters = toNotionFilters(filters as FilterValue[]);

      expect(notionFilters).toEqual(expectedNotionFilters);
    }
  );
});
