import { GridSortModel } from "@mui/x-data-grid-pro";
import { FilterValue } from "../../Filters/types";
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
    // empty filters
    [[], []],
    // single filter
    [
      [
        {
          compound: "where",
          property: "Name",
          type: "rich_text",
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
    // multiple filters
    [
      [
        {
          compound: "where",
          property: "Name",
          type: "rich_text",
          operator: "contains",
          value: "Mike",
          nested: [],
        },
        {
          compound: "and",
          property: "Company",
          type: "rich_text",
          operator: "contains",
          value: "Tech",
          nested: [],
        },
        {
          compound: "and",
          property: "Name",
          type: "rich_text",
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
    // nested filters
    [
      [
        {
          compound: "where",
          property: "Name",
          type: "rich_text",
          operator: "contains",
          value: "Mike",
          nested: [],
        },
        {
          compound: "and",
          property: "Name",
          type: "rich_text",
          operator: "contains",
          value: "",
          nested: [
            {
              compound: "where",
              property: "Company",
              type: "rich_text",
              operator: "contains",
              value: "Tech",
              nested: [],
            },
            {
              compound: "or",
              property: "Company",
              type: "rich_text",
              operator: "contains",
              value: "Mode",
              nested: [],
            },
          ],
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
            or: [
              {
                property: "Company",
                rich_text: {
                  contains: "Tech",
                },
              },
              {
                property: "Company",
                rich_text: {
                  contains: "Mode",
                },
              },
            ],
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
