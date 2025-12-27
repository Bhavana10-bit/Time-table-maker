// Data storage
let subjects = [];
let optionalSubjects = [];
let timeSlots = [];
let breaks = [];
let timetableData = null;

// DOM Elements
const daysInput = document.getElementById('days');
const periodsInput = document.getElementById('periods');
const dayNamesInput = document.getElementById('dayNames');
const subjectInput = document.getElementById('subjectInput');
const addSubjectBtn = document.getElementById('addSubject');
const subjectsList = document.getElementById('subjectsList');
const optionalSubjectInput = document.getElementById('optionalSubjectInput');
const addOptionalSubjectBtn = document.getElementById('addOptionalSubject');
const optionalSubjectsList = document.getElementById('optionalSubjectsList');
const startTimeInput = document.getElementById('startTime');
const endTimeInput = document.getElementById('endTime');
const setTimeSlotsBtn = document.getElementById('setTimeSlots');
const timeSlotsDisplay = document.getElementById('timeSlotsDisplay');
const enableShortBreak = document.getElementById('enableShortBreak');
const shortBreakStart = document.getElementById('shortBreakStart');
const shortBreakEnd = document.getElementById('shortBreakEnd');
const enableLunchBreak = document.getElementById('enableLunchBreak');
const lunchBreakStart = document.getElementById('lunchBreakStart');
const lunchBreakEnd = document.getElementById('lunchBreakEnd');
const generateBtn = document.getElementById('generateBtn');
const resetBtn = document.getElementById('resetBtn');
const configSection = document.getElementById('configSection');
const timetableSection = document.getElementById('timetableSection');
const timetableDisplay = document.getElementById('timetableDisplay');
const editBtn = document.getElementById('editBtn');
const exportBtn = document.getElementById('exportBtn');
const printBtn = document.getElementById('printBtn');

// Toggle break inputs visibility
enableShortBreak.addEventListener('change', () => {
    document.getElementById('shortBreakInputs').style.display = enableShortBreak.checked ? 'flex' : 'none';
});

enableLunchBreak.addEventListener('change', () => {
    document.getElementById('lunchBreakInputs').style.display = enableLunchBreak.checked ? 'flex' : 'none';
});

// Add Subject
addSubjectBtn.addEventListener('click', () => {
    const subject = subjectInput.value.trim();
    if (subject && !subjects.includes(subject)) {
        subjects.push(subject);
        updateSubjectsList();
        subjectInput.value = '';
        subjectInput.focus();
    }
});

subjectInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addSubjectBtn.click();
    }
});

// Add Optional Subject
addOptionalSubjectBtn.addEventListener('click', () => {
    const subject = optionalSubjectInput.value.trim();
    if (subject && !optionalSubjects.includes(subject)) {
        optionalSubjects.push(subject);
        updateOptionalSubjectsList();
        optionalSubjectInput.value = '';
        optionalSubjectInput.focus();
    }
});

optionalSubjectInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addOptionalSubjectBtn.click();
    }
});

// Update Subjects List Display
function updateSubjectsList() {
    subjectsList.innerHTML = '';
    subjects.forEach((subject, index) => {
        const tag = document.createElement('div');
        tag.className = 'item-tag';
        tag.innerHTML = `
            <span>${subject}</span>
            <button class="remove-btn" onclick="removeSubject(${index})">×</button>
        `;
        subjectsList.appendChild(tag);
    });
}

// Update Optional Subjects List Display
function updateOptionalSubjectsList() {
    optionalSubjectsList.innerHTML = '';
    optionalSubjects.forEach((subject, index) => {
        const tag = document.createElement('div');
        tag.className = 'item-tag';
        tag.innerHTML = `
            <span>${subject}</span>
            <button class="remove-btn" onclick="removeOptionalSubject(${index})">×</button>
        `;
        optionalSubjectsList.appendChild(tag);
    });
}

// Remove Subject
function removeSubject(index) {
    subjects.splice(index, 1);
    updateSubjectsList();
}

// Remove Optional Subject
function removeOptionalSubject(index) {
    optionalSubjects.splice(index, 1);
    updateOptionalSubjectsList();
}

