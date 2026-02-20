/**
 * Local Loyalty Chatbot Logic
 * Grounded in the "Local Loyalty Playbook" content.
 */

const PLAYBOOK_KNOWLEDGE = [
    {
        keywords: ["mistake 1", "mistake #1", "locals as tourists", "treating locals"],
        answer: "Mistake #1 is **Treating locals like tourists**. Most operators make locals feel invisible. The fix is to normalize the experience (like bowling or cinema), incentive loyalty with 'Local Resident' previews, and segment your marketing to make locals feel like insiders."
    },
    {
        keywords: ["mistake 2", "mistake #2", "new rooms", "rebuild", "building rooms"],
        answer: "Mistake #2 is **Relying on new rooms for repeat business**. Spending $25K+ on rebuilds only gives a brief spike. Instead, create seasonal variations of existing rooms, launch leaderboards, or host community events that don't require room changes."
    },
    {
        keywords: ["mistake 3", "mistake #3", "post-game", "slump", "after the game", "relationship"],
        answer: "Mistake #3 is **No post-game relationship**. Most buyers decide if they'll return within 5 minutes of finishing. Fix this with automated email sequences (thank you notes, team photos, STATS) and VIP text lists for locals."
    },
    {
        keywords: ["mistake 4", "mistake #4", "discounts", "slashing prices", "cheap customers", "groupon"],
        answer: "Mistake #4 is **Using discounts to create loyalty**. Discounts attract cheap customers who don't stay. Instead, use 'value-add' offers (free replay pass with full price), limited-time experiences, or a locals membership."
    },
    {
        keywords: ["mistake 5", "mistake #5", "local identity", "interchangeable", "brand"],
        answer: "Mistake #5 is **No local identity**. Avoid being generic. Signal identity by establishing a 'sense of place', using regional vernacular, and partnering with local businesses. Be part of 'Main Street', not just a franchise."
    },
    {
        keywords: ["how to fix", "advice", "help", "strategy", "increase bookings"],
        answer: "To increase local bookings without huge spend: 1. Acknowledge locals specifically. 2. Gamify existing rooms (leaderboards). 3. Automate your follow-ups. 4. Focus on value-adds instead of discounts. 5. Build a local brand identity."
    },
    {
        keywords: ["who is christopher", "who are you", "christopher lynn", "operator"],
        answer: "Christopher Lynn is 'The Escape Room Dad'. He has 20 years of experience in marketing and communications, helping businesses unlock profit through clarity and customer loyalty systems."
    }
];

const DEFAULT_RESPONSE = "That's a great question! While I don't have the specific answer for that, the Playbook covers 5 major mistakes including: treating locals like tourists, relying solely on new rooms, and missing the post-game relationship. Which of those should we dive into?";

document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('chatbot-trigger');
    const window = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close');
    const inputForm = document.getElementById('chatbot-input-form');
    const input = document.getElementById('chatbot-input');
    const messagesContainer = document.getElementById('chatbot-messages');

    // Toggle Chat Window
    trigger.addEventListener('click', () => {
        window.classList.toggle('hidden');
        if (!window.classList.contains('hidden')) {
            input.focus();
        }
    });

    closeBtn.addEventListener('click', () => {
        window.classList.add('hidden');
    });

    // Handle Messages
    inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, 'user-message');
        input.value = '';

        // Simulate thinking
        setTimeout(() => {
            const response = findResponse(text);
            addMessage(response, 'bot-message');
        }, 600);
    });

    function addMessage(text, className) {
        const div = document.createElement('div');
        div.className = `message ${className}`;
        div.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Simple bold parsing
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function findResponse(query) {
        const lowerQuery = query.toLowerCase();
        for (const item of PLAYBOOK_KNOWLEDGE) {
            if (item.keywords.some(keyword => lowerQuery.includes(keyword))) {
                return item.answer;
            }
        }
        return DEFAULT_RESPONSE;
    }
});
