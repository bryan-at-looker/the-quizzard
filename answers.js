module.exports = [
  {},
  {
    label: "1) How many inventory items have we ever had?",
    fields: ['inventory_items.count'],
    filters: null,
    pivots: null,
    num_rows: 1
  },
  {
    label: "2) What is the most common city based on number of customers?",
    fields: [
      "users.city",
      "users.count"
    ],
    filters: null,
    pivots: null,
    "sorts": ["users.count desc"],
    num_rows: 1,
    limit: "1"
  },
  {
    label: "3) What is the highest total sale price for any single order?",
    fields: [
      "order_items.order_id",
      "order_items.total_sale_price"
    ],
    filters: null,
    pivots: null,
    sorts: [
      "order_items.total_sale_price desc"
    ],
    limit: "1",
    num_rows: 1,
  },
  {
    label: "4) What brand has generated the most revenue?",
    fields: [
      "products.brand",
      "order_items.total_sale_price"
    ],
    filters: null,
    pivots: null,
    sorts: ["order_items.total_sale_price desc"],
    limit: "1",
    num_rows: 1
  },
  {
    label: "5) For any product categories with at least 2000 items sold, create a bar chart with the number of items sold count.",
    fields: [
      "products.category",
      "order_items.count"
    ],
    filters: {"order_items.count": ">=2000"},
    pivots: null,
    vis_config: { type: "looker_bar"}
  },
  {
    label: "6) Which day had the highest total revenue in history? (single value visualization showing just the day)",
    fields: [
      "order_items.total_sale_price",
      "order_items.created_date"
    ],
    filters: null,
    pivots: null,
    sorts: [
      "order_items.total_sale_price desc"
    ],
    limit: "1",
    num_rows: 1,
    vis_config: {
      "type": "single_value",
      "hidden_fields": ["order_items.total_sale_price"]
    }
  },
  {
    label: "7) Compare Number on Hand and Inventory Items Count broken down by inventory items created in the last 60 days, not including today. Show this as an area chart",
    fields: [
      "inventory_items.number_on_hand",
      "inventory_items.created_date",
      "inventory_items.count"
    ],
    filters: {
      "inventory_items.created_date": "60 days ago for 60 days"
   },
    pivots: null,
    vis_config: {"type": "looker_area"}
  },
  {
    label: "8) Gross Margin broken down by Age Tier by day for the last 30 days. Stacked Column Chart with Date on X axis",
    fields: [
      "order_items.created_date",
      "order_items.total_gross_margin",
      "users.age_tier"
   ],
   "filters": {
    "order_items.created_date": "30 days"
    },
    "pivots": [
      "users.age_tier"
    ],
    vis_config: {"stacking": "normal", "type": "looker_column"},
  },
]

// template
// {
//   label: "",
//   fields: [],
//   filters: {},
//   pivots: [],
//   sorts: [],
//   limit: "",
//   num_rows: 0,
//   vis_config: {},
// }