// Set Time Slots with Breaks
setTimeSlotsBtn.addEventListener('click', () => {
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;
    const periods = parseInt(periodsInput.value);
    
    if (!startTime || !endTime) {
        alert('Please enter both start and end times');
        return;
    }
    
    breaks = [];
    if (enableShortBreak.checked) {
        breaks.push({
            type: 'SHORT BREAK',
            start: shortBreakStart.value,
            end: shortBreakEnd.value,
            afterPeriod: 2
        });
    }
    if (enableLunchBreak.checked) {
        breaks.push({
            type: 'LUNCH BREAK',
            start: lunchBreakStart.value,
            end: lunchBreakEnd.value,
            afterPeriod: 4
        });
    }
    
    timeSlots = generateTimeSlotsWithBreaks(startTime, endTime, periods, breaks);
    displayTimeSlots();
});

function generateTimeSlotsWithBreaks(start, end, periods, breaks) {
    const slots = [];
    const startHour = parseInt(start.split(':')[0]);
    const startMin = parseInt(start.split(':')[1]);
    
    const startMinutes = startHour * 60 + startMin;
    
    // Each class is 1 hour
    const periodDuration = 60;
    
    let currentTime = startMinutes;
    let periodNum = 1;
    
    for (let i = 0; i < periods; i++) {
        const periodStart = currentTime;
        const periodEnd = periodStart + periodDuration;
        
        const startH = Math.floor(periodStart / 60);
        const startM = periodStart % 60;
        const endH = Math.floor(periodEnd / 60);
        const endM = periodEnd % 60;
        
        slots.push({
            period: periodNum++,
            start: `${String(startH).padStart(2, '0')}:${String(startM).padStart(2, '0')}`,
            end: `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`
        });
        
        currentTime = periodEnd;
        
        // Insert break after specified period
        breaks.forEach(br => {
            if (periodNum - 1 === br.afterPeriod) {
                const brStart = parseInt(br.start.split(':')[0]) * 60 + parseInt(br.start.split(':')[1]);
                const brEnd = parseInt(br.end.split(':')[0]) * 60 + parseInt(br.end.split(':')[1]);
                currentTime = brEnd;
            }
        });
    }
    
    return slots;
}

function displayTimeSlots() {
    if (timeSlots.length === 0) {
        timeSlotsDisplay.innerHTML = '<p>No time slots set. Default periods will be used.</p>';
        return;
    }
    
    let html = '<strong>Time Slots:</strong><br>';
    timeSlots.forEach((slot, index) => {
        html += `Period ${slot.period}: ${slot.start} - ${slot.end}<br>`;
        
        // Show breaks after appropriate periods
        breaks.forEach(br => {
            if (slot.period === br.afterPeriod) {
                html += `<strong>${br.type}:</strong> ${br.start} - ${br.end}<br>`;
            }
        });
    });
    timeSlotsDisplay.innerHTML = html;
}

// Generate Timetable
generateBtn.addEventListener('click', () => {
    const days = parseInt(daysInput.value);
    const periods = parseInt(periodsInput.value);
    const dayNames = dayNamesInput.value.split(',').map(d => d.trim()).filter(d => d);
    
    if (days < 1 || periods < 1) {
        alert('Please enter valid number of days and periods');
        return;
    }
    
    if (subjects.length === 0) {
        alert('Please add at least one subject');
        return;
    }
    
    timetableData = generateTimetable(days, periods, dayNames, subjects, optionalSubjects, timeSlots);
    displayTimetable(timetableData, dayNames, timeSlots, breaks);
    
    configSection.style.display = 'none';
    timetableSection.style.display = 'block';
    
    timetableSection.scrollIntoView({ behavior: 'smooth' });
});

