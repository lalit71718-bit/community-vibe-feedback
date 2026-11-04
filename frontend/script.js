const API_URL = 'http://localhost:5000/api/feedback';

const form = document.getElementById('feedbackForm');
const responseBox = document.getElementById('responseBox');
const replyText = document.getElementById('replyText');
const feedbackList = document.getElementById('feedbackList');
const feedCount = document.getElementById('feedCount');

// 1. Interactive Star Picker Logic
document.querySelectorAll('.star-picker').forEach(picker => {
    const stars = picker.querySelectorAll('.star');
    const hiddenInput = document.getElementById(picker.dataset.target);

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            hiddenInput.value = star.dataset.value;
            stars.forEach((s, i) => s.classList.toggle('active', i <= index));
        });

        star.addEventListener('mouseenter', () => {
            stars.forEach((s, i) => s.classList.toggle('hovered', i <= index));
        });
    });

    picker.addEventListener('mouseleave', () => {
        stars.forEach(s => s.classList.remove('hovered'));
    });
});

// 2. Interactive Pill Button Logic
document.querySelectorAll('.pill-group').forEach(group => {
    const buttons = group.querySelectorAll('.pill-btn');
    const hiddenInput = document.getElementById(group.dataset.target);

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            hiddenInput.value = btn.dataset.value;
        });
    });
});

// 3. Load & Render Feedback Feed
async function loadFeedbacks() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        feedCount.textContent = `${data.length} ${data.length === 1 ? 'entry' : 'entries'}`;
        feedbackList.innerHTML = '';

        if (data.length === 0) {
            feedbackList.innerHTML = `<p style="text-align:center; color:#64748b; padding: 24px 0;">No feedback yet. Submit the first vibe check!</p>`;
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'feedback-card';
            card.innerHTML = `
                <div class="card-top">
                    <div>
                        <h4>${item.name}</h4>
                        <span class="card-email">${item.email || ''}</span>
                    </div>
                    <span class="mini-tag">🏛️ ${item.venueRating}★ | 🍕 ${item.foodRating}★</span>
                </div>
                <div class="tag-row">
                    <span class="mini-tag">📶 ${item.wifiQuality}</span>
                    <span class="mini-tag">🌟 ${item.mentorshipSupport}</span>
                    <span class="mini-tag">🔥 ${item.communityVibe}</span>
                </div>
                ${item.comments ? `<p class="comment-text">"${item.comments}"</p>` : ''}
                <div class="reply-box"><strong>🤖 Auto-Reply:</strong> ${item.autoReply || 'None'}</div>
                <button class="delete-btn" onclick="deleteFeedback('${item._id}')">Delete</button>
            `;
            feedbackList.appendChild(card);
        });
    } catch (err) {
        console.error('Error loading feedback:', err);
    }
}

// 4. Submit Form Handler
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
        name: document.getElementById('name').value || 'Anonymous Participant',
        email: document.getElementById('email').value,
        venueRating: Number(document.getElementById('venueRating').value),
        foodRating: Number(document.getElementById('foodRating').value),
        wifiQuality: document.getElementById('wifiQuality').value,
        mentorshipSupport: document.getElementById('mentorshipSupport').value,
        communityVibe: document.getElementById('communityVibe').value,
        comments: document.getElementById('comments').value
    };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await res.json();

        if (res.ok) {
            replyText.textContent = result.autoReply;
            responseBox.classList.remove('hidden');
            form.reset();
            loadFeedbacks();
        } else {
            alert(result.error || 'Submission failed.');
        }
    } catch (err) {
        console.error('Error submitting feedback:', err);
    }
});

// 5. Delete Entry
async function deleteFeedback(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        loadFeedbacks();
    } catch (err) {
        console.error('Error deleting feedback:', err);
    }
}

loadFeedbacks();