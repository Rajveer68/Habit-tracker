// script.js
class HabitTracker {
    constructor() {
        this.habits = this.loadHabits();
        this.render();
    }

    loadHabits() {
        return JSON.parse(localStorage.getItem('habits')) || [];
    }

    saveHabits() {
        localStorage.setItem('habits', JSON.stringify(this.habits));
    }

    addHabit(name) {
        if (!name.trim()) return;
        
        const habit = {
            id: Date.now(),
            name: name.trim(),
            completed: false,
            createdDate: new Date().toISOString()
        };
        
        this.habits.push(habit);
        this.saveHabits();
        this.render();
    }

    toggleHabit(id) {
        const habit = this.habits.find(h => h.id === id);
        if (habit) {
            habit.completed = !habit.completed;
            this.saveHabits();
            this.render();
        }
    }

    deleteHabit(id) {
        this.habits = this.habits.filter(h => h.id !== id);
        this.saveHabits();
        this.render();
    }

    getStats() {
        return {
            total: this.habits.length,
            completedToday: this.habits.filter(h => h.completed).length
        };
    }

    render() {
        const habitList = document.getElementById('habitList');
        const stats = this.getStats();

        // Render habits
        habitList.innerHTML = this.habits.map(habit => `
            <div class="habit-item ${habit.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="checkbox" 
                    ${habit.completed ? 'checked' : ''} 
                    onchange="tracker.toggleHabit(${habit.id})"
                >
                <span class="habit-name">${habit.name}</span>
                <button 
                    class="delete-btn" 
                    onclick="tracker.deleteHabit(${habit.id})"
                >Delete</button>
            </div>
        `).join('');

        // Update stats
        document.getElementById('totalHabits').textContent = stats.total;
        document.getElementById('completedToday').textContent = stats.completedToday;
    }
}

// Initialize tracker
const tracker = new HabitTracker();

// Add habit function for the button
function addHabit() {
    const input = document.getElementById('habitInput');
    tracker.addHabit(input.value);
    input.value = '';
}

// Add enter key support
document.getElementById('habitInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addHabit();
    }
});