function generateTimetable(days, periods, dayNames, subjects, optionalSubjects, timeSlots) {
    const timetable = [];
    
    // Initialize empty timetable
    for (let day = 0; day < days; day++) {
        const daySchedule = [];
        for (let period = 0; period < periods; period++) {
            daySchedule.push({ subject: '', teacher: null });
        }
        timetable.push(daySchedule);
    }
    
    // Create distribution for regular subjects
    const totalSlots = days * periods;
    const subjectsPerSlot = Math.ceil(totalSlots / subjects.length);
    const subjectDistribution = [];
    
    subjects.forEach(subject => {
        for (let i = 0; i < subjectsPerSlot; i++) {
            subjectDistribution.push(subject);
        }
    });
    
    // Shuffle for randomness
    shuffleArray(subjectDistribution);
    
    // Place optional subjects (2 classes per week each)
    const optionalSlots = [];
    optionalSubjects.forEach(subject => {
        for (let i = 0; i < 2; i++) {
            optionalSlots.push(subject);
        }
    });
    shuffleArray(optionalSlots);
    
    // Combine all subjects
    const allSubjects = [...subjectDistribution, ...optionalSlots];
    shuffleArray(allSubjects);
    
    let subjectIndex = 0;
    
    // Fill timetable with no consecutive same subjects in a day
    for (let day = 0; day < days; day++) {
        let availableSubjects = [...allSubjects];
        shuffleArray(availableSubjects);
        
        for (let period = 0; period < periods; period++) {
            let selectedSubject = null;
            
            // Try to find a subject that's not the same as the previous period
            for (let attempt = 0; attempt < availableSubjects.length; attempt++) {
                const candidate = availableSubjects[attempt];
                if (period === 0 || timetable[day][period - 1].subject !== candidate) {
                    selectedSubject = candidate;
                    availableSubjects.splice(attempt, 1);
                    break;
                }
            }
            
            // If no suitable subject found, use the first available
            if (!selectedSubject && availableSubjects.length > 0) {
                selectedSubject = availableSubjects.shift();
            }
            
            if (selectedSubject) {
                timetable[day][period].subject = selectedSubject;
                // Remove from global pool to avoid overuse
                const globalIndex = allSubjects.indexOf(selectedSubject);
                if (globalIndex > -1) {
                    allSubjects.splice(globalIndex, 1);
                }
            }
        }
    }
    
    return timetable;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Display Timetable
function displayTimetable(timetable, dayNames, timeSlots, breaks) {
    const days = timetable.length;
    const periods = timetable[0].length;
    
    // Create columns array with periods and breaks
    const columns = [];
    let periodIndex = 0;
    
    for (let i = 0; i < periods; i++) {
        if (timeSlots.length > i) {
            columns.push({
                type: 'period',
                period: timeSlots[i].period || i + 1,
                start: timeSlots[i].start,
                end: timeSlots[i].end,
                index: periodIndex++
            });
        } else {
            columns.push({
                type: 'period',
                period: i + 1,
                start: '',
                end: '',
                index: periodIndex++
            });
        }
        
        // Insert breaks after specified periods
        breaks.forEach(br => {
            const currentPeriod = timeSlots.length > i ? timeSlots[i].period : i + 1;
            if (currentPeriod === br.afterPeriod) {
                columns.push({
                    type: 'break',
                    name: br.type,
                    start: br.start,
                    end: br.end
                });
            }
        });
    }
    
    let html = '<table><thead><tr><th>Day</th>';
    
    // Add period/break headers
    columns.forEach(col => {
        if (col.type === 'break') {
            html += `<th class="break-header">${col.name}<br>${col.start} - ${col.end}</th>`;
        } else {
            if (col.start && col.end) {
                html += `<th>Period ${col.period}<br>${col.start} - ${col.end}</th>`;
            } else {
                html += `<th>Period ${col.period}</th>`;
            }
        }
    });
    html += '</tr></thead><tbody>';
    
    // Add rows for each day
    for (let day = 0; day < days; day++) {
        const dayName = dayNames[day] || `Day ${day + 1}`;
        html += `<tr><td class="day-cell">${dayName}</td>`;
        
        // Add cells for each column
        columns.forEach(col => {
            if (col.type === 'break') {
                html += `<td class="break-cell" colspan="1">${col.name}</td>`;
            } else {
                const cell = timetable[day][col.index];
                html += '<td>';
                if (cell.subject) {
                    html += `<div class="subject-cell">${cell.subject}</div>`;
                } else {
                    html += '<div class="empty-cell">Free</div>';
                }
                html += '</td>';
            }
        });
        
        html += '</tr>';
    }
    
    html += '</tbody></table>';
    timetableDisplay.innerHTML = html;
}

// Reset
resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset? All data will be lost.')) {
        subjects = [];
        optionalSubjects = [];
        timeSlots = [];
        breaks = [];
        timetableData = null;
        
        daysInput.value = 5;
        periodsInput.value = 6;
        dayNamesInput.value = 'Monday, Tuesday, Wednesday, Thursday, Friday';
        subjectInput.value = '';
        optionalSubjectInput.value = '';
        startTimeInput.value = '08:45';
        endTimeInput.value = '16:30';
        shortBreakStart.value = '10:45';
        shortBreakEnd.value = '11:00';
        lunchBreakStart.value = '13:00';
        lunchBreakEnd.value = '13:45';
        enableShortBreak.checked = true;
        enableLunchBreak.checked = true;
        
        updateSubjectsList();
        updateOptionalSubjectsList();
        timeSlotsDisplay.innerHTML = '';
        
        configSection.style.display = 'block';
        timetableSection.style.display = 'none';
    }
});

