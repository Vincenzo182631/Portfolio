---
title: "Automating the Webinar Journey from Registration to Follow-Up"
seoTitle: "Sunny Braids case study: GoHighLevel webinar automation"
client: "Sunny Braids"
industry: "Online education and beauty training"
status: "Client work"
description: "GoHighLevel webinar automation for Sunny Braids: registration, reminders, attendance-based tagging, Zoom integration and follow-up sequences."
summary: "A webinar funnel in GoHighLevel: registration, reminders, attendance-based tagging and follow-up, connected to Zoom through webhooks."
order: 4
tags: ["GoHighLevel", "Webinar Funnels", "CRM Automation", "Online Education"]
contribution:
  - "Webinar registration and confirmation workflows"
  - "Automated email reminders"
  - "Attendance-based tagging and segmentation"
  - "Post-webinar follow-up and nurture sequences"
  - "Zoom-related automation"
  - "Spanish-language campaign support"
tools: ["GoHighLevel", "Zoom", "Webhooks", "Email campaigns", "Contact tags", "Workflows"]
services: ["gohighlevel", "automation"]
flow: ["Registration", "Reminders", "Attendance tags", "Follow-up"]
---

## The challenge

Sunny Braids teaches braiding through online training, and webinars are how many prospective students first meet the business. A webinar looks like one event. In practice it is a chain of messages: a confirmation when someone registers, reminders before the session, and different follow-ups depending on whether the person showed up.

Done by hand, that chain is repetitive and easy to break. Someone has to send the reminders on time, check who attended, sort the list and write to each group. Every webinar repeats the same work.

## My contribution

I built the automation behind the webinar journey in GoHighLevel. That included registration and confirmation workflows, automated email reminders, tagging and segmentation based on attendance, post-webinar follow-up, nurture sequences, and the Zoom-related automation that ties the session to the CRM. I also supported Spanish-language campaigns.

## The solution

I designed the workflow architecture before building any single automation. The journey has three phases, and each one hands off to the next.

1. **Before the webinar.** A registration creates the contact, sends a confirmation with the session details, and schedules reminders.
2. **During and just after.** Attendance is recorded against the contact. People who attended and people who registered but did not attend receive different tags.
3. **After the webinar.** Each segment enters its own follow-up. Attendees get the next step. Those who missed the session get a different message. Contacts who are not ready move into a longer nurture sequence.

Because the segments are defined by tags, the messages stay relevant without anyone sorting a list.

## Technical implementation

Registration forms feed GoHighLevel directly. A workflow triggered by the form submission sends the confirmation email and queues the reminders relative to the webinar time.

Zoom is connected through webhooks. Registration and attendance events are passed to the CRM, where a workflow applies the matching tag to the contact. Those tags drive segmentation, and each segment has its own email sequence.

For Spanish-language campaigns, contacts are segmented by language so that confirmations, reminders and follow-ups arrive in the language the person registered in.

This is typical of how I approach [GoHighLevel CRM and marketing automation](/services/gohighlevel/): map the process, decide what each tag means, then build workflows that respond to events instead of schedules someone has to watch. The Zoom connection uses the same event-driven pattern I describe under [workflow automation](/services/automation/).

## Outcome

What now exists is a webinar system that runs from registration to follow-up:

- Registration and confirmation handled automatically.
- Reminder emails sent on schedule.
- Contacts tagged by attendance and segmented accordingly.
- Separate follow-up and nurture sequences for each segment.
- Zoom events reflected in the CRM.
- Support for Spanish-language campaigns.

The practical result is fewer repetitive messages written and sent by hand around each webinar. I have not published enrollment or conversion figures for this project.

## Considerations

Tag design mattered more than any single email. A tag that means two different things in two workflows produces the wrong message for the wrong person, so I kept the set small and gave each tag one meaning.

Attendance data depends on the integration. If a webhook fails or a person joins under a different email address, the contact can land in the wrong segment. I tested the handoff with real registrations, and the non-attendee message is written so that it still reads acceptably to someone who was in the room.

Running campaigns in two languages doubles the content to maintain. Keeping the workflow structure identical across both languages means a change to the logic is made once and applied to each.
