import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  console.log(event)
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const integration = {
    "integrations": [
      {
        "name": "take_quiz",
        "label": "The Quizzard",
        "supported_action_types": ["query"],
        "url": "https://9zksmtb2kk.execute-api.us-east-1.amazonaws.com/prod/check_query",
        "form_url": "https://9zksmtb2kk.execute-api.us-east-1.amazonaws.com/prod/form",
        "icon_data_uri": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBjbGFzcz0ic3ZnLWlubGluZS0tZmEgZmEtcXVlc3Rpb24gZmEtdy0xMiI+IDxnPiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPiAgPHJlY3QgZmlsbD0ibm9uZSIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjMwMiIgd2lkdGg9IjMwMiIgeT0iLTEiIHg9Ii0xIi8+IDwvZz4gPGc+ICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+ICA8cGF0aCBzdHJva2U9Im51bGwiIGlkPSJzdmdfMSIgZD0ibTgxLjA5MTkxMiwyMi43NjI3OTZjLTIzLjU2NzgyNCwwIC0zOC44MzI3NzMsOS42NTYwNzkgLTUwLjgxNzMxOSwyNi44NzY4NjljLTIuMTc0MDQyLDMuMTIzOTEzIC0xLjUwMzc4OSw3LjQwNzAzOSAxLjUyODg4Nyw5LjcwNjU2OWwxMi43MzcxNzgsOS42NTc4NTFjMy4wNjI3OTMsMi4zMjIyNjYgNy40MjA2MjEsMS43NzkyNzIgOS44MTg0NzUsLTEuMjI0NzYzYzcuMzk2MTE0LC05LjI2NTczNyAxMi44ODI0NDksLTE0LjYwMDYwMSAyNC40MzUzMTYsLTE0LjYwMDYwMWM5LjA4MzU1OCwwIDIwLjMxOTAxNCw1Ljg0NTk2OCAyMC4zMTkwMTQsMTQuNjU0MzM5YzAsNi42NTg4MzUgLTUuNDk2OTY0LDEwLjA3ODYwNCAtMTQuNDY1OTYsMTUuMTA2OTgyYy0xMC40NTkyMDIsNS44NjM5OCAtMjQuMzAwMDg0LDEzLjE2MTc3IC0yNC4zMDAwODQsMzEuNDE3NzYybDAsMi44OTAwNjJjMCwzLjkxMzc0OSAzLjE3MjYzMiw3LjA4NjM4IDcuMDg2MzgsNy4wODYzOGwyMS4zOTgyMTEsMGMzLjkxMzc0OSwwIDcuMDg2MzgsLTMuMTcyNjMyIDcuMDg2MzgsLTcuMDg2MzhsMCwtMS43MDQ1N2MwLC0xMi42NTUwOTQgMzYuOTg3MzYyLC0xMy4xODIxNDQgMzYuOTg3MzYyLC00Ny40Mjc2NjdjMC4wMDAyOTUsLTI1Ljc4OTcgLTI2Ljc1MTM4MSwtNDUuMzUyODM0IC01MS44MTM4NDEsLTQ1LjM1MjgzNHptLTIuOTU4ODU5LDExMC4yNjk2ODdjLTExLjI3Nzk3NCwwIC0yMC40NTMzNiw5LjE3NTM4NiAtMjAuNDUzMzYsMjAuNDUzMzZjMCwxMS4yNzc2NzkgOS4xNzUzODYsMjAuNDUzMDY1IDIwLjQ1MzM2LDIwLjQ1MzA2NXMyMC40NTMzNiwtOS4xNzUzODYgMjAuNDUzMzYsLTIwLjQ1MzM2cy05LjE3NTM4NiwtMjAuNDUzMDY1IC0yMC40NTMzNiwtMjAuNDUzMDY1eiIgZmlsbD0iY3VycmVudENvbG9yIi8+ICA8ZyBzdHJva2U9Im51bGwiIGlkPSJzdmdfNiI+ICAgPHBhdGggc3Ryb2tlPSJudWxsIiBpZD0ic3ZnXzUiIGQ9Im0yNzYuMzg1NDQ3LDI0NS4wNTI4M2wtMTgxLjc3MDg3NSwwYy0zLjM0NzYxNCwwIC02LjA1OTAyOSwyLjcxMTQxNiAtNi4wNTkwMjksNi4wNTkwMjlsMCwxMi4xMTgwNThjMCwzLjM0NzYxNCAyLjcxMTQxNiw2LjA1OTAyOSA2LjA1OTAyOSw2LjA1OTAyOWwxODEuNzcwODc1LDBjMy4zNDc2MTQsMCA2LjA1OTAyOSwtMi43MTE0MTYgNi4wNTkwMjksLTYuMDU5MDI5bDAsLTEyLjExODA1OGMwLC0zLjM0NzYxNCAtMi43MTE0MTYsLTYuMDU5MDI5IC02LjA1OTAyOSwtNi4wNTkwMjl6bS0xMTUuMTIxNTU0LC0yNC4yMzYxMTdsLTI0LjIzNjExNywtMTIuMTE4MDU4bDI0LjIzNjExNywtMTIuMTE4MDU4bDEyLjExODA1OCwtMjQuMjM2MTE3bDEyLjExODA1OCwyNC4yMzYxMTdsMjQuMjM2MTE3LDEyLjExODA1OGwtMjQuMjM2MTE3LDEyLjExODA1OGwtNi4wNTkwMjksMTIuMTE4MDU4bDc4Ljc2NzM3OSwwbC0zMi43MjI1NDQsLTc2LjM1NTEyOGEyNC4yMTkwNzYsMjQuMjE5MDc2IDAgMCAxIC0wLjcxNTcyMywtMTcuMjExNDNsMjEuMzIwMjA5LC02My45NjgybC03MS4wMzQ1NDMsNDAuNTkxNzA4YTQ4LjQ2ODA2OCw0OC40NjgwNjggMCAwIDAgLTIwLjI0NDczMSwyMi4zOTk0NzNsLTQyLjAxOTM2Nyw5NC41NDM1NzZsNTQuNTMxMjYyLDBsLTYuMDU5MDI5LC0xMi4xMTgwNTh6bTI0LjIzNjExNywtODQuODI2NDA4bDYuMDU5MDI5LC0xMi4xMTgwNThsNi4wNTkwMjksMTIuMTE4MDU4bDEyLjExODA1OCw2LjA1OTAyOWwtMTIuMTE4MDU4LDYuMDU5MDI5bC02LjA1OTAyOSwxMi4xMTgwNThsLTYuMDU5MDI5LC0xMi4xMTgwNThsLTEyLjExODA1OCwtNi4wNTkwMjlsMTIuMTE4MDU4LC02LjA1OTAyOXoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPiAgPC9nPiA8L2c+PC9zdmc+",
        "description": "Answer a question from your explore",
        "supported_formats": ["json_detail"],
        "uses_oauth": false,
        "params": [
          {"name": "email", "label": "Email", "required": true},
          {"name": "user_id", "label": "User ID", "required": true}
        ]
      }
    ]
  }

  try {
    return success(integration);
  } catch (e) {
    return failure({ status: false });
  }
}