// Edit
editBtn.addEventListener('click', () => {
    configSection.style.display = 'block';
    timetableSection.style.display = 'none';
    configSection.scrollIntoView({ behavior: 'smooth' });
});

// Print
printBtn.addEventListener('click', () => {
    window.print();
});

// Export as PDF
exportBtn.addEventListener('click', () => {
    const printWindow = window.open('', '_blank');
    const days = timetableData.length;
    const periods = timetableData[0].length;
    const dayNames = dayNamesInput.value.split(',').map(d => d.trim()).filter(d => d);
    
    // Create columns array with periods and breaks
    const columns = [];
    let periodIndex = 0;
    
    for (let i = 0; i < periods; i++) {
        if (timeSlots.length > i) {
            columns.push({
                type: 'period',
                period: timeSlots[i].period || i + 1,
                start: timeSlots[i].start,
                end: timeSlots[i].end,
                index: periodIndex++
            });
        } else {
            columns.push({
                type: 'period',
                period: i + 1,
                start: '',
                end: '',
                index: periodIndex++
            });
        }
        
        // Insert breaks after specified periods
        breaks.forEach(br => {
            const currentPeriod = timeSlots.length > i ? timeSlots[i].period : i + 1;
            if (currentPeriod === br.afterPeriod) {
                columns.push({
                    type: 'break',
                    name: br.type,
                    start: br.start,
                    end: br.end
                });
            }
        });
    }
    
    let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Timetable</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                table { width: 100%; border-collapse: collapse; }
                th { background: #667eea; color: white; padding: 15px; text-align: left; border: 1px solid #333; }
                td { padding: 15px; border: 1px solid #ddd; }
                .day-cell { font-weight: bold; background: #f8f9ff; }
                .subject-cell { font-weight: 500; }
                .break-cell { background: #fff3cd; font-weight: bold; text-align: center; }
                .break-header { background: #ffc107; color: #000; }
            </style>
        </head>
        <body>
            <h1>Timetable</h1>
    `;
    
    html += '<table><thead><tr><th>Day</th>';
    columns.forEach(col => {
        if (col.type === 'break') {
            html += `<th class="break-header">${col.name}<br>${col.start} - ${col.end}</th>`;
        } else {
            if (col.start && col.end) {
                html += `<th>Period ${col.period}<br>${col.start} - ${col.end}</th>`;
            } else {
                html += `<th>Period ${col.period}</th>`;
            }
        }
    });
    html += '</tr></thead><tbody>';
    
    for (let day = 0; day < days; day++) {
        const dayName = dayNames[day] || `Day ${day + 1}`;
        html += `<tr><td class="day-cell">${dayName}</td>`;
        columns.forEach(col => {
            if (col.type === 'break') {
                html += `<td class="break-cell">${col.name}</td>`;
            } else {
                const cell = timetableData[day][col.index];
                html += '<td>';
                if (cell.subject) {
                    html += `<div class="subject-cell">${cell.subject}</div>`;
                } else {
                    html += '<div>Free</div>';
                }
                html += '</td>';
            }
        });
        html += '</tr>';
    }
    
    html += '</tbody></table></body></html>';
    
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
});
