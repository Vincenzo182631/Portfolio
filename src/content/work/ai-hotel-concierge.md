---
title: "Exploring Conversational AI for Hotel Discovery and Guest Assistance"
seoTitle: "AI hotel concierge prototype: conversational AI for hotels"
client: "AI Hotel Concierge"
industry: "Luxury hospitality and travel"
status: "Prototype"
repo: "https://github.com/Vincenzo182631/whatahotel"
description: "Two prototypes for conversational hotel assistance: an AI travel advisor app in Next.js and an avatar guide on a hotel landing page."
summary: "Two prototypes: a conversational hotel advisor that runs with or without an AI key, and a live avatar guide on the WhataHotel Homes page."
order: 8
tags: ["AI Integration", "Conversational AI", "Prototype", "Hospitality"]
contribution:
  - "Conversational advisor app and chat interface"
  - "Deterministic recommendation and memory logic"
  - "Streaming replies through the Vercel AI SDK"
  - "Avatar concierge panel with a token endpoint"
  - "Guide script that limits what the avatar may say"
tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel AI SDK", "Claude", "LiveAvatar SDK", "Zustand"]
services: ["automation", "website-development"]
flow: ["Guest question", "Deterministic logic", "Hotel data", "Spoken or written reply"]
facts:
  - { value: "11", label: "replaceable service modules" }
  - { value: "9", label: "destinations in the mock inventory" }
  - { value: "0", label: "API keys needed to run the app" }
  - { value: "3", label: "hosts supported by the avatar token function" }
---

## The challenge

Hotel search asks people to fill in forms: destination, dates, guests, filters. A good travel advisor asks a question and listens. I wanted to find out how much of that advisor experience software could deliver for luxury hotels without inventing facts about a property.

I explored it in two prototypes. Neither is presented here as a finished product.

## My contribution

I built both. The first is an AI travel advisor app. The second is an avatar concierge on the WhataHotel Homes landing page. In both I wrote the interface, the logic that decides what the assistant does, and the integration with the AI service.

## The solution

**The advisor app.** The homepage is a single prompt. The advisor asks only for details it is missing, remembers what it has been told, and changes one field when the guest changes their mind. It returns recommendation cards with a reason for each choice, compares hotels side by side on request, and collects booking details in conversation with a running summary. A hotel page has a docked advisor for questions about that property.

**The avatar concierge.** A launcher on the Homes page opens a panel with a live avatar guide called Ava. Its script restricts it to one job: helping visitors use the page. It asks only for a first name and is told never to request an email address, phone number, dates or payment details.

Both are examples of the AI work I describe under [workflow automation](/services/automation/): added where it helps, and treated as a prototype until it is proven in use.

## Technical implementation

The advisor is a Next.js 15 app with React 19 and TypeScript. Its central idea is that the language model never fetches data and has no tools. Deterministic code parses the message, updates memory, decides the action and gathers the facts, then hands a finished situation to a voice layer that only phrases it. From the README:

```
Client (Zustand store)
  └─ POST /api/chat  { sessionId, messages, intent? }
       └─ runTurn()        update memory, decide action,
       │                   fetch recommendations / comparison / booking
       └─ streamReply()    text deltas, then a final structured payload
```

With an API key, replies stream from Claude through the Vercel AI SDK. Without one, a deterministic template writes them, so the app runs with no keys at all. Hotel data comes through eleven replaceable service modules; without credentials they return mock inventory covering nine destinations.

The avatar runs on the LiveAvatar web SDK. The browser needs a short-lived session token, so a small serverless function mints it and the API key never reaches the browser. The same function is provided for three hosts. If the endpoint is unreachable, the panel falls back to an embedded version. Nothing loads until a visitor opens the panel, and closing it stops the stream. The guide's script is kept in the repository in a file named for Tavus, which I used in earlier avatar experiments; the page itself runs on LiveAvatar.

## Outcome

What exists:

- A working advisor app with conversational search, comparison, a booking conversation and a saved collection. This is a [website development](/services/website-development/) build as much as an AI one.
- An avatar panel with a token function, a fallback mode and analytics events for opening it and starting the avatar.

What is not proven or not live:

- The advisor's default inventory and perks are mock data. Live hotel inventory depends on credentials that are optional in the code.
- Conversation memory is held in server memory. The README lists moving it to a database as a step before production.
- The booking flow collects details and shows a summary. I do not claim it completes real reservations.
- I have no usage or conversion figures for either prototype.

## Considerations

Putting the decisions in deterministic code makes recommendations explainable and repeatable, and keeps the model from stating things the data does not support. The cost is more code to write and maintain than a prompt-only assistant.

For the avatar, the narrow script was the main design decision. A guide that only explains the page cannot quote a wrong rate or promise availability, which matters more on a booking site than a wider range of answers.
