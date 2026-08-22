# Servant of the Lake Keyword Matrix Workbook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create one verified Excel workbook containing a complete 19-keyword list and a five-column page matrix for the Servant of the Lake guide site.

**Architecture:** A single JavaScript builder uses the bundled `@oai/artifact-tool` runtime to create two worksheets from the approved keyword source. The workbook contains no invented search-volume or Trends metrics; content priorities are editorial P1/P2/P3 judgments and every source keyword maps to exactly one planned page.

**Tech Stack:** Bundled Node.js, `@oai/artifact-tool`, Excel `.xlsx`

## Global Constraints

- Create exactly one `.xlsx` workbook.
- Worksheet `关键词清单` lists all 19 source keywords.
- Worksheet `页面矩阵规划` contains exactly five columns: 页面、页面类型、承接关键词、解决用户问题、优先级.
- Do not fabricate search volume, KD, or Google Trends values.
- Save the final workbook under `outputs/019fdcd2-bb2d-7ca1-941a-038347d294eb/`.
- Render and visually inspect both worksheets before completion.

---

### Task 1: Build the workbook

**Files:**
- Create: `.codex_tmp/build_servant_keyword_matrix.mjs`
- Create: `outputs/019fdcd2-bb2d-7ca1-941a-038347d294eb/Servant_of_the_Lake_关键词清单与页面矩阵.xlsx`

**Interfaces:**
- Consumes: `关键词.md` and `keywords.json` keyword definitions already reviewed in the workspace.
- Produces: an Excel workbook with the two required worksheets and 19 complete keyword mappings.

- [ ] **Step 1: Mark the artifact operation**

Run the required `mark_artifact_operation_started.mjs` command once with create, one expected output, and xlsx format.

- [ ] **Step 2: Write the workbook builder**

Create a workbook with two sheets. Populate the first sheet with the keyword category, keyword, user intent, mapped page, page type, and priority. Populate the second sheet with exactly the five user-requested columns and the approved consolidated page plan.

- [ ] **Step 3: Apply usable formatting**

Add clear titles, contrasting headers, text wrapping, useful column widths, frozen table headers, filters, and priority coloring. Keep the design compact and independent of the reference screenshot.

- [ ] **Step 4: Inspect workbook values**

Inspect the keyword data range and page matrix range. Confirm the first sheet has 19 keyword rows, every keyword is unique, and the page matrix headers exactly match the five requested labels.

- [ ] **Step 5: Scan formula errors**

Scan both sheets for `#REF!`, `#DIV/0!`, `#VALUE!`, `#NAME?`, and `#N/A`. Expected result: no matches.

- [ ] **Step 6: Render both worksheets**

Render each used range to PNG. Check that titles, headers, keywords, user problems, and priorities are visible without clipping.

- [ ] **Step 7: Export final workbook**

Export the workbook to `outputs/019fdcd2-bb2d-7ca1-941a-038347d294eb/Servant_of_the_Lake_关键词清单与页面矩阵.xlsx` and verify the file exists and can be imported back by `@oai/artifact-tool`.
