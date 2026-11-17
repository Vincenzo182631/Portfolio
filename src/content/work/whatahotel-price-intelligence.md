---
title: "Building a Price-Intelligence Engine That Says When It Does Not Know"
seoTitle: "WhataHotel Price Intelligence: a hotel rate-scoring platform"
client: "WhataHotel Price Intelligence"
industry: "Luxury hospitality and travel"
status: "In development"
repo: "https://github.com/Vincenzo182631/Whatahotel-Price-Intelligence"
description: "An embedded hotel price-intelligence platform: scheduled rate collection, a deterministic scoring engine, an API and a widget, with 270 passing tests."
summary: "A platform that collects hotel rates on a schedule and scores whether a rate is a good deal, with a deterministic engine and an embeddable widget."
order: 7
tags: ["Automation", "Data Pipelines", "API Design", "Hospitality"]
contribution:
  - "Data model, schema and migrations"
  - "Rate ingestion and normalization pipeline"
  - "Deterministic scoring and confidence engine"
  - "REST API and embeddable widget"
  - "Scheduled collection in GitHub Actions"
  - "Test suite and calibration tooling"
tools: ["TypeScript", "Node.js", "PostgreSQL", "GitHub Actions", "REST API", "Docker", "JavaScript"]
services: ["automation", "website-development"]
flow: ["Rate source", "Ingest and normalize", "Scoring engine", "Widget"]
facts:
  - { value: "270", label: "automated tests passing" }
  - { value: "1,109", label: "rates in the first real collection" }
  - { value: "38", label: "API smoke checks" }
  - { value: "6 h", label: "between scheduled collection runs" }
---

## The challenge

A traveler looking at a luxury hotel rate has one question: is this a good deal? Answering it needs a record of what that room has cost before, and most rate sources only show today's price.

The platform is meant to sit inside a hotel page as a widget, answer that question, and turn the answer into a booking or a conversation with an advisor. The risk in a product like this is a confident score with nothing behind it.

## My contribution

I designed and built the platform: the data model, the ingestion pipeline, the scoring engine, the API, the widget and the scheduled collection job. The work is in development, and I describe below exactly what is running and what is not yet proven.

## The solution

The system is a pipeline with one job per stage:

1. **Collect.** An adapter reads rates from the source. A production adapter for WhataHotel exists and runs with one command.
2. **Ingest.** Each rate is validated, normalized, classified and stored as an append-only observation.
3. **Roll up.** Observations are rolled up into baselines, one row per level of a comparison ladder.
4. **Score.** A scoring engine with no input or output of its own computes a deal score and a confidence score from the baselines.
5. **Explain.** A template writes the explanation. Language generation is available behind a configuration flag, and it only explains the result. It never decides it.
6. **Serve.** A REST API feeds a widget written in plain JavaScript.

Scheduled, unattended work like this is what I mean by [workflow automation](/services/automation/): each step has one job, and failures are visible.

## Technical implementation

The stack is TypeScript on Node.js with PostgreSQL 16. Collection runs in GitHub Actions every 6 hours and can also be dispatched manually, including a dry run that plans and calls nothing.

The engine returns a verdict even when it cannot score. This is the documented response shape for that case, from `docs/mvp/06-api.md`:

```jsonc
"verdict": {
  "deal_score": null,
  "deal_score_band": null,
  "confidence": 31,
  "confidence_band": "INSUFFICIENT",
  "recommendation": "INSUFFICIENT_DATA",
  "recommendation_label": "Not enough data yet"
}
```

A null score with a stated reason is a designed outcome, not an error. The widget is built on the same API contract as any other client, which is what you would expect from a [website development](/services/website-development/) project with a data layer behind it.

## Outcome

What the repository shows today:

- All seven planned milestones are built, from data source verification to calibration tooling.
- 270 tests pass, covering scenarios, property invariants, unit tests and integration tests against PostgreSQL. There are also 9 schema behavior checks and 38 API smoke checks.
- The first real collection ran: 15 Miami hotels and 1,109 rates, all matched by source ID or exact alias and rolled up into 1,617 baseline rows.
- The scheduled collection job is live.

What is not proven:

- **The scoring weights are not calibrated against real data.** They are documented starting values. The calibration harness is built; the calibration itself needs data that is still accumulating.
- **Scores are not appearing yet.** The source carries no rate history, so baselines build forward from the first capture. Until enough has accrued, the engine correctly returns `INSUFFICIENT_DATA`.
- No rate data is committed to the repository. The only rate-like data in it is a synthetic development seed.

## Considerations

Because the source has no history, a missed collection run is data that can never be recovered. That shaped the schedule, the runbook for failed runs and the decision to store observations as append-only records.

Keeping the decision deterministic and the language layer separate costs some flexibility. In exchange, every score can be traced to stored rates and a documented formula, and the same inputs always give the same answer.
