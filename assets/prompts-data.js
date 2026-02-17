/* =========================================================
   WFCS Booking — Claude Agent Prompts Database
   Source: sample-mcp-prompts.md
   Update here and all role pages reflect the change.
   ========================================================= */

var promptsDatabase = {

  /* ── CUSTOMER ─────────────────────────────────────────── */
  customer: {
    activities: [
      { text: 'Show me yoga classes available next month', difficulty: 'easy' },
      { text: 'What pilates sessions can I book this weekend?', difficulty: 'easy' },
      { text: 'Are there any swimming activities for kids?', difficulty: 'easy' },
      { text: 'I\'m looking for activities on Saturdays. Can you show me what\'s available and tell me how many spaces are left in each?', difficulty: 'intermediate' },
      { text: 'Find all activities at Bellshill venue that cost under £50', difficulty: 'intermediate' },
      { text: 'Show me activities by price, cheapest first', difficulty: 'easy' }
    ],
    bookings: [
      { text: 'Show my upcoming bookings', difficulty: 'easy' },
      { text: 'Cancel my booking for yoga on Saturday', difficulty: 'easy' },
      { text: 'I booked a swimming class but I need to reschedule. Can you show me my booking details and what other times are available?', difficulty: 'intermediate' },
      { text: 'I have a booking that\'s pending payment. Help me pay for it using my account credit first, then card if needed', difficulty: 'intermediate' },
      { text: 'Book me into the Saturday morning yoga class at 10am. Use my account credit first, then card if needed.', difficulty: 'intermediate' }
    ],
    participants: [
      { text: 'Add my child Emma (DOB: 15/03/2015) to the system', difficulty: 'easy' },
      { text: 'Show my participants', difficulty: 'easy' },
      { text: 'Update my daughter\'s date of birth', difficulty: 'easy' },
      { text: 'I need to add two children: Emma (DOB: 15/03/2015) and Jack (DOB: 22/07/2017). Can you add them both?', difficulty: 'intermediate' },
      { text: 'Remove my son from the system — we\'ve moved away', difficulty: 'easy' }
    ],
    credit: [
      { text: 'What\'s my credit balance?', difficulty: 'easy' },
      { text: 'Show my credit history', difficulty: 'easy' },
      { text: 'I have £30 credit and want to book a £50 class. Can you show me how much I need to pay by card after using my credit?', difficulty: 'intermediate' },
      { text: 'I want to withdraw my remaining credit to my bank account. How much do I have and what\'s the process?', difficulty: 'intermediate' }
    ],
    'gift-aid': [
      { text: 'Declare Gift Aid on my bookings', difficulty: 'easy' },
      { text: 'Withdraw my Gift Aid', difficulty: 'easy' },
      { text: 'Show my Gift Aid claims', difficulty: 'easy' },
      { text: 'I\'m a UK taxpayer. Can you guide me through making a Gift Aid declaration so the charity gets more of my booking fees?', difficulty: 'intermediate' },
      { text: 'Am I eligible for Gift Aid?', difficulty: 'easy' }
    ],
    profile: [
      { text: 'Show my profile', difficulty: 'easy' },
      { text: 'Update my phone number', difficulty: 'easy' },
      { text: 'My new phone is 07700 900123. Can you update my profile?', difficulty: 'easy' }
    ]
  },

  /* ── INSTRUCTOR ───────────────────────────────────────── */
  instructor: {
    sessions: [
      { text: 'Show my upcoming sessions', difficulty: 'easy' },
      { text: 'What sessions do I have this week?', difficulty: 'easy' },
      { text: 'Show me all past sessions', difficulty: 'easy' },
      { text: 'I\'m teaching yoga on Saturday at 10am. Who\'s booked in? How many students are expected?', difficulty: 'intermediate' },
      { text: 'Give me a summary of all my sessions for March with participant numbers', difficulty: 'intermediate' },
      { text: 'Which of my sessions has the most bookings?', difficulty: 'easy' }
    ],
    attendance: [
      { text: 'Mark attendance for my 10am yoga session today', difficulty: 'easy' },
      { text: '10 people attended, 2 no-shows', difficulty: 'easy' },
      { text: 'I\'m teaching yoga at 10am today. Can you show me who\'s booked, then help me mark who attended?', difficulty: 'intermediate' },
      { text: 'I had some no-shows today. Mark these people: Emma (no-show), Jack (attended), Sarah (attended)', difficulty: 'intermediate' },
      { text: 'Here\'s my attendance: attended: [names], no-shows: [names]. Record this and show me the updated stats', difficulty: 'intermediate' }
    ],
    statistics: [
      { text: 'Show my stats', difficulty: 'easy' },
      { text: 'How many sessions have I taught this month?', difficulty: 'easy' },
      { text: 'What\'s my attendance rate?', difficulty: 'easy' },
      { text: 'Give me a detailed breakdown of my performance this quarter: sessions taught, students, attendance rates, no-shows', difficulty: 'intermediate' },
      { text: 'Which of my activities is most popular?', difficulty: 'easy' }
    ],
    activities: [
      { text: 'Show me yoga classes available next month', difficulty: 'easy' },
      { text: 'What pilates sessions can I book this weekend?', difficulty: 'easy' },
      { text: 'Find all activities at Bellshill venue', difficulty: 'easy' }
    ],
    bookings: [
      { text: 'Show my upcoming bookings', difficulty: 'easy' }
    ],
    credit: [
      { text: 'What\'s my credit balance?', difficulty: 'easy' },
      { text: 'Show my credit history', difficulty: 'easy' }
    ]
  },

  /* ── ADMIN ────────────────────────────────────────────── */
  admin: {
    activities: [
      { text: 'List all activities', difficulty: 'easy' },
      { text: 'Create a new yoga class: \'Beginner Yoga\', £25, Bellshill venue, Saturdays 10-11am', difficulty: 'easy' },
      { text: 'Update the pilates class price to £30', difficulty: 'easy' },
      { text: 'I want to create a new activity called \'Family Yoga\'. It costs £20, max 15 people, at Bellshill venue in the main studio. Can you create it and then generate sessions for every Saturday at 10am for the next 3 months?', difficulty: 'intermediate' },
      { text: 'Create \'Pilates Advanced\': £35, max 12 people, Bellshill, Friday 7-8pm. Once created, generate sessions for the next 12 weeks and confirm before saving.', difficulty: 'advanced' },
      { text: 'Generate sessions for our \'Summer Kids Club\' activity: every weekday 2-4pm, June-August, at the Eurocentral space', difficulty: 'intermediate' }
    ],
    venues: [
      { text: 'List all venues', difficulty: 'easy' },
      { text: 'Create a new venue: \'Community Hall\', 42 Main Street, Bellshill', difficulty: 'easy' },
      { text: 'Update Bellshill venue address to \'211B Main Street, Bellshill ML4 1AJ\'', difficulty: 'easy' },
      { text: 'List all spaces at Bellshill venue', difficulty: 'easy' },
      { text: 'Create a space: \'Studio A\', capacity 20, at Bellshill', difficulty: 'easy' },
      { text: 'Show me all venues with how many spaces each has', difficulty: 'easy' },
      { text: 'Create 3 new spaces at our Eurocentral venue: Studio A (capacity 25), Studio B (capacity 18), Meeting Room (capacity 8)', difficulty: 'intermediate' }
    ],
    users: [
      { text: 'List all users', difficulty: 'easy' },
      { text: 'Create a new instructor: Sarah Smith, sarah@example.com', difficulty: 'easy' },
      { text: 'Promote a customer to instructor role', difficulty: 'easy' },
      { text: 'Show me all customers who\'ve booked in the last 30 days', difficulty: 'intermediate' },
      { text: 'Create a new admin user: john@wellfoundation.org.uk, first name John, last name Admin', difficulty: 'easy' }
    ],
    bookings: [
      { text: 'List all bookings for May', difficulty: 'easy' },
      { text: 'Show bookings waiting for payment', difficulty: 'easy' },
      { text: 'A customer wants to cancel their booking for the summer camp due to injury. Process a full refund and show them the refund status', difficulty: 'intermediate' },
      { text: 'Show me all bookings for the Saturday morning yoga class. Who\'s confirmed and who\'s pending payment?', difficulty: 'intermediate' },
      { text: 'Process a refund for booking #123 and update their account credit', difficulty: 'intermediate' },
      { text: 'Show me all unpaid bookings older than 7 days', difficulty: 'easy' },
      { text: 'Show me all bookings for today across all activities', difficulty: 'easy' }
    ],
    reports: [
      { text: 'Show me June booking numbers', difficulty: 'easy' },
      { text: 'What were our payments last month?', difficulty: 'easy' },
      { text: 'Generate a report of all bookings for the \'Beginner Yoga\' activity, grouped by session date, showing confirmed/pending numbers', difficulty: 'intermediate' },
      { text: 'Export an attendance report for the past 3 months. I need: activity name, session date, students attended, no-shows', difficulty: 'intermediate' },
      { text: 'Show me revenue breakdown by activity for Q2. Which activities made the most money?', difficulty: 'advanced' },
      { text: 'Which activity had the highest attendance rate this month?', difficulty: 'easy' }
    ],
    'gift-aid': [
      { text: 'Show Gift Aid overview', difficulty: 'easy' },
      { text: 'How much Gift Aid have we claimed this year? Show me which customers have declared and their amounts', difficulty: 'intermediate' }
    ],
    withdrawals: [
      { text: 'List pending withdrawal requests', difficulty: 'easy' },
      { text: 'Approve withdrawal #5 for Sarah', difficulty: 'easy' },
      { text: 'Show me all pending instructor withdrawal requests with amounts. Which ones are ready to process?', difficulty: 'intermediate' },
      { text: 'Process the withdrawal request from our instructor Emma for £450 and confirm it\'s been sent', difficulty: 'intermediate' }
    ],
    notifications: [
      { text: 'Send a reminder email to all customers about next weekend\'s classes', difficulty: 'intermediate' },
      { text: 'I want to send a message to everyone booked in our Saturday morning yoga class. Subject: \'Venue Change - Important Update\', Body: \'We\'ve moved Saturday yoga to the new studio. See you there!\' Show me who\'ll receive this before I send.', difficulty: 'intermediate' },
      { text: 'Send a notification about our summer schedule to all customers. Preview first to confirm who\'s included.', difficulty: 'intermediate' },
      { text: 'Send this message: Subject: \'Summer Camp - Final Places Available\', to all customers who haven\'t booked yet. Preview it first, then I\'ll confirm and you send.', difficulty: 'advanced' },
      { text: 'Send a thank you note to everyone who attended last month', difficulty: 'intermediate' }
    ]
  },

  /* ── SUPER ADMIN ──────────────────────────────────────── */
  'super-admin': {
    activities: [
      { text: 'List all activities', difficulty: 'easy' },
      { text: 'Create a new yoga class: \'Beginner Yoga\', £25, Bellshill venue, Saturdays 10-11am', difficulty: 'easy' },
      { text: 'Update the pilates class price to £30', difficulty: 'easy' },
      { text: 'I want to create a new activity called \'Family Yoga\'. It costs £20, max 15 people, at Bellshill venue. Generate sessions for every Saturday at 10am for the next 3 months.', difficulty: 'intermediate' },
      { text: 'Create \'Pilates Advanced\': £35, max 12 people, Bellshill, Friday 7-8pm. Generate sessions for the next 12 weeks and confirm before saving.', difficulty: 'advanced' }
    ],
    venues: [
      { text: 'List all venues', difficulty: 'easy' },
      { text: 'Create a new venue: \'Community Hall\', 42 Main Street, Bellshill', difficulty: 'easy' },
      { text: 'List all spaces at Bellshill venue', difficulty: 'easy' },
      { text: 'Create a space: \'Studio A\', capacity 20, at Bellshill', difficulty: 'easy' },
      { text: 'Show me all venues with how many spaces each has', difficulty: 'easy' }
    ],
    users: [
      { text: 'List all users', difficulty: 'easy' },
      { text: 'Create a new instructor: Sarah Smith, sarah@example.com', difficulty: 'easy' },
      { text: 'Show me all customers who\'ve booked in the last 30 days', difficulty: 'intermediate' },
      { text: 'Create a new admin user: john@wellfoundation.org.uk, first name John, last name Admin', difficulty: 'easy' }
    ],
    bookings: [
      { text: 'List all bookings for May', difficulty: 'easy' },
      { text: 'Show bookings waiting for payment', difficulty: 'easy' },
      { text: 'A customer wants to cancel their booking for the summer camp due to injury. Process a full refund.', difficulty: 'intermediate' },
      { text: 'Show me all bookings for the Saturday morning yoga class. Who\'s confirmed and who\'s pending?', difficulty: 'intermediate' }
    ],
    reports: [
      { text: 'Show me June booking numbers', difficulty: 'easy' },
      { text: 'What were our payments last month?', difficulty: 'easy' },
      { text: 'Show me revenue breakdown by activity for Q2. Which activities made the most money?', difficulty: 'advanced' },
      { text: 'Export an attendance report for the past 3 months', difficulty: 'intermediate' }
    ],
    'gift-aid': [
      { text: 'Show Gift Aid overview', difficulty: 'easy' },
      { text: 'How much Gift Aid have we claimed this year?', difficulty: 'easy' }
    ],
    withdrawals: [
      { text: 'List pending withdrawal requests', difficulty: 'easy' },
      { text: 'Process the withdrawal request from our instructor Emma for £450', difficulty: 'intermediate' }
    ],
    notifications: [
      { text: 'Send a reminder email to all customers about next weekend\'s classes', difficulty: 'intermediate' },
      { text: 'I want to send a message to everyone booked in our Saturday morning yoga class. Subject: \'Venue Change\', Body: \'We\'ve moved to the new studio.\' Show me who\'ll receive this before I send.', difficulty: 'intermediate' },
      { text: 'Send this message to all customers who haven\'t booked yet. Preview first, then I\'ll confirm and you send.', difficulty: 'advanced' }
    ],
    payments: [
      { text: 'Show current payment settings', difficulty: 'easy' },
      { text: 'Update Stripe public key', difficulty: 'easy' },
      { text: 'We\'ve migrated to a new Stripe account. Update the API keys to: public=[key], secret=[key]', difficulty: 'intermediate' }
    ]
  }

};
